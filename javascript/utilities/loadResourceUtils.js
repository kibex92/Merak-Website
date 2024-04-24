export class LoadResourceUtils {
  static loadCSS(options) {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
      linkElement.href = options.url;
      if (options.integrity) {
          linkElement.integrity = options.integrity;
      }
      if (options.crossorigin) {
          linkElement.crossOrigin = options.crossorigin;
      }
    document.head.appendChild(linkElement);
  }

    // Method to load a JavaScript file
  static loadJS(url) {
    const scriptElement = document.createElement("script");
    scriptElement.src = url;
    document.head.appendChild(scriptElement);
  }

  static handleScroll(triggerScrollPosition, resources) {
    const onScroll = () => {
      if (window.scrollY >= triggerScrollPosition) {
          // Load CSS resources
          resources.css.forEach(css => this.loadCSS(css));
          // Load JS resources
          resources.js.forEach(js => this.loadJS(js));
          // Remove the event listener after loading resources
          window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll);
  }
}