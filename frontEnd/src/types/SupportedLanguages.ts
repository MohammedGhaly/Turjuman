// export const supportedLanguages: SupportedLanguage[] = [
//   { emoji: "🇸🇦", language: "arabic" },
//   { emoji: "🇬🇧", language: "english" },
//   { emoji: "🇪🇸", language: "spanish" },
//   { emoji: "🇩🇪", language: "german" },
//   { emoji: "🇫🇷", language: "french" },
//   { emoji: "🇯🇵", language: "japanese" },
// ];

export enum SupportedLanguageEnum {
  English = "English",
  German = "German",
  French = "French",
  Spanish = "Spanish",
  Italian = "Italian",
  Arabic = "Arabic",
  Japanese = "Japanese",
}

export const supportedLanguages = Object.values(SupportedLanguageEnum);
