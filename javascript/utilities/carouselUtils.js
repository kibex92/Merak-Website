export class CarouselUtils {
  static hideCarousel(carouselSelector) {
    const carousel = document.querySelector(carouselSelector);
    carousel.style.zIndex = "-1";
  }

  static showCarousel(carouselSelector) {
    const carousel = document.querySelector(carouselSelector);
    carousel.style.zIndex = "0";
  }

  // Add negative z-index on menu btn click
  static toggleCarousel(menuBtnSelector, carouselSelector) {
    const menuBtn = document.querySelector(menuBtnSelector);
    menuBtn.addEventListener("click", () => {
      if (!menuBtn.checked) {
        this.showCarousel(carouselSelector);
      } else {
        this.hideCarousel(carouselSelector);
      }
    });
  }
}
