// Put all the javascript code here, that you want to execute in background.

function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create(
  {
    id: "wiktionary-search",
    title: "Search '%s' on Wiktionary.",
    contexts: ["selection"]
  },
  onCreated
)

browser.menus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "wiktionary-search") {
    const selectedWord = info.selectionText.toLowerCase();
    try {
      const storage = await browser.storage.local.get("language");
      const language = storage.language;
      console.log(language)
      const wiktionaryUri = encodeURIComponent(selectedWord + "#" + language);
      
      browser.tabs.create({
        url: "https://en.wiktionary.org/wiki/" + wiktionaryUri
      });
    }
    catch (e) {
      console.log(e);
      return
    }
  }
})