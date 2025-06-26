import { SupportedLanguageEnum } from "./SupportedLanguages";

export interface FlashCardType {
  id: string;
  isFavorite: boolean;
  word: string;
  translation: string;
  srcLang: SupportedLanguageEnum;
  targetLang: SupportedLanguageEnum;
  definition: string;
  synonymsSrc: string[];
  synonymsTarget: string[];
  examples: string[];
}
