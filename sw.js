const staticCacheName = "site-static"
const assets = [
    "/",
    "/index.html",
    "/main.js",
    "/css/style.css",
    "/images/header-FINAL.png",
    "/images/merak-website-header.png",
    "/images/symbol.png",
    "images/gallery/Boris.png",
    // "/images/gallery/Cris.png",
    // "/images/gallery/Moritz.png",
    // "/images/gallery/img-1.png",
    // "/images/gallery/img-2.png",
    // "/images/gallery/img-3.png",
    // "/images/gallery/img-4.png",
    // "/images/gallery/img-5.png",
    // "/images/gallery/img-6.png",
    // "/images/gallery/img-7.png",
    // "/images/gallery/img-8.png",
    "https://use.fontawesome.com/releases/v5.15.4/css/all.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    "https://s.pageclip.co/v1/pageclip.css"
]

self.addEventListener("install", event => {
    // console.log("service worker has been installed");
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("caching shell assets");
            cache.addAll(assets)
        }))



})

// activate event
self.addEventListener("activate", event => {
    // console.log("service worker has been activated");
})

// fetch event
self.addEventListener("fetch", event => {
    // console.log("fetch event", event);
    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheRes || fetch(event.request)
        })
    )
})