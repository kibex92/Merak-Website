// gallery.js
export class Gallery {
  constructor(gallerySelector, blurSelector) {
    this.galleryImages = document.querySelectorAll(gallerySelector);
    this.blurElement = document.getElementById(blurSelector);
    this.latestOpenedImg = null;
    this.initGallery();
  }

  initGallery() {
    this.galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        this.toggleBlur();
        this.latestOpenedImg = index + 1;
        this.createGalleryImagePopup(img);
      });
    });

    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  createGalleryImagePopup(img) {
    const container = document.body;
    const newImgWindow = document.createElement("div");
    container.appendChild(newImgWindow);
    newImgWindow.classList.add("img-window");
    newImgWindow.addEventListener("click", this.closeImg.bind(this));

    const newImg = img.cloneNode(true);
    newImgWindow.appendChild(newImg);
    newImg.classList.remove("img-grid");
    newImg.className = "";
    newImg.classList.add("popup-img");
    newImg.id = "current-img";

    newImg.onload = () => {
      const newNextBtn = this.createButton(
        "img-btn-next",
        "fas fa-chevron-right",
        () => this.nextImg(1)
      );
      container.appendChild(newNextBtn);

      const newPrevBtn = this.createButton(
        "img-btn-prev",
        "fas fa-chevron-left",
        () => this.nextImg(0)
      );
      container.appendChild(newPrevBtn);
    };
  }

  createButton(className, iconClass, onclick) {
    const newBtn = document.createElement("a");
    newBtn.innerHTML = `<i class="${iconClass}"></i>`;
    newBtn.classList.add(className);
    newBtn.addEventListener("click", onclick);
    return newBtn;
  }

  closeImg() {
    document.querySelector(".img-window")?.remove();
    document.querySelector(".img-btn-next")?.remove();
    document.querySelector(".img-btn-prev")?.remove();
    this.toggleBlur();
  }

  nextImg(next) {
    const currentImg = document.querySelector("#current-img");
    currentImg?.remove();

    const getImgWindow = document.querySelector(".img-window");
    const newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg =
      next === 1 ? this.latestOpenedImg + 1 : this.latestOpenedImg - 1;
    if (calcNewImg > this.galleryImages.length) calcNewImg = 1;
    if (calcNewImg < 1) calcNewImg = this.galleryImages.length;

    const imageFilename = `./images/gallery/img-${calcNewImg}-2033.jpg`;
    newImg.src = imageFilename;
    newImg.classList.add("popup-img");
    newImg.id = "current-img";

    this.latestOpenedImg = calcNewImg;
  }

  toggleBlur() {
    this.blurElement.classList.toggle("active");
  }

  handleKeydown(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.nextImg(0);
        break;
      case "ArrowRight":
        this.nextImg(1);
        break;
      case "Escape":
        this.closeImg();
        break;
    }
  }
}
