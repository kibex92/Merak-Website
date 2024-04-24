import { Gallery } from "./gallery.js"
import { Calendar } from "./calendar.js"
import { EventUtils } from "./utilities/eventUtils.js";
import { CarouselUtils } from "./utilities/carouselUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    EventUtils.showEventsPerYear(".year", ".event-container");
    CarouselUtils.toggleCarousel(".menu-btn", "#carouselExampleFade")
    new Gallery(".img-grid", "blur");
    const myCalendar = new Calendar(".events");
    myCalendar.fetchConcerts().then(concerts => {
        const groupedConcerts = myCalendar.groupConcertsByMonthAndYear(concerts);
        myCalendar.addConcertSectionsToEventContainers(groupedConcerts);
    });

});

