/**
 * Actions and functions of the popup are defined here.
 * When the popup is opened, it loads the saved settings from the
 * memory with loadSettings function. 
 * 
 * This includes the  currently selected "anchor" language.
 */


// Define list of languages
// I wanted to do this "dynamically" but Firefox
// wasn't so cooperative to my solutions.
// I might try again in the future if the list expands a lot.
const languagesList = [
  "Arabic",
  "Chinese",
  "Czech",
  "Dutch",
  "English",
  "Estonian",
  "Finnish",
  "French",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Icelandic",
  "Indonesian",
  "Italian",
  "Irish",
  "Japanese",
  "Korean",
  "Norwegian Bokmål",
  "Norwegian Nynorsk",
  "Polish",
  "Portuguese",
  "Russian",
  "Sanskrit",
  "Spanish",
  "Swedish",
  "Turkish",
  "Ukranian",
  "Vietnamese",
  "Welsh"
];

// Load the settings.
loadSettings();

// Listen for click events on the save-button element.
const saveButton = document.querySelector("#popup-save-button");
saveButton.addEventListener("click", saveSettings);

// Make the English default.
const DEFAULT_SETTINGS = {
  language: "English",
}

async function loadSettings() {
  // Initiate variables.
  let language = "";

  // Load the settings storage.
  const storage = await browser.storage.local.get();
  // Check if the settings are empty.
  // If no, load from storage.
  // Else use the default settings.
  if (Object.keys(storage).length > 0) {
    language = storage.language;
  } else {
    browser.storage.local.set(DEFAULT_SETTINGS);
    language = DEFAULT_SETTINGS.language;
  }

  // Apply the settings.
  createLanguageOptions(languagesList);
  setLanguage(language);
}

async function saveSettings(e) {

  // Prevent the default html event procedure.
  e.preventDefault();

  // Set the selected language and languages list to storage.
  const language = document.querySelector("#languages").value;
  browser.storage.local.set({
    language: language
  });
  // Apply the language to the input element.
  setLanguage(language);

  // Display the saved overlay and close the popup after a delay.
  document.querySelector(".saved").style.visibility = "visible"
  setTimeout(() => window.close(), 1500);
}

/**
 * Set the currently selected language on the input element.
 * @param {string} language 
 */
function setLanguage(language) {
  document.querySelector("#languages").value = language;
}


function createLanguageOptions(languagesList) {
  // Create options elements depending on the languages in the list.
  for (let i = 0; i < languagesList.length; i++) {
    // Create the node and append it to the languages list.
    const languageOption = document.createElement(
      "option", {
        value: languagesList[i],
      }
    );

    languageOption.textContent = languagesList[i];
    // Append the element to the input and list elements.
    document.querySelector("#languages").appendChild(
      languageOption
    );
  }
}
