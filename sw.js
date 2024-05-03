const staticCacheName = "site-static-v2";
const dynamicCache = "site-dynamic-v1";
const assets = [
  "/",
  "/about.html",
  "/gallery.html",
  "/css/about.css",
  "/css/animations.css",
  "/css/animations.css",
  "/css/gallery.css",
  "/css/style.css",
  "/css/components/banner.css",
  "/css/components/button.css",
  "/css/components/form.css",
  "/css/components/lite-yt.css",
  "/css/components/menu.css",
  "/css/components/newsletter.css",
  "/data/concerts.json",
  "/javascript/api.js",
  "/javascript/calendar.js",
  "/javascript/gallery.js",
  "/javascript/main.js",
  "/javascript/utilities/carouselUtils.js",
  "/javascript/utilities/eventUtils.js",
  "/javascript/utilities/generalUtils.js",
  "/javascript/utilities/lazyloader.js",
  "/javascript/utilities/lite-embed-yt.js",
  "/javascript/utilities/loadResourceUtils.js",
  "/javascript/utilities/recaptchaUtils.js",
  "/images/header-1620.jpg",
  "/images/logo.svg",
  "/images/symbol.png",
  "/images/gallery/boris-1231.jpg",
  "/images/gallery/cris-1231.jpg",
  "/images/gallery/moritz-1231.jpg",
  "/images/gallery/img-1-1620.jpg",
  "/images/gallery/img-2-1620.jpg",
  "/images/gallery/img-3-1620.jpg",
  "/images/gallery/img-4-1620.jpg",
  "/images/gallery/img-5-1620.jpg",
  "/images/gallery/img-6-1620.jpg",
  "/images/gallery/img-7-1620.jpg",
  "/images/gallery/img-8-1620.jpg",
  "https://use.fontawesome.com/releases/v5.15.4/css/all.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
  "https://sibforms.com/forms/end-form/build/sib-styles.css",
  "https://s.pageclip.co/v1/pageclip.css",
  "https://s.pageclip.co/v1/pageclip.js",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
  "https://sibforms.com/forms/end-form/build/main.js"
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (event) => {
  // console.log("service worker has been installed");
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (event) => {
  // console.log("service worker has been activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (event) => {
  // console.log("fetch event", event);
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return (
        cacheResponse ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open(dynamicCache).then((cache) => {
            cache.put(event.request.url, fetchResponse.clone());
            limitCacheSize(dynamicCache, 15);
            return fetchResponse;
          });
        })
      );
    })
  );
});

// TODO: Add offline fallback(#19,#20)
