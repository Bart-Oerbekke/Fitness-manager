import {spawn} from 'node:child_process';
import {mkdtemp,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import assert from 'node:assert/strict';
const dir=await mkdtemp(join(tmpdir(),'fm-chrome-'));
const chrome=spawn(process.env.CHROME_BIN||'google-chrome',['--headless','--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--remote-debugging-port=0','--user-data-dir='+dir,'about:blank'],{stdio:'ignore'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function wait(fn,label,ms=20000){const end=Date.now()+ms;let last;while(Date.now()<end){try{const v=await fn();if(v)return v}catch(e){last=e}await sleep(150)}throw Error('Timeout: '+label+(last?' '+last.message:''))}
let ws;
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
 await evaluate("localStorage.setItem('fm-local-preview-v1',JSON.stringify({version:1,custom:[],workouts:[],programs:[],events:[],history:[],active:null,favorites:[],recent:[]}))");
 await cdp('Page.navigate',{url:base+'/'});
 await wait(()=>evaluate("!!document.querySelector('.cal-shell')"),'app initialized');
 await wait(()=>evaluate("!!navigator.serviceWorker.controller"),'service worker controls app');
 await cdp('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
 await cdp('Page.reload');
 await wait(()=>evaluate("!!document.querySelector('.cal-shell') && navigator.onLine===false && document.querySelector('#storage-status')?.textContent.includes('Offline')"),'offline app reopened');
 await evaluate("document.querySelector('[data-action=cal-add]').click();document.querySelector('[data-action=cal-plan-other]').click();document.querySelector('#dialog-form [name=name]').value='Offline test';document.querySelector('#dialog-form [name=minutes]').value='42';document.querySelector('#dialog-form').requestSubmit()");
 await wait(()=>evaluate("document.querySelector('.cal-day-agenda')?.textContent.includes('Offline test') && document.querySelector('#storage-status')?.textContent.includes('Offline')"),'offline write committed');
 await cdp('Page.reload');
 await wait(()=>evaluate("document.querySelector('.cal-day-agenda')?.textContent.includes('Offline test') && navigator.onLine===false"),'offline record survived reload');
 console.log('PASS_OFFLINE_APP');
}finally{
 ws?.close();chrome.kill();await sleep(300);await rm(dir,{recursive:true,force:true,maxRetries:3,retryDelay:200});
}
