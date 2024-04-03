const today = new Date();
const eventContainers = document.querySelector(".events").getElementsByClassName("event-container");

// Function to generate concert info
const generateConcertInfo = (concert) => {
  const concertInfo = document.createElement('div');
  concertInfo.classList.add('event-info');

  if (concert.cancelled) {
    concertInfo.innerHTML = `
      <h3 class="date line-through">${concert.day}.${concert.month}</h3>
      <h3 class="city line-through">${concert.city} </h3>
      <p class="venue line-through">${concert.hall}</p>
      <a href="${concert.link}" class="tickets btn-gold ${concert.visibility}" target="_blank">${concert.linkText}</a>
    `;
  } else {
    concertInfo.innerHTML = `
      <h3 class="date">${concert.day}.${concert.month}</h3>
      <h3 class="city">${concert.city}</h3>
      <p class="venue">${concert.hall}</p>
      <a href="${concert.link}" class="tickets btn-gold ${concert.visibility}" target="_blank">${concert.linkText}</a>
    `;
  }

  return concertInfo;
}

// Sort concerts based on date
const sortedConcerts = concerts.slice().sort((a, b) => {
  const aDate = new Date(`${a.year}-${a.month}-${a.day}`);
  const bDate = new Date(`${b.year}-${b.month}-${b.day}`);

  if (aDate < today) {
    return 1;
  }
  if (bDate < today) {
    return -1;
  }

  return aDate - bDate;
});

// Group concerts by month and year
const monthsMap = new Map();
sortedConcerts.forEach((concert) => {
  const monthKey = `${concert.month}-${concert.year}`;

  if (!monthsMap.has(monthKey)) {
    monthsMap.set(monthKey, {
      monthSection: document.createElement('section'),
      pastConcertsAdded: false
    });
    monthsMap.get(monthKey).monthSection.classList.add('month-section', 'mt-4');
    monthsMap.get(monthKey).monthSection.innerHTML = `<h3 class="month">${getMonth(concert.month)}</h3><hr>`;
  }

  const concertInfo = generateConcertInfo(concert);
  monthsMap.get(monthKey).monthSection.appendChild(concertInfo);

  // Check if the concert is in the past and mark it as added if so
  const concertDate = new Date(`${concert.year}-${concert.month}-${concert.day}`);
  if (concertDate < today) {
    monthsMap.get(monthKey).pastConcertsAdded = true;
  }
});

// Add concert sections to respective event containers
for (let i = 0; i < eventContainers.length; i++) {
  const event = eventContainers[i];
  const year = event.id;
  const yearMonths = [...monthsMap.keys()].filter(key => key.endsWith(`-${year}`));

  let pastConcertsAddedForYear = false; // Flag to track if past concerts header added for current year

  yearMonths.forEach((monthKey) => {
    if (!pastConcertsAddedForYear && monthsMap.get(monthKey).pastConcertsAdded) {
      const pastConcertsHeader = document.createElement('h4');
      pastConcertsHeader.textContent = 'Vergangene Konzerte';
      pastConcertsHeader.classList.add("mt-4")
      event.appendChild(pastConcertsHeader);
      pastConcertsAddedForYear = true; // Set flag to true once header added for current year
    }

    event.appendChild(monthsMap.get(monthKey).monthSection.cloneNode(true));
  });
}
