import {
  AllTransBackResponse,
  TranslationResponse,
} from "@/types/TranslationResponse";
import api_client from "./api_client";

const translationEndpoint = "api/v1/translate";
const homeTranslationsEndpoint = "api/v1/translates";
const savedTranslationsEndpoint = "api/v1/favorites/translates";
const saveTranslationsEndpoint = "api/v1/favorite/";
const unsaveTranslationsEndpoint = "api/v1/unfavorite/";
const fetchTranslationsEndpoint = "api/v1/singleTranslation/";

export async function translateWord(
  word: string,
  paragraph: string,
  srcLang: string,
  targetLang: string,
  signal?: AbortSignal
) {
  const body = { word, paragraph, srcLang, targetLang, isFavorite: false };
  const response = await api_client.post(translationEndpoint, body, {
    signal: signal || undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.data.success) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = response.data.data;
  const res: TranslationResponse = {
    id: data.savedTranslation?._id || data.id,
    original: data.original,
    translation: data.translation,
    definition: data.definition,
    examples: data.examples,
    synonymsSource: data.synonyms_src,
    synonymsTarget: data.synonyms_target,
    srcLang: data.srcLang,
    targetLang: data.targetLang,
    isFavorite: data.isFavorite,
  };
  return res;
}
export async function getSavedTranslations() {
  const response = await api_client.get(savedTranslationsEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) throw Error("request failed");

  const data = response.data.data;
  const res: Array<TranslationResponse> = data.map(
    (item: AllTransBackResponse) => ({
      id: item.id,
      isFavorite: item.isFavorite,
      original: item.original,
      translation: item.translation,
      definition: item.definition,
      examples: undefined,
      synonymsSource: item.synonyms_src,
      synonymsTarget: item.synonyms_target,
    })
  );

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
  const res: Array<TranslationResponse> = data.map(
    (item: AllTransBackResponse) => ({
      id: item.id,
      original: item.original,
      translation: item.translation,
      definition: item.definition,
      examples: undefined,
      isFavorite: item.isFavorite || false,
      synonymsSource: item.synonyms_src,
      synonymsTarget: item.synonyms_target,
    })
  );
  return res;
}
export async function saveTranslation(id: string): Promise<string> {
  const response = await api_client.get(saveTranslationsEndpoint + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) throw Error("request failed");
  return response.data.data._id;
}
export async function unsaveTranslation(id: string) {
  const response = await api_client.patch(unsaveTranslationsEndpoint + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) throw Error("request failed");
  return;
}
export async function fetchTranslation(
  id: string
): Promise<TranslationResponse> {
  const response = await api_client.get(fetchTranslationsEndpoint + id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) throw Error("request failed");
  const data = response.data.data.SingleTrans;
  const res: TranslationResponse = {
    id: data._id,
    original: data.word,
    translation: data.translation,
    srcLang: data.srcLang,
    targetLang: data.targetLang,
    isFavorite: data.isFavorite,
    definition: data.definition,
    synonymsSource: data.synonyms_src,
    synonymsTarget: data.synonyms_target,
    examples: data.examples || null,
  };
  const { examples } = await translateWord(
    res.original,
    res.original,
    res.srcLang,
    res.targetLang
  );
  res.examples = examples;
  return res;
}
