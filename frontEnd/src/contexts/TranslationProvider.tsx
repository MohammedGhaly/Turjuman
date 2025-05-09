import { createContext, useContext, useEffect, useReducer } from "react";
import { SupportedLanguageEnum } from "../types/SupportedLanguages";
import { TranslationResponse } from "../types/TranslationResponse";
import { translateWord } from "@/services/translationClient";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import getTranslationOption from "@/utils/getTranslationOption";

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

function TranslationPageProvider({ children }: Props) {
  const [
    {
      srcLang,
      targetLang,
      isLoading,
      error,
      text,
      translation,
      autoTranslation,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!autoTranslation) return;
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

  useEffect(() => {
    if (!autoTranslation) {
      setTimeout(() => {
        dispatch({ type: "ENABLE_AUTO_TRANSLATION" });
      }, 200);
    }
  }, [autoTranslation]);

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
  function setOptionsTranslationResult(
    originalText: string,
    translatedText: string
  ) {
    dispatch({
      type: "SET_OPTIONS_TRANSLATION_RESULT",
      payload: { originalText, translatedText },
    });
  }
  async function optionTranslate(file: File, isAudio: boolean) {
    const transOption = getTranslationOption(file.name, isAudio);
    try {
      dispatch({ type: "LOADING", payload: true });
      const { original_text, translated_text } = await transOption(
        file,
        srcLang,
        targetLang
      );
      if (original_text && translated_text) {
        setOptionsTranslationResult?.(original_text, translated_text);
      } else {
        console.log("else block");
        toast({
          title: "an error occurred while translating your file",
          variant: "destructive",
        });
      }
    } catch (err) {
      if (err instanceof AxiosError || err instanceof Error) {
        toast({ title: err.message, variant: "destructive" });
        console.log("err.message=> ", err.message);
        console.log("err=> ", err);
      }
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
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
        autoTranslation,
        setText,
        swapLangs,
        setTargetLang,
        setSrcLang,
        setOptionsTranslationResult,
        optionTranslate,
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
