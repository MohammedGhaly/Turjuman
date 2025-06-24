import { AxiosError } from "axios";
import {
  saveTranslation,
  translateWord,
  unsaveTranslation,
} from "./services/translationClient";
import isTokenExpired from "./chrome-extension/utils/isTokenExpired";

// background.js or background service worker
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "TRANSLATE_TEXT") {
    let isFavorite = false;
    chrome.storage.local.get("jwt", (res) => {
      if (!res.jwt || isTokenExpired(res.jwt)) {
        throw Error("login and try again");
      } else {
        chrome.storage.sync.get(["autoSaveWords"], (data) => {
          if (data.autoSaveWords) isFavorite = data.autoSaveWords;
          const { text, paragraph, srcLang, targetLang } = message.payload;
          translateWord(text, paragraph, srcLang, targetLang, isFavorite)
            .then((data) => {
              sendResponse({ success: true, data });
            })
            .catch((error) => {
              console.error("error.status=> ", error.status);
              if (error instanceof Error && error.name === "AbortError") {
                return;
              } else {
                if (error instanceof Error || error instanceof AxiosError) {
                  if (error.message === "Network Error") {
                    sendResponse({
                      success: false,
                      error:
                        "No internet connection\ncheck your network and try again",
                    });
                  } else if (
                    error.message === "Request failed with status code 403"
                  ) {
                    sendResponse({
                      success: false,
                      error: "Make sure to login to your account and try again",
                    });
                  } else if (error.message === "login and try again") {
                    sendResponse({
                      success: false,
                      error: error.message,
                    });
                  } else {
                    sendResponse({
                      success: false,
                      error: "Unexpected problem occurred, try again later",
                    });
                  }
                }
              }
            });
        });
      }
    });
    return true;
  }
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "SAVE_TRANS") {
    const { id } = message.payload;

    saveTranslation(id)
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => {
        sendResponse({ success: false, error });
      });

    return true;
  }
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.type === "UNSAVE_TRANS") {
    const { id } = message.payload;

    unsaveTranslation(id)
      .then((data) => sendResponse({ success: true, data }))
      .catch((error) => {
        sendResponse({ success: false, error });
      });

    return true;
  }
});
