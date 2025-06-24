import { SupportedLanguageEnum } from "../types/SupportedLanguages";

const langToCode: Record<
  | "English"
  | "German"
  | "French"
  | "Spanish"
  | "Italian"
  | "Arabic"
  | "Japanese",
  string
> = {
  English: "sh",
  German: "de",
  French: "fr",
  Spanish: "es",
  Italian: "it",
  Arabic: "sa",
  Japanese: "jp",
};

export default function getLangCode(lang: SupportedLanguageEnum) {
  return langToCode[lang];
}
