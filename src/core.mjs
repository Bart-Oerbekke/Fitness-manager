export function dateAdd(date,n){const d=new Date(date+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}

export function weekday(date){return new Date(date+"T12:00:00Z").getUTCDay()}

export function repRange(value){const m=String(value).trim().match(/^(\d+)(?:\s*[-–]\s*(\d+))?$/);if(!m)return null;const min=Number(m[1]),max=Number(m[2]||m[1]);return min>=1&&max>=min&&max<=999?{min,max}:null}

export function validReps(v){return String(v).trim()!==""&&Number.isInteger(Number(v))&&Number(v)>=1&&Number(v)<=999}

export function validKg(v){return String(v).trim()!==""&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=2000}

export function copyField(ex,index,field){if(!["reps","kg"].includes(field)||!ex.logs[index]||(field==="kg"&&ex.bodyweight))return false;const v=ex.logs[index][field];if(!(field==="reps"?validReps(v):validKg(v)))return false;ex.logs.forEach((s,i)=>{if(i!==index&&!s.done&&!!s.warmup===!!ex.logs[index].warmup)s[field]=v});return true}

export function confirmSet(ex,index,accept=false,actualReps=""){const s=ex.logs[index];if(!s)return {status:"invalid"};if(s.done){s.done=false;return {status:"unchecked"}};let reps=s.reps,kg=s.kg;const emptyR=String(reps).trim()==="",emptyW=!ex.bodyweight&&String(kg).trim()==="";if(emptyR||emptyW){if(!accept)return {status:"confirm",range:repRange(s.warmup?ex.warmupReps||"10":ex.reps),kg:s.warmup?ex.warmupKg||"":ex.kg};if(emptyR){const range=repRange(s.warmup?ex.warmupReps||"10":ex.reps);reps=range&&range.min===range.max?String(range.min):actualReps}if(emptyW)kg=s.warmup?ex.warmupKg||"":ex.kg}if(!validReps(reps)||(!ex.bodyweight&&!validKg(kg)))return {status:"invalid"};s.reps=String(Number(reps));s.kg=ex.bodyweight?"":String(Number(kg));s.done=true;return {status:"checked"}}

export function occurrences(start,weeks,days){let out=[];if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||!Number.isInteger(weeks)||weeks<1||weeks>52||!days.length)return out;for(let i=0;i<weeks*7;i++){const date=dateAdd(start,i);if(days.includes(weekday(date)))out.push({date,week:Math.floor(i/7)+1})}return out}

export function snapshot(template,overrides={}){const list=template.exercises.map(e=>{const x={...e,...(overrides[e.id]||{})};return {...x,logs:[...Array.from({length:Math.min(10,Math.max(0,Number(x.warmupCount)||0))},()=>({reps:"",kg:"",done:false,warmup:true})),...Array.from({length:x.sets},()=>({reps:"",kg:"",done:false}))]}});for(let i=0;i<list.length-1;i++){if(list[i].supersetNext&&list[i].sets===list[i+1].sets&&!list[i].pairId){list[i].pairId=list[i+1].pairId=list[i].id;i++}}return list}

export function priorSessions(history,exerciseId,currentId){return history.filter(h=>h.id!==currentId&&h.type==="fitness").flatMap(h=>{return h.exercises.filter(x=>x.exerciseId===exerciseId&&x.logs.some(s=>s.done)).map(e=>({id:h.id,date:h.date,finished:h.finished,ea:e.ea,bodyweight:e.bodyweight,equipment:e.equipment,sets:e.logs.map((s,i)=>({...s,index:s.warmup?e.logs.slice(0,i+1).filter(x=>x.warmup).length:e.logs.slice(0,i+1).filter(x=>!x.warmup).length})).filter(s=>s.done)}))}).sort((a,b)=>b.date.localeCompare(a.date)||(b.finished||0)-(a.finished||0))}

export function weeklyMinutes(history,start){const end=dateAdd(start,7);return history.filter(h=>h.date>=start&&h.date<end).reduce((a,h)=>{a[h.type]=(a[h.type]||0)+Number(h.minutes||0);return a},{})}

export function filterLibrary(items,query,muscle,equipment){return items.filter(e=>e.name.toLowerCase().includes(query.trim().toLowerCase())&&(!muscle||e.muscle===muscle)&&(!equipment||e.equipment===equipment)).sort((a,b)=>a.name.localeCompare(b.name))}

