import { SupportedLanguageEnum } from "@/types/SupportedLanguages";
import { TranslationResponse } from "@/types/TranslationResponse";
import { createContext } from "react";

interface TranslationPageState {
  srcLang: SupportedLanguageEnum;
  targetLang: SupportedLanguageEnum;
  isLoading: boolean;
  error: string;
  text: string;
  translation: TranslationResponse;
  autoTranslation: boolean;
  swapLangs: null | (() => void);
  setText: null | ((text: string) => void);
  setTargetLang: null | ((toLang: SupportedLanguageEnum) => void);
  setSrcLang: null | ((fromLang: SupportedLanguageEnum) => void);
  setOptionsTranslationResult:
    | null
    | ((originalText: string, translatedText: string) => void);
  optionTranslate: null | ((file: File, isAudio: boolean) => void);
}

const translationInitialState: TranslationResponse = {
  id: "",
  translation: "",
  original: "",
  definition: "",
  examples: [],
  synonymsSource: [],
  synonymsTarget: [],
  srcLang: "",
  targetLang: "",
};

export const translationPageInitialState: TranslationPageState = {
  srcLang: SupportedLanguageEnum.English,
  targetLang: SupportedLanguageEnum.Arabic,
  isLoading: false,
  error: "",
  text: "",
  translation: translationInitialState,
  swapLangs: null,
  setText: null,
  setTargetLang: null,
  setSrcLang: null,
  setOptionsTranslationResult: null,
  autoTranslation: true,
  optionTranslate: null,
};

type TEXT_CHANGED = { type: "TEXT_CHANGED"; payload: string };
type FROM_LANG_CHANGED = {
  type: "FROM_LANG_CHANGED";
  payload: SupportedLanguageEnum;
};
type LOADING = {
  type: "LOADING";
  payload: boolean;
};
type TO_LANG_CHANGED = {
  type: "TO_LANG_CHANGED";
  payload: SupportedLanguageEnum;
};
type SWAP_LANGS = { type: "SWAP_LANGS" };
type ENABLE_AUTO_TRANSLATION = { type: "ENABLE_AUTO_TRANSLATION" };
type CLEAR_TRANSLATION = { type: "CLEAR_TRANSLATION" };
type SET_TRANSLATION = {
  type: "SET_TRANSLATION";
  payload: TranslationResponse;
};
type SET_OPTIONS_TRANSLATION_RESULT = {
  type: "SET_OPTIONS_TRANSLATION_RESULT";
  payload: { originalText: string; translatedText: string };
};

type ReducerAction =
  | TEXT_CHANGED
  | SWAP_LANGS
  | FROM_LANG_CHANGED
  | TO_LANG_CHANGED
  | CLEAR_TRANSLATION
  | LOADING
  | SET_TRANSLATION
  | SET_OPTIONS_TRANSLATION_RESULT
  | ENABLE_AUTO_TRANSLATION;

export const TranslationPageContext = createContext<TranslationPageState>(
  translationPageInitialState
);

export function translationPageReducer(
  state: TranslationPageState,
  action: ReducerAction
): TranslationPageState {
  switch (action.type) {
    case "FROM_LANG_CHANGED":
      return {
        ...state,
        srcLang: action.payload,
        targetLang:
          state.targetLang === action.payload
            ? state.srcLang
            : state.targetLang,
      };
    case "TO_LANG_CHANGED":
      return {
        ...state,
        targetLang: action.payload,
        srcLang:
          state.srcLang === action.payload ? state.targetLang : state.srcLang,
      };
    case "SWAP_LANGS":
      return {
        ...state,
        srcLang: state.targetLang,
        targetLang: state.srcLang,
      };
    case "TEXT_CHANGED":
      return { ...state, text: action.payload };
    case "CLEAR_TRANSLATION":
      return { ...state, translation: translationInitialState };
    case "SET_TRANSLATION":
      return {
        ...state,
        translation: action.payload,
        text: action.payload.translation || state.text,
        isLoading: false,
        autoTranslation: false,
      };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_OPTIONS_TRANSLATION_RESULT":
      return {
        ...state,
        isLoading: false,
        text: action.payload.originalText,
        autoTranslation: false,
        translation: {
          id: "",
          original: action.payload.originalText,
          translation: action.payload.translatedText,
          srcLang: state.srcLang,
          targetLang: state.targetLang,
          definition: "",
          examples: [],
          isFavorite: false,
          synonymsSource: [],
          synonymsTarget: [],
        },
      };
    case "ENABLE_AUTO_TRANSLATION":
      return { ...state, autoTranslation: true };

    default:
      return state;
  }
}
