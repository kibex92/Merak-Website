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
      return aDate - bDate;
    });
  }

  // Group concerts by month and year
  groupConcertsByMonthAndYear(concerts) {
    const futureConcertsMap = new Map();
    const pastConcertsMap = new Map();

    concerts.forEach((concert) => {
      const monthKey = `${concert.month}-${concert.year}`;
      const concertDate = new Date(
        `${concert.year}-${concert.month}-${concert.day}`
      );
      concertDate.setHours(0, 0, 0, 0); 

      const targetMap = concertDate < this.today ? pastConcertsMap : futureConcertsMap;

      if (!targetMap.has(monthKey)) {
        targetMap.set(monthKey, {
          monthSection: document.createElement("section"),
        });
        targetMap.get(monthKey).monthSection.classList.add("month-section", "mt-4");
        targetMap.get(
          monthKey
        ).monthSection.innerHTML = `<h3 class="month">${this.getMonth(
          concert.month
        )}</h3><hr>`;
      }

      const concertInfo = this.generateConcertInfo(concert);
      targetMap.get(monthKey).monthSection.appendChild(concertInfo);
    });

    return { futureConcertsMap, pastConcertsMap };
  }

  // Add concert sections to respective event containers
  addConcertSectionsToEventContainers({ futureConcertsMap, pastConcertsMap }) {
    for (let i = 0; i < this.eventContainers.length; i++) {
      const event = this.eventContainers[i];
      const year = event.id;

      const futureYearMonths = [...futureConcertsMap.keys()].filter((key) =>
        key.endsWith(`-${year}`)
      );

      const pastYearMonths = [...pastConcertsMap.keys()].filter((key) =>
        key.endsWith(`-${year}`)
      );

      futureYearMonths.forEach((monthKey) => {
        event.appendChild(futureConcertsMap.get(monthKey).monthSection.cloneNode(true));
      });

      if (pastYearMonths.length > 0) {
        const pastConcertsHeader = document.createElement("h4");
        pastConcertsHeader.textContent = "Vergangene Konzerte";
        pastConcertsHeader.classList.add("mt-4");
        event.appendChild(pastConcertsHeader);
      }

      pastYearMonths.forEach((monthKey) => {
        event.appendChild(pastConcertsMap.get(monthKey).monthSection.cloneNode(true));
      });
    }
  }

  async fetchConcerts() {
    const concerts = await API.fetchConcerts();
    return this.sortConcerts(concerts);
  }
}
