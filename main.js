// Register Service Worker
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/sw.js")
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