export function monthShift(date,delta){const d=new Date(date+"T12:00:00Z"),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+delta);const end=new Date(d);end.setUTCMonth(end.getUTCMonth()+1,0);d.setUTCDate(Math.min(day,end.getUTCDate()));return d.toISOString().slice(0,10)}
export function monthCells(date){const first=date.slice(0,7)+"-01",start=dateAdd(first,-((weekday(first)+6)%7));const next=monthShift(first,1),last=dateAdd(next,-1),end=dateAdd(last,6-((weekday(last)+6)%7));const result=[];for(let d=start;d<=end;d=dateAdd(d,1))result.push(d);return result}
export function calendarItems(events,history,workouts,date){const completed=new Set(history.filter(h=>h.eventId).map(h=>h.eventId));const planned=events.filter(e=>e.date===date&&!completed.has(e.id)).map(e=>({id:e.id,type:e.type,name:e.type==="fitness"?(workouts.find(w=>w.id===e.workoutId)?.name||"Workout"):e.name,time:e.time||"",minutes:e.minutes||0,done:false}));const actual=history.filter(h=>h.date===date).map(h=>({id:h.id,type:h.type,name:h.name,time:events.find(e=>e.id===h.eventId)?.time||"",minutes:h.minutes||0,done:true}));return [...planned,...actual].sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99")||a.name.localeCompare(b.name))}

export function weekSummary(events,history,workouts,start){const totals={};for(let i=0;i<7;i++){for(const row of calendarItems(events,history,workouts,dateAdd(start,i))){const t=totals[row.type]??=( {planned:0,completed:0,plannedMinutes:0,actualMinutes:0,unknownDuration:0});if(row.done){t.completed++;t.actualMinutes+=row.minutes}else{t.planned++;t.plannedMinutes+=row.minutes;if(!row.minutes)t.unknownDuration++}}}return totals}
export function moveItem(items,from,to){if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||to<0||from>=items.length||to>=items.length)return false;const [item]=items.splice(from,1);items.splice(to,0,item);return true}
export function addExtraSet(ex){if(ex.logs.filter(s=>!s.warmup).length>=30)return false;ex.logs.push({reps:"",kg:"",done:false,extra:true});return true}
export function extendRest(until,now,seconds){return Math.max(until||0,now)+seconds*1000}
export function nextInput(exercises,exIndex,setIndex,field){const fields=exercises[exIndex].bodyweight?["reps"]:["reps","kg"];if(field===fields[0]&&fields.length>1&&!exercises[exIndex].logs[setIndex].done)return {ex:exIndex,set:setIndex,field:fields[1]};for(let i=exIndex;i<exercises.length;i++){if(exercises[i].skipped)continue;for(let j=i===exIndex?setIndex+1:0;j<exercises[i].logs.length;j++){if(!exercises[i].logs[j].done)return {ex:i,set:j,field:"reps"}}}return null}
export function copyWeekValues(rows,source,target){if(source<0||target<0||source>=rows.length||target>=rows.length||source===target)return false;rows[target]=rows[source].map(x=>({...x}));return true}
export function orderedLibrary(items,favorites,recent){const rank=x=>favorites.includes(x.id)?0:recent.includes(x.id)?1:2;return [...items].sort((a,b)=>rank(a)-rank(b)||(rank(a)===1?recent.indexOf(a.id)-recent.indexOf(b.id):a.name.localeCompare(b.name)))}

export function removeSessionSet(ex,index){if(!Number.isInteger(index)||index<0||index>=ex.logs.length||ex.logs.length<=1||ex.logs[index].done)return false;ex.logs.splice(index,1);return true}
// Planned-date references are for display only. Weekly totals use calendarItems.
export function calendarDisplayItems(events,history,workouts,date,active=null){
 const rows=calendarItems(events,history,workouts,date);
 for(const e of events.filter(e=>e.date===date)){
  const h=history.find(h=>h.eventId===e.id);
  if(h&&h.date!==date)rows.push({id:h.id,type:h.type,name:h.name,time:e.time||"",minutes:0,done:true,reference:true,actualDate:h.date});
 }
 if(active){
  const planned=rows.find(r=>!r.done&&r.id===active.eventId);
  if(planned)planned.active=true;
  if(active.date===date&&!planned)rows.push({id:active.id,type:"fitness",name:active.name,time:"",minutes:0,done:false,active:true});
 }
 return rows.sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99")||a.name.localeCompare(b.name));
}

