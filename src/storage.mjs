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
      async restore(expected,payload){if(closed)throw Error("Database is gesloten");return atomic(db,existing=>{const next=restoreRecord(existing,expected,payload);return {write:next,result:next.revision}})},
      async previous(){if(closed)throw Error("Database is gesloten");return atomic(db,existing=>({result:existing?.restoreBackup?{payload:normalizeState(existing.restoreBackup),savedAt:existing.restoreBackupAt}:null}))},
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

// Import is stricter than legacy loading. Reject malformed or unsafe external payloads;
// never accept a recovery wrapper implicitly or overwrite storage while parsing.
export const MAX_BACKUP_BYTES=10*1024*1024;
export function parseBackup(raw){
 if(typeof raw!=="string"||new TextEncoder().encode(raw).length>MAX_BACKUP_BYTES)throw Error("Back-up groter dan 10 MB");
 let value;try{value=JSON.parse(raw)}catch{throw Error("Geen geldig JSON-bestand")}
 let nodes=0;
 function inspect(x,depth=0){if(++nodes>500000||depth>40)throw Error("Back-up te complex");if(typeof x==="string"&&x.length>10000)throw Error("Tekst te lang");if(x&&typeof x==="object"){for(const k of Object.keys(x)){if(["__proto__","constructor","prototype"].includes(k))throw Error("Ongeldige sleutel");inspect(x[k],depth+1)}}}
 inspect(value);const state=normalizeState(value);
 const obj=x=>x!==null&&typeof x==="object"&&!Array.isArray(x),str=x=>typeof x==="string",id=x=>str(x)&&/^[A-Za-z0-9_-]{1,160}$/.test(x),date=x=>str(x)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(Date.parse(x+"T12:00:00Z"))&&new Date(x+"T12:00:00Z").toISOString().slice(0,10)===x,int=(x,a,b)=>Number.isInteger(x)&&x>=a&&x<=b,num=(x,a,b)=>typeof x==="number"&&Number.isFinite(x)&&x>=a&&x<=b,optional=(x,f)=>x==null||f(x),numeric=(x,a,b)=>((str(x)&&x.trim()!=="")||typeof x==="number")&&Number.isFinite(Number(x))&&Number(x)>=a&&Number(x)<=b,blankNum=(x,a,b)=>x===""||numeric(x,a,b),range=x=>str(x)&&/^\d+(?:\s*[-–]\s*\d+)?$/.test(x.trim())&&x.split(/[-–]/).every(v=>numeric(v,1,999))&&Number(x.split(/[-–]/)[0])<=Number(x.split(/[-–]/).at(-1)),kind=x=>["fitness","football","match","other"].includes(x),bool=x=>typeof x==="boolean";
 const fail=label=>{throw Error("Ongeldige back-up: "+label)};
 const unique=(list,label)=>{if(!list.every(x=>obj(x)&&id(x.id))||new Set(list.map(x=>x.id)).size!==list.length)fail(label)};
 const target=x=>obj(x)&&optional(x.reps,v=>v===""||range(v))&&optional(x.kg,v=>blankNum(v,0,2000))&&optional(x.rir,v=>v===""||numeric(v,0,10)&&Number.isInteger(Number(v)))&&optional(x.rpe,v=>blankNum(v,0,10))&&optional(x.drop,bool);
 function exercise(e,session=false){
  if(!obj(e)||!id(e.id)||!id(e.exerciseId)||!str(e.name)||!str(e.equipment)||!int(e.sets,1,30)||!range(e.reps)||!blankNum(e.kg,0,2000)||!bool(e.ea)||!bool(e.bodyweight)||!int(e.rest,0,900)||!optional(e.mode,v=>["reps","amrap","time"].includes(v))||(e.mode==="time"&&!e.bodyweight)||!optional(e.muscle,str)||!optional(e.instructions,str)||!optional(e.warmupCount,v=>int(v,0,10))||!optional(e.warmupReps,v=>e.warmupCount?range(v):str(v))||!optional(e.warmupKg,v=>blankNum(v,0,2000))||!optional(e.supersetNext,bool)||!optional(e.skipped,bool)||!optional(e.pairId,id)||!optional(e.setTargets,v=>Array.isArray(v)&&v.length<=e.sets&&v.every(target)))fail("oefening");
  if(session&&(!Array.isArray(e.logs)||!e.logs.length||e.logs.length>40||!e.logs.every(l=>obj(l)&&bool(l.done)&&str(l.reps)&&str(l.kg)&&optional(l.warmup,bool)&&optional(l.extra,bool)&&optional(l.target,target)&&(!l.done||numeric(l.reps,1,999)&&Number.isInteger(Number(l.reps))&&(e.bodyweight||numeric(l.kg,0,2000))))))fail("sets");
 }
 for(const [key,list] of [["workouts",state.workouts],["programma's",state.programs],["activiteiten",state.events],["historie",state.history],["eigen oefeningen",state.custom]])unique(list,key);
 for(const e of state.custom)if(!str(e.name)||!str(e.muscle)||!str(e.equipment))fail("eigen oefening");
 for(const w of state.workouts){if(!str(w.name)||!w.exercises.length)fail("workout");unique(w.exercises,"workoutoefeningen");w.exercises.forEach(e=>exercise(e))}
 for(const p of state.programs){if(!str(p.name)||!date(p.start)||!int(p.weeks,1,52)||!p.entries.every(e=>obj(e)&&id(e.workoutId)&&Array.isArray(e.days)&&e.days.length&&e.days.every(d=>int(d,0,6))))fail("programma");for(const [wid,weeks] of Object.entries(p.overrides)){if(!id(wid)||!obj(weeks))fail("weekwaarden");for(const [week,exs] of Object.entries(weeks)){if(!/^\d{1,2}$/.test(week)||!obj(exs))fail("weekwaarden");for(const [eid,t] of Object.entries(exs)){if(!id(eid)||!target(t)||Object.keys(t).some(k=>!["reps","kg"].includes(k)))fail("weekwaarden")}}}}
 for(const e of state.events){if(!kind(e.type)||!date(e.date)||!optional(e.time,v=>v===""||/^([01]\d|2[0-3]):[0-5]\d$/.test(v))||!optional(e.minutes,v=>num(v,0,1440))||!optional(e.series,id)||!optional(e.programId,id)||!optional(e.week,v=>int(v,1,52))||(e.type==="fitness"?!id(e.workoutId):!str(e.name)))fail("activiteit");if(e.overrides!=null){if(!obj(e.overrides))fail("activiteitwaarden");for(const [eid,t] of Object.entries(e.overrides))if(!id(eid)||!target(t)||Object.keys(t).some(k=>!["reps","kg"].includes(k)))fail("activiteitwaarden")}}
 function logged(x,active=false){if(!id(x.id)||!kind(x.type)||!date(x.date)||!str(x.name)||!optional(x.eventId,id)||!optional(x.workoutId,id)||!optional(x.rpe,v=>num(v,0,10))||!optional(x.note,str))fail("sessie");if(active){if(x.type!=="fitness"||!num(x.started,0,9e15)||!optional(x.restUntil,v=>num(v,0,9e15)))fail("actieve sessie")}else if(!num(x.minutes,1,1440)||!optional(x.finished,v=>num(v,0,9e15)))fail("historie");if(x.type==="fitness"){unique(x.exercises,"sessieoefeningen");x.exercises.forEach(e=>exercise(e,true))}}
 state.history.forEach(x=>logged(x));if(state.active)logged(state.active,true);
 if(!state.favorites.every(id)||!state.recent.every(id)||!state.recovery.every(x=>date(x.date))||new Set(state.recovery.map(x=>x.date)).size!==state.recovery.length)fail("voorkeuren of herstel");
 // Restrict imported references to known workouts/programs so rendering cannot dereference missing templates.
 const workouts=new Set(state.workouts.map(w=>w.id)),programs=new Set(state.programs.map(p=>p.id));if(state.programs.some(p=>p.entries.some(e=>!workouts.has(e.workoutId)))||state.events.some(e=>e.type==="fitness"&&(!workouts.has(e.workoutId)||e.programId&&!programs.has(e.programId))))fail("ontbrekende workout of programma");
 return state;
}
export function restoreRecord(row,expected,payload){const checked=parseBackup(JSON.stringify(payload));if(row?.payload?.active)throw Error("Rond de actieve training eerst af");return {...nextRecord(row,expected,checked),restoreBackup:normalizeState(row.payload),restoreBackupAt:Date.now()}}
