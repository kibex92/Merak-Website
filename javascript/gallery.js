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
		console.log("next is", next);
		console.log("latest opened img is", getLatestOpenedImg);

		calcNewImg = getLatestOpenedImg + 1;
		console.log("calc new img is ", calcNewImg);
		if (calcNewImg > galleryImages.length) {
			calcNewImg = 1;
		}
	} else if (next === 0) {
		calcNewImg = getLatestOpenedImg - 1;

		if (calcNewImg < 1) {
			calcNewImg = galleryImages.length;
		}
	}

	// Construct the image filename based on the current device width
	let deviceWidth = window.innerWidth;
	let closestFilename = findClosestFilename(deviceWidth);
	let imageFilename = `./images/gallery/img-${calcNewImg}-${closestFilename}.jpg`;

	newImg.setAttribute("src", imageFilename);
	newImg.classList.add("popup-img");
	newImg.setAttribute("id", "current-img");

	getLatestOpenedImg = calcNewImg;
};

// Function to find the closest available filename based on the device width
function findClosestFilename(deviceWidth) {
	let availableWidths = [480, 720, 1152, 1620, 2033]; // Example available widths
	let closestWidth = availableWidths.reduce((prev, curr) => Math.abs(curr - deviceWidth) < Math.abs(prev - deviceWidth) ? curr : prev);
	return closestWidth;
}


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
