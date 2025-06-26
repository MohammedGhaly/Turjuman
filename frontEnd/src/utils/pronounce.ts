const languageMap: Record<string, string> = {
  English: "en-US",
  Arabic: "ar-SA",
  Spanish: "es-ES",
  German: "de-DE",
  Italian: "it-IT",
  French: "fr-FR",
};

export function pronounce(word: string, language: string): void {
  const langCode = languageMap[language];
  if (!langCode) {
    console.error(`Unsupported language: ${language}`);
    return;
  }

  if (!("speechSynthesis" in window)) {
    console.error("Text-to-Speech is not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = langCode;

  window.speechSynthesis.speak(utterance);
}
