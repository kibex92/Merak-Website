// Register Service Worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js")
		.then((reg) => console.log("service worker registered", reg))
		.catch((err) => console.log("service worker not registered", err));
}

let prevScrollpos = window.pageYOffset;

// Gallery Slider
let galleryImages = document.querySelectorAll(".img-grid");
let getLatestOpenedImg;
let windowWith = window.innerWidth;

galleryImages.forEach((img, index) => {
	img.onclick = () => {
		toggleBlur();
		getLatestOpenedImg = index + 1;

		let container = document.body;
		let newImgWindow = document.createElement("div");
		container.appendChild(newImgWindow);
		newImgWindow.classList.add("img-window");
		newImgWindow.setAttribute("onclick", "closeImg()");

		let newImg = img.cloneNode(true);
		newImgWindow.appendChild(newImg);
		newImg.classList.remove("img-grid");
		newImg.classList.add("popup-img");
		newImg.setAttribute("id", "current-img");

		newImg.onload = () => {
			let newNextBtn = document.createElement("a");
			newNextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
			container.appendChild(newNextBtn);
			newNextBtn.classList.add("img-btn-next");
			newNextBtn.setAttribute("onclick", "nextImg(1)");

			let newPrevBtn = document.createElement("a");
			newPrevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
			container.appendChild(newPrevBtn);
			newPrevBtn.classList.add("img-btn-prev");
			newPrevBtn.setAttribute("onclick", "nextImg(0)");
		};
	};
});

closeImg = () => {
	document.querySelector(".img-window").remove();
	document.querySelector(".img-btn-next").remove();
	document.querySelector(".img-btn-prev").remove();
	toggleBlur();
};

nextImg = (next) => {
	document.querySelector("#current-img").remove();

	let getImgWindow = document.querySelector(".img-window");
	let newImg = document.createElement("img");
	getImgWindow.appendChild(newImg);
	let calcNewImg;
	if (next === 1) {
		calcNewImg = getLatestOpenedImg + 1;
		if (calcNewImg > galleryImages.length) {
			calcNewImg = 1;
		}
	} else if (next === 0) {
		calcNewImg = getLatestOpenedImg - 1;
		if (calcNewImg < 1) {
			calcNewImg = galleryImages.length;
		}
	}
	newImg.setAttribute("src", `./images/gallery/img-${calcNewImg}.jpg`);
	newImg.classList.add("popup-img");
	newImg.setAttribute("id", "current-img");

	getLatestOpenedImg = calcNewImg;
};

// Blur
toggleBlur = () => {
	const blur = document.getElementById("blur");
	blur.classList.toggle("active");
};

document.addEventListener("keydown", (e) => {
	if (e.key == "ArrowLeft") {
		nextImg(0);
	}
	if (e.key == "ArrowRight") {
		nextImg(1);
	}
	if (e.key == "Escape") {
		closeImg();
	}
});

// New menu
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
	const scrollPosition = window.scrollY;
	if (scrollPosition > 10) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});

// Show events per year
const years = document.querySelectorAll(".year");
let currentYear = "2023";
years.forEach((year) => {
	year.addEventListener("click", () => {
		let event = document.getElementById(`${year.innerText.trim()}`);
		event.classList.toggle("d-none");
		if (year.innerText.trim() === currentYear) {
			year.childNodes[1].classList.toggle("cw-90-reverse");
		} else {
			year.childNodes[1].classList.toggle("cw-90");
		}
	});
});

// Resize Youtube Iframes

let videos = document.querySelectorAll(".video-center");
const resizeVideos = () => {
	videos.forEach((video) => {
		let width = video.clientWidth;
		console.log(width);
		video.style.height = width / (16 / 9) + "px";
	});
};

resizeVideos();
window.addEventListener("resize", resizeVideos);

// Dynamic Calendar

