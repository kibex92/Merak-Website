// Show events per year
const years = document.querySelectorAll(".year");
let currentYear = new Date().getFullYear().toString();
let currentEvent = document.getElementById(currentYear);
document.querySelectorAll(".event-container").forEach(e => e.id == currentYear ? e.classList.remove("d-none") : e.classList.add("d-none"))

years.forEach((year) => {
  year.innerText.trim() == currentYear ? year.classList.add("current-year") : ""

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
const getMonth = function (index) {

  const objDate = new Date();
  objDate.setDate(1);
  objDate.setMonth(index - 1);

  const locale = "de"
  const month = objDate.toLocaleString(locale, { month: "long" });

  return month;
}

console.log("Before IIFE");
(function () {
  // console.log("Inside IIFE");
  if (window.location.pathname === '/index.html') {
    console.log("Redirecting...");
    window.location.href = '/';
  }
})();

// Add negative z-index on menu btn click
const menuBtn = document.querySelector(".menu-btn")
const carousel = document.getElementById("carouselExampleFade")

function hideCarousel() {
  carousel.style.zIndex = '-1';
}

function showCarousel() {
  carousel.style.zIndex = '0';
}

menuBtn.addEventListener("click", () => {
  if (!menuBtn.checked) {
    showCarousel()
  } else {
    hideCarousel()
  }
})

// Lazy load recaptcha API on form focus
function reCaptchaOnFocus() {
  var head = document.getElementsByTagName('head')[0]
  var script = document.createElement('script')
  script.type = 'text/javascript';
  script.src = 'https://www.google.com/recaptcha/api.js?hl=de'
  head.appendChild(script);

  // remove focus to avoid js error:
  document.getElementById('VORNAME').removeEventListener('focus', reCaptchaOnFocus)
  document.getElementById('NACHNAME').removeEventListener('focus', reCaptchaOnFocus)
  document.getElementById('EMAIL').removeEventListener('focus', reCaptchaOnFocus)
};
// add initial event listener to the form inputs
document.getElementById('VORNAME').addEventListener('focus', reCaptchaOnFocus, false);
document.getElementById('NACHNAME').addEventListener('focus', reCaptchaOnFocus, false);
document.getElementById('EMAIL').addEventListener('focus', reCaptchaOnFocus, false);

function loadCSS(options) {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = options.url;
  if (options.integrity) {
    linkElement.integrity = options.integrity;
  }
  if (options.crossOrigin) {
    linkElement.crossOrigin = options.crossOrigin;
  }
  document.head.appendChild(linkElement);
}

// Function to handle scroll event to load external CSS
function handleScroll() {
  var triggerScrollPosition = 500;

  if (window.scrollY >= triggerScrollPosition) {
    // Perform your desired action here, such as loading CSS
    loadCSS({url: "https://sibforms.com/forms/end-form/build/sib-styles.css"});
    loadCSS({url: "https://s.pageclip.co/v1/pageclip.css"});
    loadCSS({url: "https://use.fontawesome.com/releases/v5.15.4/css/all.css", integrity: "sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm", crossorigin: "anonymous"});
    
    window.removeEventListener("scroll", handleScroll);
  }
}

window.addEventListener("scroll", handleScroll);