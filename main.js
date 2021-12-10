let prevScrollpos = window.pageYOffset;

// Hide Menu on Scroll
window.onscroll = () => {
	let currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.querySelector(".hamburger").style.top = "0";
	} else {
		document.querySelector(".hamburger").style.top = "-100px";
		// document.querySelector("#back-arrow").style.top = "-100px";
	}
	prevScrollpos = currentScrollPos;
};

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
