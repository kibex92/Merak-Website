import fetchConcerts from "./concerts.js";
import { addConcertSectionsToEventContainers, groupConcertsByMonthAndYear, eventContainers } from "./calendar.js";
import { Gallery } from "./gallery"

async function addConcerts() {
    let concerts = await fetchConcerts();
    addConcertSectionsToEventContainers(eventContainers, groupConcertsByMonthAndYear(concerts));
}

document.addEventListener('DOMContentLoaded', () => {
    const myGallery = new Gallery(".img-grid", "blur");
});

window.addEventListener("load", addConcerts);
