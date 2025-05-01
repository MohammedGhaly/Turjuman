export interface TranslationResponse {
  id: string;
  original: string;
  translation: string;
  synonymsTarget?: string[];
  synonymsSource?: string[];
  definition?: string;
  examples?: string[];
}

export interface AllTransBackResponse {
  id: string;
  original: string;
  translation: string;
  srcLang: string;
  targetLang: string;
  definition: string;
  synonyms_src: [string];
  synonyms_target: [string];
}