concerts = [
	{
		day: "05",
		month: "07",
		city: "Tertianum Residenz München",
		hall: "Privatkonzert",
		link: "",
		visibility: "d-none",
		linkText: "",
	},
	{
		day: "01",
		month: "07",
		city: "Abschlusskonzert",
		hall: "Reaktorhalle - 18 Uhr | Luisenstr. 37a | Eintritt frei!",
		link: "",
		visibility: "d-none",
		linkText: "",
	},
	{
		day: "18",
		month: "06",
		city: "Musik im Olympischen Dorf",
		hall: "Kath. Kirchenzentrum Frieden Christi - 19 Uhr | Eintritt frei!",
		link: "",
		visibility: "d-none",
		linkText: "",
	},
	{
		day: "16",
		month: "06",
		city: "Balkantage",
		hall: "Gasteig Saal X - 20 Uhr",
		link: "https://www.muenchenticket.de/tickets/performances/ep1dyct6pstg/Trio-MERAK",
		visibility: "",
		linkText: "Tickets",
	},
	{
		day: "15",
		month: "06",
		city: "Lesung der Autorin Ursula Kirchenmayer",
		hall: "Fraunhofer Theater - 20 Uhr",
		link: "https://www.fraunhofertheater.de/",
		visibility: "",
		linkText: "Infos",
	},
	{
		day: "07",
		month: "06",
		city: "Flower Power Festival",
		hall: "Reaktorhalle - 18 Uhr | Luisenstr. 37a | Eintritt frei!",
		link: "https://hmtm.de/veranstaltungen/flower-power-festival-sommerkonzert-der-schlagzeugklasse-muenchen/",
		visibility: "",
		linkText: "Infos",
	},
	{
		day: "20",
		month: "05",
		city: "Haar",
		hall: "Kleines Theater - 19 Uhr",
		link: "",
		visibility: "d-none",
		linkText: "",
	},
	{
		day: "06",
		month: "05",
		city: "Lange Nacht der Musik München",
		hall: "Großer Konzertsaal - 20 Uhr | Arcisstr. 12",
		link: "https://hmtm.de/veranstaltungen/lange-nacht-der-musik-eine-lange-kammermusik-nacht-2/",
		visibility: "",
		linkText: "Infos",
	},
	{
		day: "05",
		month: "05",
		city: "Chamberfest HMT Münchenr",
		hall: "Großer Konzertsaal - 19 Uhr | Arcisstr. 12",
		link: "https://hmtm.de/veranstaltungen/chamberfest-abschlusskonzert-alles-moeglich/",
		visibility: "",
		linkText: "Infos",
	},
	{
		day: "18",
		month: "04",
		city: "Gasteig HP8",
		hall: "Saal X - 18 Uhr Eintritt frei!",
		link: "",
		visibility: "d-none",
		linkText: "",
	},
];

let today = new Date();

let eventContainer = document.getElementById("2023");
concerts.forEach((concert) => {
	let eventDate = new Date(2023, concert.month - 1, concert.day);
	let todayStr = `${today.getDate()}.${today.getMonth() + 1}`
	let eventStr = `${eventDate.getDate()}.${eventDate.getMonth() + 1}`
	let position =
		today < eventDate || todayStr === eventStr
			? "afterbegin"
			: "beforeend";
	let pastClass =
		today < eventDate || todayStr === eventStr ? "" : "past";
	let eventDiv = `<div class="event-info ${pastClass}">
								<div class="date">
									<p id="day">${concert.day}.</p>
									<p id="month">${concert.month}.</p>
								</div>
								<div class="venue-container">
									<div class="venues">
										<p class="city ${pastClass}">${concert.city}</p>
										<p class="hall">${concert.hall}</p>
									</div>
								</div>
								<a href="${concert.link}" style="display: inline" target="_blank"
									class="btn-gold ${concert.visibility}">${concert.linkText}</a>
							</div>`;

	eventContainer.insertAdjacentHTML(position, eventDiv);
});
