import { fetchConcerts } from "./concerts.js";
import { addConcertSectionsToEventContainers, groupConcertsByMonthAndYear, eventContainers } from "./calendar.js";
let concerts = await fetchConcerts();

addConcertSectionsToEventContainers(eventContainers, groupConcertsByMonthAndYear(concerts));