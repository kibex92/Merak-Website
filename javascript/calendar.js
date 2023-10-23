// Dynamic Calendar

let today = new Date();
let eventContainers = document
	.querySelector(".events")
	.getElementsByClassName("event-container");

for (let event of eventContainers) {
	concerts.forEach((concert) => {
		let eventDate = new Date(concert.year, concert.month - 1, concert.day);

		if (event.id !== concert.year.toString()) {
			return;
		}
		const compareDates =
			today < eventDate ||
			today.setHours(0, 0, 0, 0) == eventDate.setHours(0, 0, 0, 0);

		let position = compareDates ? "afterbegin" : "beforeend";
		let pastClass = compareDates ? "" : "past";

		// let eventDiv = `<div class="event-info ${pastClass}">
		// 							<div class="date">
		// 								<p id="day">${concert.day}.</p>
		// 								<p id="month">${concert.month}.</p>
		// 							</div>
		// 							<div class="venue-container">
		// 								<div class="venues">
		// 									<p class="city ${pastClass}">${concert.city}</p>
		// 									<p class="hall">${concert.hall}</p>
		// 								</div>
		// 							</div>
		// 							<a href="${concert.link}" style="display: inline" target="_blank"
		// 								class="btn-gold ${concert.visibility}">${concert.linkText}</a>
		// 						</div>`;

		event.insertAdjacentHTML(position, eventDiv);
	});
}
