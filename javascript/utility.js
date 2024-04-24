console.log("Before IIFE");
(function () {
  // console.log("Inside IIFE");
  if (window.location.pathname === '/index.html') {
    console.log("Redirecting...");
    window.location.href = '/';
  }
})();



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
  if (options.crossorigin) {
    linkElement.crossOrigin = options.crossorigin;
  }
  document.head.appendChild(linkElement);
}

function loadJS(url) {
  const scriptElement = document.createElement("script");
  scriptElement.src = url;
  document.head.appendChild(scriptElement);
}
// Function to handle scroll event to load external CSS
function handleScroll() {
  var triggerScrollPosition = 500;

  if (window.scrollY >= triggerScrollPosition) {
    // Perform your desired action here, such as loading CSS
    loadCSS({url: "https://sibforms.com/forms/end-form/build/sib-styles.css"});
    loadCSS({url: "https://s.pageclip.co/v1/pageclip.css"});
    loadCSS({url: "https://use.fontawesome.com/releases/v5.15.4/css/all.css", integrity: "sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm", crossorigin: "anonymous"});
    loadJS("https://sibforms.com/forms/end-form/build/main.js")
    window.removeEventListener("scroll", handleScroll);
  }
}

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

window.addEventListener("scroll", handleScroll);