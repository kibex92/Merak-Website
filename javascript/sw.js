const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
	"/",
	"/index.html",
	"/main.js",
	"/css/style.css",
	"/css/animations.css",
	"/css/gallery.css",
	"/css/components/banner.css",
	"/css/components/button.css",
	"/css/components/card.css",
	"/css/components/footer.css",
	"/css/components/form.css",
	"/css/components/menu.css",
	"/images/header-FINAL.jpg",
	"/images/merak-website-header.jpg",
	"/images/symbol.png",
	"/images/gallery/boris.jpg",
	"https://use.fontawesome.com/releases/v5.15.4/css/all.css",
	"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
	"https://s.pageclip.co/v1/pageclip.css",
	"https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
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
