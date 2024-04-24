console.log("Before IIFE");
(function () {
  // console.log("Inside IIFE");
  if (window.location.pathname === '/index.html') {
    console.log("Redirecting...");
    window.location.href = '/';
  }
})();

// Add "scrolled" class to header on scroll
const header = document.querySelector(".main-header");
window.addEventListener("scroll", () => {
	const scrollPosition = window.scrollY;
	if (scrollPosition > 10) {
		header.classList.add("scrolled");
	} else {
		header.classList.remove("scrolled");
	}
});
