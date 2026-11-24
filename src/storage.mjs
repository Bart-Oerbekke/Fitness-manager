// Local-only persistence. No authentication, server calls, or user identity.
export const LEGACY_KEY="fm-local-preview-v1";
export const DB_NAME="fitness-manager-local";
const RECORD="preview";
export function emptyState(){return {version:1,custom:[],workouts:[],programs:[],events:[],history:[],active:null,favorites:[],recent:[],recovery:[]}}
export function normalizeState(value){
  if(!value||value.version!==1||!["custom","workouts","programs","events","history"].every(k=>Array.isArray(value[k])))throw Error("Onbekende opslagstructuur");
  const obj=x=>x&&typeof x==="object"&&!Array.isArray(x);
  const exercises=x=>obj(x)&&Array.isArray(x.exercises)&&x.exercises.every(e=>obj(e)&&typeof e.id==="string"&&typeof e.name==="string");
  const session=x=>exercises(x)&&x.exercises.every(e=>Array.isArray(e.logs)&&e.logs.every(s=>obj(s)&&typeof s.done==="boolean"));
  if(!value.workouts.every(exercises)||!value.programs.every(x=>obj(x)&&Array.isArray(x.entries)&&obj(x.overrides))||
     !value.custom.every(obj)||!value.events.every(obj)||!value.history.every(x=>obj(x)&&(x.type!=="fitness"||session(x)))||
     (value.active!=null&&!session(value.active)))throw Error("Onbekende trainingsstructuur");
  const copy=structuredClone(value);
  copy.active=copy.active??null;
  for(const k of ["favorites","recent"]){if(copy[k]==null)copy[k]=[];if(!Array.isArray(copy[k])||!copy[k].every(x=>typeof x==="string"))throw Error("Onbekende voorkeuren")}
  if(copy.recovery==null)copy.recovery=[];
  if(!Array.isArray(copy.recovery)||!copy.recovery.every(x=>obj(x)&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&["sleep","energy","soreness"].every(k=>Number.isInteger(x[k])&&x[k]>=1&&x[k]<=5)))throw Error("Onbekende herstelstructuur");
  return copy;
}
export function parseLegacy(raw){return raw===null?emptyState():normalizeState(JSON.parse(raw))}
export function initialRecord(raw){return {revision:0,payload:parseLegacy(raw),legacyRaw:raw,savedAt:Date.now()}}
export function verifyRecord(row,raw){
  if(!row||!Number.isSafeInteger(row.revision)||row.revision<0||!Object.hasOwn(row,"legacyRaw"))throw Error("Onbekend databaseformaat");
  if(row.legacyRaw!==raw){const err=Error("De oude opslag is na migratie gewijzigd. Exporteer beide versies; er is niets overschreven.");err.recovery=row;throw err}
  return {...row,payload:normalizeState(row.payload)};
}
export function nextRecord(row,expected,payload){
  if(!row||row.revision!==expected){const err=Error("Een ander appvenster heeft nieuwere gegevens opgeslagen. Exporteer je wijzigingen voordat je herlaadt.");err.code="CONFLICT";err.recovery=row;throw err}
  return {...row,revision:expected+1,payload:normalizeState(payload),savedAt:Date.now()};
}
function openDatabase(factory,name){
  return new Promise((resolve,reject)=>{
    if(!factory){reject(Error("IndexedDB is niet beschikbaar"));return}
    let done=false;const req=factory.open(name,1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("state"))req.result.createObjectStore("state")};
    req.onerror=()=>{done=true;reject(req.error||Error("Database openen mislukt"))};
    req.onblocked=()=>{done=true;reject(Error("Sluit andere appvensters en probeer opnieuw"))};
    req.onsuccess=()=>{if(done){req.result.close();return}done=true;resolve(req.result)};
  });
}
// Each operation reads and writes in one transaction; success means transaction complete.
function atomic(db,mutate){
  return new Promise((resolve,reject)=>{
    const tx=db.transaction("state","readwrite"),store=tx.objectStore("state"),req=store.get(RECORD);
    let result,problem;
    req.onsuccess=()=>{try{const change=mutate(req.result);result=change.result;if(change.write)store.put(change.write,RECORD)}catch(e){problem=e;tx.abort()}};
    tx.oncomplete=()=>resolve(result);
    tx.onabort=()=>reject(problem||tx.error||Error("Opslagtransactie afgebroken"));
    tx.onerror=()=>{}; // default error propagation aborts the transaction
  });
}
export async function openLocalStore({factory=globalThis.indexedDB,legacyRaw=null,name=DB_NAME}={}){
  const db=await openDatabase(factory,name);
  try{
    const row=await atomic(db,existing=>{
      if(existing)return {result:verifyRecord(existing,legacyRaw)};
      const created=initialRecord(legacyRaw);return {write:created,result:created};
    });
    let closed=false;db.onversionchange=()=>{closed=true;db.close()};
    return {state:row.payload,revision:row.revision,
      async write(expected,payload){
        if(closed)throw Error("Database is gesloten; herlaad de app na export");
        return atomic(db,existing=>{const next=nextRecord(existing,expected,payload);return {write:next,result:next.revision}});
      },
      close(){closed=true;db.close()}
    };
  }catch(e){db.close();throw e}
}
// Serialize mutations; do not continue writing after failure or conflict.
export function createSaveQueue(store,onStatus=()=>{}){
  let tail=Promise.resolve(),revision=store.revision,pending=0,failure=null;
  function status(){onStatus({pending,failure,revision})}
  return {
    enqueue(value){
      if(failure)return Promise.resolve(false);
      let payload;
      try{payload=normalizeState(value)}catch(e){failure=e;status();return Promise.resolve(false)}
      pending++;status();
      const task=tail.then(async()=>{
        if(failure)return false;
        try{revision=await store.write(revision,payload);return true}catch(e){failure=e;return false}
      }).finally(()=>{pending--;status()});
      tail=task.then(()=>{},()=>{});
      return task;
    },
    flush(){return tail},
    get status(){return {pending,failure,revision}}
  };
}
