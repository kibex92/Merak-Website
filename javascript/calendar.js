let today = new Date();
let eventContainers = document
  .querySelector(".events")
  .getElementsByClassName("event-container");

const monthTemplate = document.getElementById("month-template");
const monthsMap = new Map();

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

const sortedConcerts = concerts
  .slice()
  .sort((a, b) => {
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

concerts = sortedConcerts;

concerts.forEach((concert) => {
  const monthKey = `${concert.month}-${concert.year}`;

  if (!monthsMap.has(monthKey)) {
    let newMonthSection = monthTemplate.content.cloneNode(true);
    newMonthSection.querySelector('h3').textContent = `${getMonth(concert.month)}`;
    monthsMap.set(monthKey, newMonthSection);
  }

  const concertInfo = generateConcertInfo(concert);
  monthsMap.get(monthKey).appendChild(concertInfo);
});

for (let i = 0; i < eventContainers.length; i++) {
  const event = eventContainers[i];
  const year = event.id;
  const yearMonths = [...monthsMap.keys()].filter(key => key.endsWith(`-${year}`));

  yearMonths.forEach((monthKey) => {
    event.appendChild(monthsMap.get(monthKey).cloneNode(true));
  });
}

