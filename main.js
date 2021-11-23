let prevScrollpos = window.pageYOffset;

// Hide Menu on Scroll
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".hamburger").style.top = "0";
    document.querySelector("#back-arrow").style.top = "20px";
  } else {
    document.querySelector(".hamburger").style.top = "-100px";
    document.querySelector("#back-arrow").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
};
