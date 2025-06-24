import { TranslationResponse } from "../chrome-extension/types/TranslationResponse";
import api_client from "./api_client";

const translationEndpoint = "api/v1/translate";
const saveTranslationsEndpoint = "api/v1/favorite/";
const unsaveTranslationsEndpoint = "api/v1/unfavorite/";
const translateImageEndpoint = "api/v1/translate-image";
// const homeTranslationsEndpoint = "api/v1/translates";
// const savedTranslationsEndpoint = "api/v1/favorites/translates";
// const fetchTranslationsEndpoint = "api/v1/singleTranslation/";
// const translateFileEndpoint = "api/v1/translate-file";
// const translateAudioEndpoint = "api/v1/transcribe-audio";

export async function translateWord(
  word: string,
  paragraph: string,
  srcLang: string,
  targetLang: string,
  isFavorite: boolean,
  signal?: AbortSignal
) {
  // const save = localStorage.getItem("turjuman-auto-save");
  // const save = "false";
  const body = {
    word,
    paragraph,
    srcLang,
    targetLang,
    isFavorite,
  };
  const response = await api_client.post(translationEndpoint, body, {
    signal: signal || undefined,
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.data.success) {
    throw new Error(response.data.error);
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
    srcLang: data.savedTranslation?.srcLang || "",
    targetLang: data.savedTranslation?.targetLang || "",
    isFavorite: data.isFavorite,
  };
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
export async function translateImage(
  file: File,
  srcLang: string,
  targetLang: string
) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("srcLang", srcLang);
  formData.append("targetLang", targetLang);

  try {
    const response = await api_client.post(translateImageEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data as {
      original_text: string;
      translated_text: string;
    };
  } catch (error) {
    console.error("Image translation failed:", error);
    throw error;
  }
}
