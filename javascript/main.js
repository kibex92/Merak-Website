import { Gallery } from "./gallery.js"
import { Calendar } from "./calendar.js"



document.addEventListener('DOMContentLoaded', () => {
    new Gallery(".img-grid", "blur");
    const myCalendar = new Calendar(".events");
    myCalendar.fetchConcerts().then(concerts => {
        const groupedConcerts = myCalendar.groupConcertsByMonthAndYear(concerts);
        myCalendar.addConcertSectionsToEventContainers(groupedConcerts);
    });

});

