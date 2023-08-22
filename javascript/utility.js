// Resize Youtube Iframes
let videos = document.querySelectorAll(".video-center");
const resizeVideos = () => {
	videos.forEach((video) => {
		let width = video.clientWidth;
		video.style.height = width / (16 / 9) + "px";
	});
};

resizeVideos();
window.addEventListener("resize", resizeVideos);

// Show events per year
const years = document.querySelectorAll(".year");
let currentYear = new Date().getFullYear().toString;
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
