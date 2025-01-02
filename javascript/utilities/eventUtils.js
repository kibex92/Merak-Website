export class EventUtils {
  static showEventsPerYear(yearsSelector, eventContainerSelector) {
    let eventContainers = document.querySelectorAll(eventContainerSelector);
    let eventContainerIds = Array.from(eventContainers).map((e) => e.id);
    const years = document.querySelectorAll(yearsSelector);

    let currentYear = new Date().getFullYear();
    currentYear = eventContainerIds.includes(currentYear.toString())
      ? currentYear.toString()
      : (currentYear - 1).toString();

    let currentEvent = document.getElementById(currentYear);

    eventContainers.forEach((e) =>
      e.id === currentYear
        ? e.classList.remove("d-none")
        : e.classList.add("d-none")
    );

    years.forEach((year) => {
      year.innerText.trim() === currentYear
        ? year.classList.add("current-year")
        : "";

      year.addEventListener("click", () => {
        let clickedYear = year.innerText.trim();

        let clickedEvent = document.getElementById(clickedYear);

        // Toggle visibility for the clicked event container
        if (currentEvent !== clickedEvent) {
          currentEvent.classList.add("d-none");
          clickedEvent.classList.remove("d-none");
        }

        // Toggle the "current-year" class for the clicked year
        document
          .querySelector(".years-container .current-year")
          .classList.remove("current-year");
        year.classList.add("current-year");
        // Update the current year and event
        currentYear = clickedYear;
        currentEvent = clickedEvent;
      });
    });
  }
}
