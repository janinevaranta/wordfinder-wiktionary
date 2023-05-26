

const saveButton = document.querySelector("#popup-save-button");
saveButton.addEventListener("click", saveSettings);

loadSettings();

function setLanguage(language) {
  console.log(language);
  document.querySelector("#languages").value = language;
}

async function saveSettings(e) {
  e.preventDefault();

  const language = document.querySelector("#languages").value;

  browser.storage.local.set({
    language: language
  });

  setLanguage(language);
}

async function loadSettings() {
  const storage = await browser.storage.local.get("language");
  const language = storage.language;

  setLanguage(language);
}