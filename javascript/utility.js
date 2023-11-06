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
let currentYear = new Date().getFullYear().toString();
let currentEvent = document.getElementById(currentYear);

years.forEach((year) => {
  year.addEventListener("click", () => {
    let clickedYear = year.innerText.trim();
    let clickedEvent = document.getElementById(clickedYear);

    // Toggle visibility for the clicked event container
    if (currentEvent !== clickedEvent) {
      currentEvent.classList.add("d-none");
      clickedEvent.classList.remove("d-none");
    }

    // Toggle the "current-year" class for the clicked year
    document.querySelector(".years-container .current-year").classList.remove("current-year");
    year.classList.add("current-year");
    // Update the current year and event
    currentYear = clickedYear;
    currentEvent = clickedEvent;
  });
});

// Get month from date in German
const getMonth = function(index) {

  const objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(index - 1);

  const locale = "de"
  const month = objDate.toLocaleString(locale, { month: "long" });

  return month;
}
