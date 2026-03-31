Promise.all([
  fetch("/components/navbar.html").then(res => res.text()),
  fetch("/components/footer.html").then(res => res.text())
]).then(([nav, foot]) => {

  // inject navbar + footer
  document.getElementById("navbar").innerHTML = nav;
  document.getElementById("footer").innerHTML = foot;

  // 🔥 NU finns #language → ladda den
  fetch("/components/language.html")
    .then(res => res.text())
    .then(lang => {
      const container = document.getElementById("language");
      if (container) {
        container.innerHTML = lang;
      }

      // 🔥 kör språk EFTER ALLT är klart
      const savedLang = localStorage.getItem("lang") || "en";
      if (typeof applyLanguage === "function") {
        applyLanguage(savedLang);
      }
    });

});