export interface TranslationResponse {
  original: string;
  translation: string;
  synonymsTarget?: string[];
  synonymsSource?: string[];
  definition?: string;
  examples?: string[];
}
