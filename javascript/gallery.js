// Gallery Slider
let galleryImages = document.querySelectorAll(".img-grid");
let getLatestOpenedImg;
let windowWith = window.innerWidth;


function createGalleryImagePopup(img) {
	const container = document.body;
	const newImgWindow = document.createElement("div");
	container.appendChild(newImgWindow);
	newImgWindow.classList.add("img-window");
	newImgWindow.setAttribute("onclick", "closeImg()");

	const newImg = img.cloneNode(true);
	newImgWindow.appendChild(newImg);
	newImg.classList.remove("img-grid");
	newImg.classList.add("popup-img");
	newImg.setAttribute("id", "current-img");

	newImg.onload = () => {
		const newNextBtn = createButton("img-btn-next", "fas fa-chevron-right", "nextImg(1)");
		container.appendChild(newNextBtn);

		const newPrevBtn = createButton("img-btn-prev", "fas fa-chevron-left", "nextImg(0)");
		container.appendChild(newPrevBtn);
	};
}

function createButton(className, iconClass, onclick) {
	const newBtn = document.createElement("a");
	newBtn.innerHTML = `<i class="${iconClass}"></i>`;
	newBtn.classList.add(className);
	newBtn.setAttribute("onclick", onclick);
	return newBtn;
}

galleryImages.forEach((img, index) => {
	img.onclick = () => {
		toggleBlur();
		getLatestOpenedImg = index + 1;
		createGalleryImagePopup(img, index);
	};
});

const closeImg = () => {
	document.querySelector(".img-window").remove();
	document.querySelector(".img-btn-next").remove();
	document.querySelector(".img-btn-prev").remove();
	toggleBlur();
};

const nextImg = (next) => {
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
const toggleBlur = () => {
	const blur = document.getElementById("blur");
	blur.classList.toggle("active");
};

function handleKeydown(event) {
	switch (event.key) {
		case "ArrowLeft":
			nextImg(0);
			break;
		case "ArrowRight":
			nextImg(1);
			break;
		case "Escape":
			closeImg();
			break;
		default:
			return;
	}
}

document.addEventListener("keydown", handleKeydown);
