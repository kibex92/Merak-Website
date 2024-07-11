import { API } from "./api.js";

export class Calendar {
  constructor(eventSelector) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);
    this.eventContainers = document
      .querySelector(eventSelector)
      .getElementsByClassName("event-container");
  }

  generateConcertInfo = (concert) => {
    const eventInfo = document.createElement("div");
    eventInfo.classList.add("event-info");

    const cancelled = concert.cancelled ? "line-through" : "";

    eventInfo.innerHTML = `
      <h3 class="date ${cancelled}">${concert.day}.${concert.month}</h3>
      <h3 class="city ${cancelled}">${concert.city}</h3>
      <p class="venue ${cancelled}">${concert.hall}</p>
      <a href="${concert.link}" class="tickets btn-gold ${concert.visibility}" target="_blank">${concert.linkText}</a>
    `;

    return eventInfo;
  };

  // Get month from date in German
  getMonth(index) {
    const objDate = new Date();
    objDate.setDate(1);
    objDate.setMonth(index - 1);

    const locale = "de";
    const month = objDate.toLocaleString(locale, { month: "long" });

    return month;
  }

  sortConcerts(concerts) {
    return concerts.slice().sort((a, b) => {
      const aDate = new Date(`${a.year}-${a.month}-${a.day}`);
      const bDate = new Date(`${b.year}-${b.month}-${b.day}`);
      
      aDate.setHours(0, 0, 0, 0); 
      bDate.setHours(0, 0, 0, 0); 
      if (aDate < this.today) {
        return 1;
      }
      if (bDate < this.today) {
        return -1;
      }

      return aDate - bDate;
    });
  }
  // Group concerts by month and year
  groupConcertsByMonthAndYear(concerts) {
    const monthsMap = new Map();
    concerts.forEach((concert) => {
      const monthKey = `${concert.month}-${concert.year}`;

      if (!monthsMap.has(monthKey)) {
        monthsMap.set(monthKey, {
          monthSection: document.createElement("section"),
          pastConcertsAdded: false,
        });
        monthsMap
          .get(monthKey)
          .monthSection.classList.add("month-section", "mt-4");
        monthsMap.get(
          monthKey
        ).monthSection.innerHTML = `<h3 class="month">${this.getMonth(
          concert.month
        )}</h3><hr>`;
      }

      const concertInfo = this.generateConcertInfo(concert);
      monthsMap.get(monthKey).monthSection.appendChild(concertInfo);

      // Check if the concert is in the past and mark it as added if so
      const concertDate = new Date(
        `${concert.year}-${concert.month}-${concert.day}`
      );
      concertDate.setHours(0, 0, 0, 0); 
      if (concertDate < this.today) {
        monthsMap.get(monthKey).pastConcertsAdded = true;
      }
    });

    return monthsMap;
  }

  // Add concert sections to respective event containers
  addConcertSectionsToEventContainers(monthsMap) {
    for (let i = 0; i < this.eventContainers.length; i++) {
      const event = this.eventContainers[i];
      const year = event.id;
      const yearMonths = [...monthsMap.keys()].filter((key) =>
        key.endsWith(`-${year}`)
      );

      let pastConcertsAddedForYear = false; // Flag to track if past concerts header added for current year

      yearMonths.forEach((monthKey) => {
        if (
          !pastConcertsAddedForYear &&
          year === String(this.today.getFullYear()) &&
          monthsMap.get(monthKey).pastConcertsAdded
        ) {
          const pastConcertsHeader = document.createElement("h4");
          pastConcertsHeader.textContent = "Vergangene Konzerte";
          pastConcertsHeader.classList.add("mt-4");
          event.appendChild(pastConcertsHeader);
          pastConcertsAddedForYear = true; // Set flag to true once header added for current year
        }

        event.appendChild(monthsMap.get(monthKey).monthSection.cloneNode(true));
      });
    }
  }

  async fetchConcerts() {
    const concerts = await API.fetchConcerts();
    return this.sortConcerts(concerts);
  }
}
