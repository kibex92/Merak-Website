import { RecaptchaUtils } from "./utilities/recaptchaUtils.js";
import { LoadResourceUtils } from "./utilities/loadResourceUtils.js";
import { GeneralUtils } from "./utilities/generalUtils.js";
import { LazyLoader } from "./utilities/lazyloader.js";
import { LiteYTEmbed } from "./utilities/lite-embed-yt.js";

// Register custom element
if (!customElements.get("lite-youtube")) {
  customElements.define("lite-youtube", LiteYTEmbed);
}
// Register Service Worker
GeneralUtils.registerServiceWorker();
// Redirect from "/index.html"
GeneralUtils.redirectFromIndex();

async function initHome() {
  const { Calendar } = await import("./calendar.js");
  const calendar = new Calendar(".events");
  const concerts = await calendar.fetchConcerts();
  const groupedConcerts = calendar.groupConcertsByMonthAndYear(concerts);
  calendar.addConcertSectionsToEventContainers(groupedConcerts);

  const { EventUtils } = await import("./utilities/eventUtils.js");
  EventUtils.showEventsPerYear(".year", ".event-container");

  const { CarouselUtils } = await import("./utilities/carouselUtils.js");
  CarouselUtils.toggleCarousel(".menu-btn", "#carouselExampleFade");
}

function initGallery() {
  import("./gallery.js").then((module) => {
    const Gallery = module.Gallery;
    new Gallery(".img-grid", "blur");
  });
}

const resources = {
  css: [
    { url: "https://sibforms.com/forms/end-form/build/sib-styles.css" },
    { url: "https://s.pageclip.co/v1/pageclip.css" },
    {
      url: "https://use.fontawesome.com/releases/v5.15.4/css/all.css",
      integrity:
        "sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm",
      crossorigin: "anonymous",
    },
  ],
  js: ["https://sibforms.com/forms/end-form/build/main.js"],
};

document.addEventListener("DOMContentLoaded", () => {
  switch (window.location.pathname) {
    case "/":
      initHome();
      initGallery();
      break;
    case "/gallery.html":
      initGallery();
  }

  new RecaptchaUtils(["VORNAME", "NACHNAME", "EMAIL"]).init();
  new LazyLoader();
  LoadResourceUtils.handleScroll(500, resources);
  GeneralUtils.addScrolledClassToHeader(".main-header");
  GeneralUtils.initializeGlobalConfigurations();
});
