export function dateAdd(date,n){const d=new Date(date+"T12:00:00Z");d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}

export function weekday(date){return new Date(date+"T12:00:00Z").getUTCDay()}

export function repRange(value){const m=String(value).trim().match(/^(\d+)(?:\s*[-–]\s*(\d+))?$/);if(!m)return null;const min=Number(m[1]),max=Number(m[2]||m[1]);return min>=1&&max>=min&&max<=999?{min,max}:null}

export function validReps(v){return String(v).trim()!==""&&Number.isInteger(Number(v))&&Number(v)>=1&&Number(v)<=999}

export function validKg(v){return String(v).trim()!==""&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=2000}

export function copyField(ex,index,field){if(!["reps","kg"].includes(field)||!ex.logs[index]||(field==="kg"&&ex.bodyweight))return false;const v=ex.logs[index][field];if(!(field==="reps"?validReps(v):validKg(v)))return false;ex.logs.forEach((s,i)=>{if(i!==index&&!s.done)s[field]=v});return true}

export function confirmSet(ex,index,accept=false,actualReps=""){const s=ex.logs[index];if(!s)return {status:"invalid"};if(s.done){s.done=false;return {status:"unchecked"}};let reps=s.reps,kg=s.kg;const emptyR=String(reps).trim()==="",emptyW=!ex.bodyweight&&String(kg).trim()==="";if(emptyR||emptyW){if(!accept)return {status:"confirm",range:repRange(ex.reps),kg:ex.kg};if(emptyR){const range=repRange(ex.reps);reps=range&&range.min===range.max?String(range.min):actualReps}if(emptyW)kg=ex.kg}if(!validReps(reps)||(!ex.bodyweight&&!validKg(kg)))return {status:"invalid"};s.reps=String(Number(reps));s.kg=ex.bodyweight?"":String(Number(kg));s.done=true;return {status:"checked"}}

export function occurrences(start,weeks,days){let out=[];if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||!Number.isInteger(weeks)||weeks<1||weeks>52||!days.length)return out;for(let i=0;i<weeks*7;i++){const date=dateAdd(start,i);if(days.includes(weekday(date)))out.push({date,week:Math.floor(i/7)+1})}return out}

export function snapshot(template,overrides={}){return template.exercises.map(e=>{const o=overrides[e.id]||{};return {...e,...o,logs:Array.from({length:e.sets},()=>({reps:"",kg:"",done:false}))}})}

export function priorSessions(history,exerciseId,currentId){return history.filter(h=>h.id!==currentId&&h.type==="fitness").flatMap(h=>{const e=h.exercises.find(x=>x.exerciseId===exerciseId&&x.logs.some(s=>s.done));return e?[{id:h.id,date:h.date,finished:h.finished,ea:e.ea,bodyweight:e.bodyweight,equipment:e.equipment,sets:e.logs.map((s,i)=>({...s,index:i+1})).filter(s=>s.done)}]:[]}).sort((a,b)=>b.date.localeCompare(a.date)||(b.finished||0)-(a.finished||0))}

export function weeklyMinutes(history,start){const end=dateAdd(start,7);return history.filter(h=>h.date>=start&&h.date<end).reduce((a,h)=>{a[h.type]=(a[h.type]||0)+Number(h.minutes||0);return a},{})}

export function filterLibrary(items,query,muscle,equipment){return items.filter(e=>e.name.toLowerCase().includes(query.trim().toLowerCase())&&(!muscle||e.muscle===muscle)&&(!equipment||e.equipment===equipment)).sort((a,b)=>a.name.localeCompare(b.name))}

export function monthShift(date,delta){const d=new Date(date+"T12:00:00Z"),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+delta);const end=new Date(d);end.setUTCMonth(end.getUTCMonth()+1,0);d.setUTCDate(Math.min(day,end.getUTCDate()));return d.toISOString().slice(0,10)}
export function monthCells(date){const first=date.slice(0,7)+"-01",start=dateAdd(first,-((weekday(first)+6)%7));const next=monthShift(first,1),last=dateAdd(next,-1),end=dateAdd(last,6-((weekday(last)+6)%7));const result=[];for(let d=start;d<=end;d=dateAdd(d,1))result.push(d);return result}
export function calendarItems(events,history,workouts,date){const completed=new Set(history.filter(h=>h.eventId).map(h=>h.eventId));const planned=events.filter(e=>e.date===date&&!completed.has(e.id)).map(e=>({id:e.id,type:e.type,name:e.type==="fitness"?(workouts.find(w=>w.id===e.workoutId)?.name||"Workout"):e.name,time:e.time||"",minutes:e.minutes||0,done:false}));const actual=history.filter(h=>h.date===date).map(h=>({id:h.id,type:h.type,name:h.name,time:events.find(e=>e.id===h.eventId)?.time||"",minutes:h.minutes||0,done:true}));return [...planned,...actual].sort((a,b)=>(a.time||"99:99").localeCompare(b.time||"99:99")||a.name.localeCompare(b.name))}