export function validSupersets(list){return list.every((e,i)=>!e.supersetNext||(i<list.length-1&&!list[i+1].supersetNext&&!list[i-1]?.supersetNext&&e.sets===list[i+1].sets))}
export function sessionExercise(item,id){return {id,exerciseId:item.id,name:item.name,equipment:item.equipment,sets:3,reps:"6–10",kg:"",ea:false,bodyweight:item.equipment==="Bodyweight",rest:90,logs:Array.from({length:3},()=>({reps:"",kg:"",done:false}))}}
export function canChangeExercise(e){return !!e&&!e.logs.some(s=>s.done)}
export function unlinkPair(list,pair){if(pair)for(const e of list){if(e.pairId===pair)delete e.pairId}}
export function changeSessionExercise(list,index,replacement){const e=list[index];if(!canChangeExercise(e)||!replacement)return false;unlinkPair(list,e.pairId);list[index]=replacement;return true}
export function skipSessionExercise(list,index){const e=list[index];if(!canChangeExercise(e))return false;e.skipped=!e.skipped;if(e.skipped)unlinkPair(list,e.pairId);return true}
export function moveSessionExercise(list,from,to){if(!moveItem(list,from,to))return false;for(const e of list){if(!e.pairId)continue;const idx=list.indexOf(e),p=list.findIndex(x=>x!==e&&x.pairId===e.pairId);if(Math.abs(idx-p)!==1||p<0)unlinkPair(list,e.pairId)}return true}
export function pairedPartner(list,e){if(!e.pairId||e.skipped)return null;const i=list.indexOf(e);return [list[i-1],list[i+1]].find(x=>x&&!x.skipped&&x.pairId===e.pairId)||null}
export function restAfterSet(list,index,setIndex){const e=list[index],s=e.logs[setIndex],partner=pairedPartner(list,e);if(!partner||s.warmup||s.extra)return e.rest;const round=e.logs.filter(x=>!x.warmup&&!x.extra).indexOf(s),other=partner.logs.filter(x=>!x.warmup&&!x.extra)[round];return other&&!other.done?0:Math.max(e.rest,partner.rest)}
export function setLabel(e,s,i){if(s.warmup)return "W"+(e.logs.slice(0,i+1).filter(x=>x.warmup).length);return String(e.logs.slice(0,i+1).filter(x=>!x.warmup).length)+(s.extra?"+":"")}
export function validRpe(v){return v!==null&&v!==undefined&&String(v).trim()!==""&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=10}
export function validRecovery(x){return !!x&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&["sleep","energy","soreness"].every(k=>Number.isInteger(x[k])&&x[k]>=1&&x[k]<=5)}
export function sportLoad(history,start,end){const days=[];for(let date=start;date<=end;date=dateAdd(date,1)){const sessions=history.filter(s=>s.date===date),types={};let minutes=0,load=0,rated=0;for(const s of sessions){const m=Number(s.minutes);if(!Number.isFinite(m)||m<=0)continue;minutes+=m;types[s.type]=(types[s.type]||0)+m;if(validRpe(s.rpe)){rated+=m;load+=m*Number(s.rpe)}}days.push({date,minutes,types,rated,load})}return {days,minutes:days.reduce((a,d)=>a+d.minutes,0),rated:days.reduce((a,d)=>a+d.rated,0),load:days.reduce((a,d)=>a+d.load,0)}}
export function exerciseMetrics(history,id,from="",to="9999-12-31"){const variants={};for(const session of history){if(session.type!=="fitness"||session.date<from||session.date>to)continue;for(const e of session.exercises||[]){if(e.exerciseId!==id)continue;const key=[e.bodyweight?"bw":"kg",e.ea?"ea":"total",e.equipment||""].join("|"),v=variants[key]??={key,name:e.name,bodyweight:!!e.bodyweight,ea:!!e.ea,equipment:e.equipment,rows:[],maxWeight:null,maxReps:null,e1rm:null,volume:0};const sets=e.logs.filter(s=>s.done&&!s.warmup&&validReps(s.reps)&&(e.bodyweight||validKg(s.kg)));if(!sets.length)continue;const maxReps=Math.max(...sets.map(s=>Number(s.reps))),maxWeight=e.bodyweight?null:Math.max(...sets.map(s=>Number(s.kg))),estim=sets.filter(s=>!e.bodyweight&&Number(s.kg)>0&&Number(s.reps)<=10).map(s=>Number(s.kg)*(Number(s.reps)===1?1:1+Number(s.reps)/30)),e1rm=estim.length?Math.max(...estim):null,volume=e.bodyweight?0:sets.reduce((a,s)=>a+Number(s.kg)*Number(s.reps)*(e.ea||e.equipment==="Dumbbell"?2:1),0);const row=v.rows.find(x=>x.id===session.id);if(row){row.maxReps=Math.max(row.maxReps,maxReps);if(maxWeight!==null)row.maxWeight=Math.max(row.maxWeight??0,maxWeight);if(e1rm!==null)row.e1rm=Math.max(row.e1rm??0,e1rm);row.volume+=volume}else v.rows.push({date:session.date,id:session.id,maxWeight,maxReps,e1rm,volume});v.maxReps=Math.max(v.maxReps??0,maxReps);if(maxWeight!==null)v.maxWeight=Math.max(v.maxWeight??0,maxWeight);if(e1rm!==null)v.e1rm=Math.max(v.e1rm??0,e1rm);v.volume+=volume}}return Object.values(variants).filter(v=>v.rows.length).map(v=>({...v,rows:v.rows.sort((a,b)=>a.date.localeCompare(b.date))}))}
