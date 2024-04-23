import { Gallery } from "./gallery.js"
import { Calendar } from "./calendar.js"
import { EventUtils } from "./utilities/eventUtils.js";


document.addEventListener('DOMContentLoaded', () => {
    // EventUtils.showEventsPerYear(".year", ".event-container");
    new Gallery(".img-grid", "blur");
    const myCalendar = new Calendar(".events");
    myCalendar.fetchConcerts().then(concerts => {
        const groupedConcerts = myCalendar.groupConcertsByMonthAndYear(concerts);
        myCalendar.addConcertSectionsToEventContainers(groupedConcerts);
    });

});

