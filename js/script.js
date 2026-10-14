const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function closeNavigation() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    closeNavigation();
    menuToggle.focus();
  }
});

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const isExpanded = question.getAttribute("aria-expanded") === "true";
    const answer = document.getElementById(question.getAttribute("aria-controls"));

    question.setAttribute("aria-expanded", String(!isExpanded));
    answer.hidden = isExpanded;
  });
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const formFields = [
  {
    input: document.querySelector("#name"),
    error: document.querySelector("#name-error"),
    getErrorMessage(input) {
      if (!input.value.trim()) {
        return "Please enter your name.";
      }

      if (input.value.trim().length < 2) {
        return "Please enter at least 2 characters.";
      }

      return "";
    },
  },
  {
    input: document.querySelector("#email"),
    error: document.querySelector("#email-error"),
    getErrorMessage(input) {
      if (!input.value.trim()) {
        return "Please enter your email address.";
      }

      if (!input.validity.valid) {
        return "Please enter a valid email address.";
      }

      return "";
    },
  },
  {
    input: document.querySelector("#message"),
    error: document.querySelector("#message-error"),
    getErrorMessage(input) {
      if (!input.value.trim()) {
        return "Please enter a message.";
      }

      if (input.value.trim().length < 10) {
        return "Please enter at least 10 characters.";
      }

      return "";
    },
  },
];

function validateField(field) {
  const message = field.getErrorMessage(field.input);

  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", String(Boolean(message)));
  return message === "";
}

formFields.forEach((field) => {
  field.input.addEventListener("input", () => {
    validateField(field);
    formStatus.textContent = "";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";

  const isFormValid = formFields
    .map((field) => validateField(field))
    .every(Boolean);

  if (!isFormValid) {
    formStatus.textContent = "Please correct the highlighted fields.";
    const firstInvalidField = formFields.find(
      (field) => field.input.getAttribute("aria-invalid") === "true"
    );
    firstInvalidField.input.focus();
    return;
  }

  // This demo validates the form locally; it does not send or save the message.
  formStatus.textContent =
    "Your entries look good, but this demo does not send messages. No information was submitted.";
  contactForm.reset();
  formFields.forEach((field) => {
    field.input.removeAttribute("aria-invalid");
    field.error.textContent = "";
  });
});
