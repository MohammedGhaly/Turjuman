import TranslationRequestBody from "../types/TranslationRequestBody";

// const baseUrl = "https://turjuman-translation.vercel.app/";
const baseUrl = "http://127.0.0.1:5000/";
const translationEndpoint = "translate";

// const url = baseUrl + translationEndpoint;

// word, paragraph, srcLang, targetLang

async function getTranslation(body: TranslationRequestBody) {
  const res = await fetch(baseUrl + translationEndpoint, {
    mode: "no-cors",
    body: JSON.stringify({ body }),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (data.success) return data.data;
  else
    throw new Error(
      data.message ? data.message : "an error occurred during translation"
    );
}

export default getTranslation;
