export class GeneralUtils {
  static addScrolledClassToHeader(headerSelector, scrollThreshold = 10) {
    const headerElement = document.querySelector(headerSelector);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hasScrolledPastThreshold = scrollPosition > scrollThreshold;
      const shouldAddScrolledClass = hasScrolledPastThreshold;

      headerElement.classList.toggle("scrolled", shouldAddScrolledClass);
    };

    window.addEventListener("scroll", handleScroll);
  }

  static redirectFromIndex() {
    if (window.location.pathname === "/index.html") {
      window.location.href = "/";
    }
  }

  static registerServiceWorker(scriptURL = "/javascript/sw.js") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(scriptURL)
        .then((registration) => {
          console.log("Service worker registered", registration);
        })
        .catch((error) => {
          console.error("Service worker not registered", error);
        });
    } else {
      console.error("Service workers are not supported by this browser.");
    }
  }
}
