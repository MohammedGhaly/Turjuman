import { createContext, useContext, useEffect, useReducer } from "react";
import { SupportedLanguageEnum } from "../types/SupportedLanguages";
import { TranslationResponse } from "../types/TranslationResponse";
import { translateWord } from "@/services/translationClient";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

interface Props {
  children: React.JSX.Element;
}

interface TranslationPageState {
  srcLang: SupportedLanguageEnum;
  targetLang: SupportedLanguageEnum;
  isLoading: boolean;
  error: string;
  text: string;
  translation: TranslationResponse;
  swapLangs: null | (() => void);
  setText: null | ((text: string) => void);
  setTargetLang: null | ((toLang: SupportedLanguageEnum) => void);
  setSrcLang: null | ((fromLang: SupportedLanguageEnum) => void);
  setImgTranslationResult:
    | null
    | ((originalText: string, translatedText: string) => void);
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

const initialState: TranslationPageState = {
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
  setImgTranslationResult: null,
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

type CLEAR_TRANSLATION = { type: "CLEAR_TRANSLATION" };
type SET_TRANSLATION = {
  type: "SET_TRANSLATION";
  payload: TranslationResponse;
};
type SET_IMG_TRANSLATION_RESULT = {
  type: "SET_IMG_TRANSLATION_RESULT";
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
  | SET_IMG_TRANSLATION_RESULT;

const TranslationPageContext =
  createContext<TranslationPageState>(initialState);

function reducer(
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
      return { ...state, translation: action.payload, isLoading: false };
    case "LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_IMG_TRANSLATION_RESULT":
      return {
        ...state,
        isLoading: false,
        text: action.payload.originalText,
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
    default:
      return state;
  }
}

function TranslationPageProvider({ children }: Props) {
  const [
    { srcLang, targetLang, isLoading, error, text, translation },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!text.trim()) {
      dispatch({ type: "CLEAR_TRANSLATION" });
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const delayDebounce = setTimeout(async () => {
      try {
        dispatch({ type: "LOADING", payload: true });
        const data: TranslationResponse = await translateWord(
          text,
          text,
          srcLang,
          targetLang,
          signal
        );
        dispatch({
          type: "SET_TRANSLATION",
          payload: data,
        });
      } catch (error: unknown) {
        dispatch({ type: "LOADING", payload: false });
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request aborted due to new input");
        } else {
          if (error instanceof Error || error instanceof AxiosError) {
            console.error(error);
            toast({ title: error.message, variant: "destructive" });
          }
        }
      }
    }, 1500);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [text, srcLang, targetLang]);

  // #region state funs
  function setText(text: string) {
    dispatch({ type: "TEXT_CHANGED", payload: text });
  }
  function swapLangs() {
    dispatch({ type: "SWAP_LANGS" });
  }
  function setTargetLang(targetLang: SupportedLanguageEnum) {
    dispatch({ type: "TO_LANG_CHANGED", payload: targetLang });
  }
  function setSrcLang(srcLang: SupportedLanguageEnum) {
    dispatch({ type: "FROM_LANG_CHANGED", payload: srcLang });
  }
  function setImgTranslationResult(
    originalText: string,
    translatedText: string
  ) {
    dispatch({
      type: "SET_IMG_TRANSLATION_RESULT",
      payload: { originalText, translatedText },
    });
  }
  // #endregion state funs
  return (
    <TranslationPageContext.Provider
      value={{
        srcLang,
        text,
        targetLang,
        translation,
        isLoading,
        error,
        setText,
        swapLangs,
        setTargetLang,
        setSrcLang,
        setImgTranslationResult,
      }}
    >
      {children}
    </TranslationPageContext.Provider>
  );
}

function useTranslationPage() {
  const context = useContext(TranslationPageContext);
  if (context === undefined)
    throw new Error(
      "'TranslationPageContext' is used outside the 'TranslationPageProvider'"
    );
  return context;
}

export { TranslationPageProvider, useTranslationPage };
