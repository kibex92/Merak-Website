export class RecaptchaUtils {
  constructor(formFields) {
    this.formFields = formFields;
  }

    // Method to initialize event listeners on form fields
  init() {
    this.formFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
          field.addEventListener('focus', this.loadRecaptcha.bind(this), false);
      }
    });
  }

    // Method to load the reCAPTCHA script dynamically
  loadRecaptcha() {
    const scriptExists = document.querySelector('script[src="https://www.google.com/recaptcha/api.js?hl=de"]');
      if (!scriptExists) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.google.com/recaptcha/api.js?hl=de';
        head.appendChild(script);

        script.onload = () => {
            this.removeFocusListeners();
        };
    }
  }

    // Method to remove focus event listeners from form fields
  removeFocusListeners() {
    this.formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.removeEventListener('focus', this.loadRecaptcha.bind(this), false);
        }
    });
  }
}
