const C="yks-takip-v3";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS).catch(()=>{})));});
self.addEventListener("activate",e=>{e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))]));});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(
    fetch(e.request).then(res=>{ if(res&&res.status===200){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));} return res; })
    .catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html")))
  );
});
