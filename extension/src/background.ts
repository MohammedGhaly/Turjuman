console.log("I am the background");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TRANSLATE_WORD") {
    const word = request.word;
    // Handle translation request (e.g., call an API or pass to popup)
    sendResponse({ word, translation: "Example Translation" });
    console.log(sender);
  }
});
