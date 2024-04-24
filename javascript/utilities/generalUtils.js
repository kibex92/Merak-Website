export class GeneralUtils {
  static addScrolledClassToHeader(headerSelector, scrollThreshold = 10) {
    const headerElement = document.querySelector(headerSelector);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const hasScrolledPastThreshold = scrollPosition > scrollThreshold;
      const shouldAddScrolledClass = hasScrolledPastThreshold;

      headerElement.classList.toggle("scrolled", shouldAddScrolledClass);
    };

    window.addEventListener("scroll", handleScroll);
  }

  static redirectFromIndex() {
    if (window.location.pathname === '/index.html') {
        window.location.href = '/';
    }
  }
}
