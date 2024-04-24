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
    if (window.location.pathname === "/index.html") {
      window.location.href = "/";
    }
  }

  static registerServiceWorker(scriptURL = "/javascript/sw.js") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(scriptURL)
        .then((registration) => {
          console.log("Service worker registered", registration);
        })
        .catch((error) => {
          console.error("Service worker not registered", error);
        });
    } else {
      console.error("Service workers are not supported by this browser.");
    }
  }

  // Static properties for Brevo error messages and configurations
  static REQUIRED_CODE_ERROR_MESSAGE =
    "Wählen Sie bitte einen Ländervorwahl aus.";
  static LOCALE = "de";
  static EMAIL_INVALID_MESSAGE =
    "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfen Sie das Feldformat und versuchen Sie es erneut.";
  static SMS_INVALID_MESSAGE = GeneralUtils.EMAIL_INVALID_MESSAGE;
  static REQUIRED_ERROR_MESSAGE = "Dieses Feld darf nicht leer sein.";
  static GENERIC_INVALID_MESSAGE =
    "Die eingegebenen Informationen sind nicht gültig. Bitte überprüfen Sie das Feldformat und versuchen Sie es erneut.";

  static translation = {
    common: {
      selectedList: "{quantity} Liste ausgewählt",
      selectedLists: "{quantity} Listen ausgewählt",
    },
  };

  static AUTOHIDE = false;

  static initializeGlobalConfigurations() {
    window.REQUIRED_CODE_ERROR_MESSAGE =
      GeneralUtils.REQUIRED_CODE_ERROR_MESSAGE;
    window.LOCALE = GeneralUtils.LOCALE;
    window.EMAIL_INVALID_MESSAGE = GeneralUtils.EMAIL_INVALID_MESSAGE;
    window.SMS_INVALID_MESSAGE = GeneralUtils.SMS_INVALID_MESSAGE;
    window.REQUIRED_ERROR_MESSAGE = GeneralUtils.REQUIRED_ERROR_MESSAGE;
    window.GENERIC_INVALID_MESSAGE = GeneralUtils.GENERIC_INVALID_MESSAGE;
    window.translation = GeneralUtils.translation;
    window.AUTOHIDE = GeneralUtils.AUTOHIDE;
  }
}
