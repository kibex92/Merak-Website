console.log("Before IIFE");
(function () {
  // console.log("Inside IIFE");
  if (window.location.pathname === '/index.html') {
    console.log("Redirecting...");
    window.location.href = '/';
  }
})();