export class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            this.lazyLoader();
        } else {
            document.addEventListener("DOMContentLoaded", this.lazyLoader.bind(this));
        }
    }

    lazyLoader() {
        const lazyEls = Array.from(document.querySelectorAll("[data-src]"));
        if ("IntersectionObserver" in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.load(entry.target);
                        lazyObserver.unobserve(entry.target);
                    }
                });
            });

            lazyEls.forEach((el) => {
                if (el.tagName === "SCRIPT") {
                    this.load(el);
                } else {
                    lazyObserver.observe(el);
                }
            });
        } else {
            lazyEls.forEach(el => this.load(el));
        }
    }

    load(el) {
        const src = el.getAttribute("data-src");
        const srcset = el.getAttribute("data-srcset");
        if (src) {
            el.setAttribute("src", src);
        }
        if (srcset) {
            el.setAttribute("srcset", srcset);
        }
        el.removeAttribute("data-src");
        el.removeAttribute("data-srcset");
    }
}
