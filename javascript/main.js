import fetchConcerts from "./concerts.js";
import { addConcertSectionsToEventContainers, groupConcertsByMonthAndYear, eventContainers } from "./calendar.js";

async function addConcerts() {
    let concerts = await fetchConcerts();
    addConcertSectionsToEventContainers(eventContainers, groupConcertsByMonthAndYear(concerts));
}

window.addEventListener("load", addConcerts);
