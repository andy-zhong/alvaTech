import { t, getStoredLanguage } from "../services/language-service.js";

export function initB2BForm() {
  applyB2BTranslations();

  const form = document.getElementById("b2b-form");
  const success = document.getElementById("b2b-success");

  if (!form) return;

  // 🔥 STOPPA dubbel-binding
  if (form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const lang = getStoredLanguage();

    const formData = Object.fromEntries(new FormData(form));

    console.log("FORM DATA:", formData); // 🔍 DEBUG

    const data = {
      company: formData.company || "",
      contact: formData.contact || "",
      email: formData.email || "",
      phone: formData.phone || "",
      message: formData.message || ""
    };

    console.log("SENDING DATA:", data); // 🔍 DEBUG

    try {
      const res = await fetch("/api/b2b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("SERVER RESPONSE:", result);

      if (!result.success) throw new Error(result.error);

      form.reset();
      success.classList.remove("hidden");
      success.textContent = t(lang, "b2bSuccess");

    } catch (err) {
      console.error("FRONTEND ERROR:", err);
      alert(t(lang, "b2bError"));
    }
  });
}

function applyB2BTranslations() {
  const lang = getStoredLanguage();

  const setText = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(lang, key);
  };

  const setPlaceholder = (selector, key) => {
    const el = document.querySelector(selector);
    if (el) el.placeholder = t(lang, key);
  };

  setText("b2b-title", "b2bTitle");
  setText("b2b-body", "b2bBody");
  setText("b2b-submit", "b2bSubmit");
  setText("b2b-success", "b2bSuccess");

  setPlaceholder('input[name="company"]', "b2bCompany");
  setPlaceholder('input[name="contact"]', "b2bContact");
  setPlaceholder('input[name="email"]', "b2bEmail");
  setPlaceholder('input[name="phone"]', "b2bPhone");
  setPlaceholder('textarea[name="message"]', "b2bMessage");
}
