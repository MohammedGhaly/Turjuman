import { useEffect, useReducer } from "react";
import { SupportedLanguageEnum } from "../types/SupportedLanguages";
import { TranslationResponse } from "../types/TranslationResponse";
import { translateWord } from "@/services/translationClient";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import getTranslationOption from "@/utils/getTranslationOption";
import {
  TranslationPageContext,
  translationPageInitialState,
  translationPageReducer,
} from "./TranslationPageContext";

interface Props {
  children: React.JSX.Element;
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
  ] = useReducer(translationPageReducer, translationPageInitialState);

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
        if (original_text.split(" ").length === 1) {
          if (original_text.endsWith("."))
            setText(original_text.slice(0, original_text.length - 1));
          else setText(original_text);
        } else setOptionsTranslationResult?.(original_text, translated_text);
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

export { TranslationPageProvider };
