import { getStoredLanguage, t } from "../services/language-service.js";
import { apiUrl } from "../app/runtime-config.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ESTIMATE_PREFILL_KEY = "alva-estimator-request-summary";

const COPY = {
  en: {
    requiredSummary: "Please complete the required contact fields before sending your request.",
    sending: "Sending request...",
    success: "Your request has been sent. We will contact you shortly.",
    error: "We could not send the request right now. Please try again or contact Alva directly.",
    fields: {
      company: "Company name",
      contact: "Contact person",
      email: "Email address",
      phone: "Phone number",
      message: "Project or product request",
    },
    required: {
      contact: "Enter a contact person.",
      email: "Enter an email address.",
      phone: "Enter a phone number.",
      message: "Describe what you would like Alva to help with.",
    },
    invalidEmail: "Enter a valid email address.",
  },
  sv: {
    requiredSummary: "Fyll i de obligatoriska kontaktuppgifterna innan du skickar förfrågan.",
    sending: "Skickar förfrågan...",
    success: "Er förfrågan har skickats. Vi kontaktar er inom kort.",
    error: "Vi kunde inte skicka förfrågan just nu. Försök igen eller kontakta Alva direkt.",
    fields: {
      company: "Företagsnamn",
      contact: "Kontaktperson",
      email: "E-post",
      phone: "Telefonnummer",
      message: "Projekt eller produktförfrågan",
    },
    required: {
      contact: "Ange kontaktperson.",
      email: "Ange e-postadress.",
      phone: "Ange telefonnummer.",
      message: "Beskriv vad ni vill att Alva hjälper er med.",
    },
    invalidEmail: "Ange en giltig e-postadress.",
  },
};

export function initB2BForm() {
  applyB2BTranslations();
  prefillEstimateRequest();

  const form = document.getElementById("b2b-form");
  if (!form || form.dataset.bound === "true") return;

  form.dataset.bound = "true";
  form.addEventListener("submit", handleSubmit);

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => clearFieldError(field.name));
  });
}

function prefillEstimateRequest() {
  const field = document.querySelector('[name="message"]');
  if (!field || field.value.trim()) return;

  const params = new URLSearchParams(window.location.search);
  const queryValue = params.get("request");
  const storedValue = sessionStorage.getItem(ESTIMATE_PREFILL_KEY);
  const value = queryValue || storedValue;

  if (!value) return;

  field.value = value;
  sessionStorage.removeItem(ESTIMATE_PREFILL_KEY);
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const lang = getStoredLanguage();
  const copy = getCopy(lang);
  const submit = document.getElementById("b2b-submit");
  const success = document.getElementById("b2b-success");

  success?.classList.add("hidden");
  clearFormStatus();
  clearAllFieldErrors();

  const data = buildPayload(form);
  const validation = validatePayload(data, copy);

  if (!validation.valid) {
    showValidationErrors(validation.errors, copy.requiredSummary);
    focusFirstInvalidField(form, validation.errors);
    return;
  }

  const originalLabel = submit?.textContent;
  if (submit) {
    submit.disabled = true;
    submit.textContent = copy.sending;
  }

  try {
    const res = await fetch(apiUrl("/api/b2b"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));

    if (!res.ok || !result.success) {
      throw new Error(result.error || copy.error);
    }

    form.reset();
    success?.classList.remove("hidden");
    if (success) success.textContent = copy.success;
  } catch (error) {
    showFormStatus(error.message || copy.error, "error");
  } finally {
    if (submit) {
      submit.disabled = false;
      submit.textContent = originalLabel;
    }
  }
}

function buildPayload(form) {
  const formData = Object.fromEntries(new FormData(form));
  return {
    company: clean(formData.company),
    contact: clean(formData.contact),
    email: clean(formData.email),
    phone: clean(formData.phone),
    message: clean(formData.message, 4000),
  };
}

function validatePayload(data, copy) {
  const errors = {};

  for (const field of ["contact", "email", "phone", "message"]) {
    if (!data[field]) {
      errors[field] = copy.required[field];
    }
  }

  if (data.email && !EMAIL_RE.test(data.email)) {
    errors.email = copy.invalidEmail;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function showValidationErrors(errors, summary) {
  for (const [field, message] of Object.entries(errors)) {
    setFieldError(field, message);
  }
  showFormStatus(summary, "error");
}

function setFieldError(name, message) {
  const field = document.querySelector(`[name="${name}"]`);
  const error = document.querySelector(`[data-error-for="${name}"]`);

  field?.classList.add("is-invalid");
  field?.setAttribute("aria-invalid", "true");
  if (error) error.textContent = message;
}

function clearFieldError(name) {
  const field = document.querySelector(`[name="${name}"]`);
  const error = document.querySelector(`[data-error-for="${name}"]`);

  field?.classList.remove("is-invalid");
  field?.removeAttribute("aria-invalid");
  if (error) error.textContent = "";
}

function clearAllFieldErrors() {
  document.querySelectorAll("[data-error-for]").forEach((error) => {
    error.textContent = "";
  });
  document.querySelectorAll(".b2b-form input, .b2b-form textarea").forEach((field) => {
    field.classList.remove("is-invalid");
    field.removeAttribute("aria-invalid");
  });
}

function showFormStatus(message, type) {
  const status = document.getElementById("b2b-status");
  if (!status) return;

  status.textContent = message;
  status.dataset.state = type;
  status.classList.remove("hidden");
}

function clearFormStatus() {
  const status = document.getElementById("b2b-status");
  if (!status) return;

  status.textContent = "";
  status.removeAttribute("data-state");
  status.classList.add("hidden");
}

function focusFirstInvalidField(form, errors) {
  const firstName = Object.keys(errors)[0];
  form.querySelector(`[name="${firstName}"]`)?.focus();
}

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function applyB2BTranslations() {
  const lang = getStoredLanguage();
  const copy = getCopy(lang);

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  setText("b2b-title", t(lang, "b2bTitle"));
  setText("b2b-body", t(lang, "b2bBody"));
  setText("b2b-submit", t(lang, "b2bSubmit"));
  setText("b2b-success", copy.success);
  setText("b2b-label-company", copy.fields.company);
  setText("b2b-label-contact", copy.fields.contact);
  setText("b2b-label-email", copy.fields.email);
  setText("b2b-label-phone", copy.fields.phone);
  setText("b2b-label-message", copy.fields.message);
}

function getCopy(lang) {
  return COPY[lang] ?? COPY.en;
}
