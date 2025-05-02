import {
  AllTransBackResponse,
  TranslationResponse,
} from "@/types/TranslationResponse";
import api_client from "./api_client";

const translationEndpoint = "api/v1/translate";
const homeTranslationsEndpoint = "api/v1/translates";

export async function translateWord(
  word: string,
  paragraph: string,
  srcLang: string,
  targetLang: string,
  signal: AbortSignal
) {
  const body = { word, paragraph, srcLang, targetLang, isFavorite: false };
  const response = await api_client.post(translationEndpoint, body, {
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
    id: data.id,
    original: data.original,
    translation: data.translation,
    definition: data.definition,
    examples: data.examples,
    synonymsSource: data.synonyms_src,
    synonymsTarget: data.synonyms_target,
  };
  return res;
}

export async function getHomeTranslations() {
  const response = await api_client.get(homeTranslationsEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) throw Error("request failed");

  const data = response.data.data;
  console.log("data=> ", data);
  const res: Array<TranslationResponse> = data.map(
    (item: AllTransBackResponse) => ({
      id: item.id,
      original: item.original,
      translation: item.translation,
      definition: item.definition,
      examples: undefined,
      synonymsSource: item.synonyms_src,
      synonymsTarget: item.synonyms_target,
    })
  );
  console.log("res=> ", res);

  return res;
}
