let today = new Date();
let eventContainers = document
  .querySelector(".events")
  .getElementsByClassName("event-container");

const monthTemplate = document.getElementById("month-template");
const monthsMap = new Map();

concerts.forEach((concert) => {
	// Create unique month key to be used with the monthsMap
  const monthKey = `${concert.month}-${concert.year}`;

  // Check if the month-section already exists
  if (!monthsMap.has(monthKey)) {
    // If not, create a new month-section
    let newMonthSection = monthTemplate.content.cloneNode(true);
    newMonthSection.querySelector('h3').textContent = `${getMonth(concert.month)}`;
    monthsMap.set(monthKey, newMonthSection);
  }

	// Create a div with concert details to append to the month section
  const concertInfo = document.createElement('div');
  concertInfo.classList.add('event-info');
  concertInfo.innerHTML = `
    <h3 class="date">${concert.day}.${concert.month}</h3>
    <h3 class="city">${concert.city}</h3>
    <p class="venue">${concert.hall}</p>
    <a href="${concert.link}" class="tickets btn-gold">Tickets</a>
  `;

  // Append the concert info to the corresponding month-section
  monthsMap.get(monthKey).appendChild(concertInfo);
});

// Append the month-sections to the respective event containers
for (let i = 0; i < eventContainers.length; i++) {
  const event = eventContainers[i];
  const year = event.id;
  const yearMonths = [...monthsMap.keys()].filter(key => key.endsWith(`-${year}`));

  yearMonths.forEach((monthKey) => {
    event.appendChild(monthsMap.get(monthKey).cloneNode(true));
  });
}
