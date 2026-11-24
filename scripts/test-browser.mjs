import {spawn} from 'node:child_process';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const dir=await mkdtemp(join(tmpdir(),'fm-chrome-'));
const chrome=spawn(process.env.CHROME_BIN||'google-chrome',['--headless','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+dir,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function wait(fn,label,ms=20000){const end=Date.now()+ms;let last;while(Date.now()<end){try{const v=await fn();if(v)return v}catch(e){last=e}await sleep(150)}throw Error('Timeout: '+label+(last?' '+last.message:''))}
let ws,originalApp,originalSW;
try{
 const port=await wait(async()=>Number((await readFile(join(dir,'DevToolsActivePort'),'utf8')).split('\n')[0]),'Chrome debug port');
 const pages=await wait(async()=>{const v=await fetch('http://127.0.0.1:'+port+'/json/list').then(r=>r.json());return v.find(x=>x.type==='page')},'Chrome tab');
 ws=new WebSocket(pages.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
 let seq=0;const pending=new Map();
 ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id&&pending.has(m.id)){const [resolve,reject,timer]=pending.get(m.id);pending.delete(m.id);clearTimeout(timer);m.error?reject(Error(m.error.message)):resolve(m.result)}});
 function cdp(method,params={}){return new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method))},10000);pending.set(id,[resolve,reject,timer]);ws.send(JSON.stringify({id,method,params}))})}
 async function evaluate(expression){const result=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value}
 const base='http://localhost:8000';
 await cdp('Page.enable');await cdp('Network.enable');
 await cdp('Page.navigate',{url:base+'/test/storage.browser.html'});
 const status=await wait(()=>evaluate("(()=>{const t=document.querySelector('#result')?.textContent;return t&&t!=='RUNNING'?t:null})()"),'IndexedDB browser integration');
 assert.equal(status,'PASS_STORAGE_BROWSER');console.log(status);
 // Use a separate origin database name in the module test. Seed the real legacy key now.
 await evaluate("localStorage.setItem('fm-local-preview-v1',JSON.stringify({version:1,custom:[],workouts:[{id:'update-test-workout',name:'Update test',exercises:[{id:'update-ex',exerciseId:'test-ex',name:'Push Up',sets:1,reps:'8',kg:'',ea:false,bodyweight:true,rest:0,equipment:'Bodyweight'}]}],programs:[],events:[],history:[],active:null,favorites:[],recent:[]}))");
 await cdp('Page.navigate',{url:base+'/'});
 await wait(()=>evaluate("!!document.querySelector('.cal-shell')"),'app initialized');
 await wait(()=>evaluate("!!navigator.serviceWorker.controller"),'service worker controls app');
 await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
 async function reloadOffline(label){
   const previous=await evaluate('performance.timeOrigin');
   await cdp('Page.reload');
   await wait(()=>evaluate("performance.timeOrigin!=="+previous+" && !!document.querySelector('.cal-shell') && navigator.onLine===false && document.querySelector('#storage-status')?.textContent.includes('Offline') && !document.querySelector('#app').inert"),label);
 }
 async function click(selector){
   await wait(()=>evaluate("!!document.querySelector("+JSON.stringify(selector)+")"),"button "+selector);
   await evaluate("document.querySelector("+JSON.stringify(selector)+").click()");
 }
 await reloadOffline('offline app reopened');
 await click('.cal-header [data-action="cal-add"]');
 await click('#dialog[open] [data-action="cal-plan-other"]');
 await wait(()=>evaluate("!!document.querySelector('#dialog[open] #dialog-form [name=name]')"),'activity form ready');
 for(const width of [320,375,390,430]){
   await cdp('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:true});
   const layout=await evaluate("(()=>{const d=document.querySelector('#dialog'),f=document.querySelector('#dialog-form'),r=d.getBoundingClientRect(),inputs=[...f.querySelectorAll('input:not([type=checkbox]),select')];return {fits:inputs.every(x=>{const b=x.getBoundingClientRect();return b.left>=r.left-1&&b.right<=r.right+1&&b.width>0}),overflow:d.scrollWidth>d.clientWidth+1,unit:f.querySelector('#minutes-unit')?.textContent,mode:f.elements.minutes.inputMode,height:f.elements.minutes.getBoundingClientRect().height,weekUnit:f.querySelector('#weeks-unit')?.textContent}})()");
   assert.equal(layout.fits,true,'form fields fit at '+width);assert.equal(layout.overflow,false,'dialog horizontal overflow at '+width);assert.equal(layout.unit,'min');assert.equal(layout.weekUnit,'weken');assert.equal(layout.mode,'numeric');assert.ok(layout.height<=40);
 }
 assert.equal(await evaluate("document.querySelector('.repeat-days').hidden"),true);
 await evaluate("document.querySelector('#dialog-form [name=weeks]').value='6';document.querySelector('#dialog-form [name=weeks]').dispatchEvent(new Event('input'))");
 assert.equal(await evaluate("document.querySelectorAll('.weekday-option input:not([disabled])').length"),7);
 await evaluate("document.querySelector('#dialog-form [name=weeks]').value='1';document.querySelector('#dialog-form [name=weeks]').dispatchEvent(new Event('input'))");
 console.log('PASS_COMPACT_FORMS');
 await evaluate("document.querySelector('#dialog-form [name=name]').value='Offline test';document.querySelector('#dialog-form [name=minutes]').value='42';document.querySelector('#dialog-form').requestSubmit()");
 await wait(()=>evaluate("document.querySelector('.cal-day-agenda')?.textContent.includes('Offline test') && document.querySelector('#storage-status')?.textContent.includes('Offline')"),'offline write committed');
 await reloadOffline('second offline reload');
 await wait(()=>evaluate("document.querySelector('.cal-day-agenda')?.textContent.includes('Offline test') && navigator.onLine===false"),'offline record survived reload');
 console.log('PASS_OFFLINE_APP');
 await click('#nav [data-page="settings"]');
 assert.equal(await evaluate("document.querySelector('#installed-version').textContent"),'0.7.0');
 await click('[data-action="update-check"]');
 assert.ok(await evaluate("document.querySelector('#update-message').textContent.includes('Geen internet')"));
 await cdp('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
 // Change served files in this disposable CI checkout only; restore in finally.
 originalApp=await readFile('src/app.mjs','utf8');originalSW=await readFile('sw.js','utf8');
 await writeFile('src/app.mjs',originalApp.replace('const APP_VERSION="0.7.0"','const APP_VERSION="0.7.1-test"'));
 await writeFile('sw.js',originalSW.replace('fitness-manager-shell-v8','fitness-manager-shell-v8-ci-update'));
 await wait(()=>evaluate("!!document.querySelector('[data-action=update-check]:not([disabled])')"),'update check ready');
 await click('[data-action="update-check"]');
 await wait(()=>evaluate("!!document.querySelector('[data-action=update-apply]:not([disabled])')"),'new worker waiting');
 // A persisted active workout blocks installation, even while viewing settings.
 await click('#nav [data-page="schemas"]');
 await click('[data-action="workout-open"][data-id="update-test-workout"]');
 await click('[data-action="start"]');
 await click('[data-action="back"]');
 await click('#nav [data-page="settings"]');
 assert.equal(await evaluate("document.querySelector('[data-action=update-apply]').disabled"),true);
 assert.ok(await evaluate("document.querySelector('#update-message').textContent.includes('training')"));
 await click('#nav [data-page="today"]');
 await click('[data-action="resume"]');
 await click('[data-action="check"]');
 await click('#dialog[open] button[type=submit]');
 await click('[data-action="finish"]');
 await click('#dialog[open] button[type=submit]');
 await click('#nav [data-page="settings"]');
 await wait(()=>evaluate("!!document.querySelector('[data-action=update-apply]:not([disabled])')"),'update available after workout');
 console.log('PASS_UPDATE_TRAINING_GUARD');
 await click('#nav [data-page="progress"]');
 assert.ok(await evaluate("document.querySelector('.load-panel').textContent.includes('Sportbelasting')"));
 await click('[data-action="recovery"]');
 await click('#dialog[open] button[type=submit]');
 assert.ok(await evaluate("document.querySelector('.recovery-metrics').textContent.includes('3/5')"));
 await click('#nav [data-page="settings"]');
 console.log('PASS_PROGRESS_RECOVERY');
 // A second same-origin client must prevent forced activation.
 const second=await cdp('Target.createTarget',{url:base+'/icon.svg'});
 try{
   await wait(async()=>{const targets=await cdp('Target.getTargets');return targets.targetInfos.some(t=>t.targetId===second.targetId&&t.url===base+'/icon.svg')},'second client opened');
   await sleep(500);
   await click('[data-action="update-apply"]');
   await wait(()=>evaluate("document.querySelector('#update-message')?.textContent.includes('Sluit andere Fitness Manager-vensters')"),'multiple windows blocked');
 }finally{await cdp('Target.closeTarget',{targetId:second.targetId})}
 await wait(()=>evaluate("!!document.querySelector('[data-action=update-apply]:not([disabled])')"),'update retry ready');
 console.log('PASS_UPDATE_WINDOW_GUARD');
 const previous=await evaluate('performance.timeOrigin');
 await click('[data-action="update-apply"]');
 await wait(()=>evaluate("performance.timeOrigin!=="+previous+" && !!document.querySelector('.cal-shell') && !document.querySelector('#app').inert"),'updated app loaded');
 assert.ok(await evaluate("document.querySelector('.cal-day-agenda').textContent.includes('Offline test')"));
 await click('#nav [data-page="settings"]');
 assert.equal(await evaluate("document.querySelector('#installed-version').textContent"),'0.7.1-test');
 console.log('PASS_APP_UPDATE');
}finally{
 if(originalApp!==undefined)await writeFile('src/app.mjs',originalApp);if(originalSW!==undefined)await writeFile('sw.js',originalSW);
 ws?.close();chrome.kill();await sleep(300);await rm(dir,{recursive:true,force:true,maxRetries:3,retryDelay:200});
}
