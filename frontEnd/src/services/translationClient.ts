import { TranslationResponse } from "@/types/Translation";
import api_client from "./api_client";

const translationEndpoint = "api/v1/translate";

export async function translateWord(
  word: string,
  paragraph: string,
  srcLang: string,
  targetLang: string,
  signal: AbortSignal
) {
  const body = { word, paragraph, srcLang, targetLang, isFavorite: true };
  const response = await api_client.post(translationEndpoint, body, {
    withCredentials: true,
    signal: signal,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.data.success) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = response.data.data;
  const res: TranslationResponse = {
    original: data.original,
    translation: data.translation,
    definition: data.definition,
    examples: data.examples,
    synonymsSource: data.synonyms_src,
    synonymsTarget: data.synonyms_target,
  };
  return res;
}
