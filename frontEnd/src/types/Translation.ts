export interface TranslationResponse {
  word: string;
  translation: string;
  synonymsTarget?: string[];
  synonymsSource?: string[];
  definition?: string;
  examples?: string[];
}
