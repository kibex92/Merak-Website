import { Gallery } from "./gallery.js"
import { Calendar } from "./calendar.js"
import { EventUtils } from "./utilities/eventUtils.js";
import { CarouselUtils } from "./utilities/carouselUtils.js";
import { RecaptchaUtils } from "./utilities/recaptchaUtils.js";
import { LoadResourceUtils } from "./utilities/loadResourceUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    EventUtils.showEventsPerYear(".year", ".event-container");
    CarouselUtils.toggleCarousel(".menu-btn", "#carouselExampleFade")
    new RecaptchaUtils(["VORNAME", "NACHNAME", "EMAIL"]).init();

    const resources = {
        css: [
            { url: "https://sibforms.com/forms/end-form/build/sib-styles.css" },
            { url: "https://pageclip.com/theme.css" },
            { url: "https://use.fontawesome.com/releases/v5.15.4/css/all.css", integrity: "sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm", crossorigin: "anonymous"}
        ],
        js: [
            "https://sibforms.com/forms/end-form/build/main.js"
        ]
    };

    LoadResourceUtils.handleScroll(500, resources)
    new Gallery(".img-grid", "blur");
    const myCalendar = new Calendar(".events");
    myCalendar.fetchConcerts().then(concerts => {
        const groupedConcerts = myCalendar.groupConcertsByMonthAndYear(concerts);
        myCalendar.addConcertSectionsToEventContainers(groupedConcerts);
    });

});

