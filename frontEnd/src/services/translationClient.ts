import {
  AllTransBackResponse,
  TranslationResponse,
} from "@/types/TranslationResponse";
import api_client from "./api_client";
import { ITEMS_PER_PAGE } from "@/pages/Home&SavedPage/Homepage";

const translationEndpoint = "api/v1/translate";
const homeTranslationsEndpoint = "api/v1/translates";
const savedTranslationsEndpoint = "api/v1/favorites/translates";
const saveTranslationsEndpoint = "api/v1/favorite/";
const unsaveTranslationsEndpoint = "api/v1/unfavorite/";
const fetchTranslationsEndpoint = "api/v1/singleTranslation/";
const translateImageEndpoint = "api/v1/translate-image";
const translateFileEndpoint = "api/v1/translate-file";
const translateAudioEndpoint = "api/v1/transcribe-audio";

export async function translateWord(
  word: string,
  paragraph: string,
  srcLang: string,
  targetLang: string,
  signal?: AbortSignal
) {
  const save = localStorage.getItem("turjuman-auto-save");
  const body = {
    word,
    paragraph,
    srcLang,
    targetLang,
    isFavorite: save === "true",
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
export async function getSavedTranslations() {
  const response = await api_client.get(savedTranslationsEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) throw Error("request failed");

  const data = response.data.data;
  const count: number = response.data.count;
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
      srcLang: item.srcLang,
      targetLang: item.targetLang,
    })
  );

  const result: { res: TranslationResponse[]; count: number } = { res, count };

  return result;
}

export async function getHomeTranslations(page: number) {
  const response = await api_client.get(homeTranslationsEndpoint, {
    headers: {
      "Content-Type": "application/json",
    },
    params: { page, limit: ITEMS_PER_PAGE, sort: "createdAt" },
  });

  if (response.status !== 200) throw Error("request failed");

  const data = response.data.data;
  const count = response.data.count;
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
      srcLang: item.srcLang,
      targetLang: item.targetLang,
    })
  );
  const result: { res: TranslationResponse[]; count: number } = { res, count };

  return result;
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
  console.log("parsed res=> ", res);
  const { examples } = await translateWord(
    res.original,
    res.original,
    res.srcLang,
    res.targetLang
  );
  res.examples = examples;
  console.log("parsed res with examples => ", res);
  return res;
}
export async function translateFile(
  file: File,
  srcLang: string,
  targetLang: string
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("srcLang", srcLang);
  formData.append("targetLang", targetLang);

  try {
    const response = await api_client.post(translateFileEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const res = response.data.data[0] as {
      original: string;
      translation: string;
    };
    const data = {
      original_text: res.original,
      translated_text: res.translation,
    };
    return data;
  } catch (error) {
    console.error("file translation failed:", error);
    throw error;
  }
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
export async function getAudioTranslation(
  file: File,
  srcLang: string,
  targetLang: string
) {
  const formData = new FormData();
  formData.append("audio", file);
  formData.append("srcLang", srcLang);
  formData.append("targetLang", targetLang);

  try {
    const response = await api_client.post(translateAudioEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const res = response.data as {
      transcript: string;
      translation: string;
    };
    return {
      original_text: res.transcript,
      translated_text: res.translation,
    };
  } catch (error) {
    console.error("Image translation failed:", error);
    throw error;
  }
}
