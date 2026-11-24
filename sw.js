const CACHE="fitness-manager-shell-v4";
const ASSETS=["./index.html","./src/style.css","./src/app.mjs","./src/core.mjs","./src/library.mjs","./src/storage.mjs","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(a=>new Request(a,{cache:"reload"}))))));
// Do not skip waiting: keep existing clients on their coherent shell until closed.
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("fitness-manager-shell-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;
  const u=new URL(e.request.url),root=new URL(self.registration.scope);
  if(e.request.mode==="navigate"&&(u.pathname===root.pathname||u.pathname===new URL("index.html",root).pathname)){
    e.respondWith(caches.open(CACHE).then(c=>c.match("./index.html")).then(r=>r||fetch(e.request)));return;
  }
  if(!ASSETS.some(a=>new URL(a,root).pathname===u.pathname))return;
  e.respondWith(caches.open(CACHE).then(c=>c.match(e.request)).then(r=>r||fetch(e.request)));
});
