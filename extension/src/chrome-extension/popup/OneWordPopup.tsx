import { useEffect, useState } from "react";
import DefinitionTab from "../extension/WordPage/DefinitionTab";
import ExamplesTab from "../extension/WordPage/ExamplesTab";
import TranslationTab from "../extension/WordPage/TranslationTab";
import WordBar from "../extension/WordPage/WordBar";
import { TranslationResponse } from "../types/TranslationResponse";
import ErrorComponent from "./Error";
import { SupportedLanguageEnum } from "../types/SupportedLanguages";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  word: string;
  activeTab: string;
  srcLang: SupportedLanguageEnum;
  targetLang: string;
  langsFetched: boolean;
  paragraph: string;
}

function OneWordPopup({
  activeTab,
  word,
  srcLang,
  targetLang,
  isLoading,
  setIsLoading,
  langsFetched,
  paragraph,
}: Props) {
  const [translation, setTranslation] = useState<TranslationResponse | null>(
    null
  );

  const [error, setError] = useState("");

  async function getTranslation() {
    setIsLoading(true);
    setError("");
    try {
      chrome.runtime.sendMessage(
        {
          type: "TRANSLATE_TEXT",
          payload: {
            text: word,
            paragraph: paragraph,
            srcLang,
            targetLang,
          },
        },
        (response) => {
          setIsLoading(false);
          if (response?.success) {
            setTranslation(response.data);
          } else {
            setError(response.error);
          }
        }
      );
    } catch (e) {
      setIsLoading(false);
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  useEffect(
    function () {
      if (!langsFetched) return;
      getTranslation();
    },
    [langsFetched, word]
  );

  function changeTransFavorite(isFavorite: boolean) {
    // changes the current translation object 'isFavorite' property accordingly
    // without refetching the trans
    if (translation) setTranslation({ ...translation, isFavorite: isFavorite });
  }

  return (
    <div className="px-3 pt-1 pb-3 flex flex-col gap-2">
      <WordBar
        word={word}
        aiTranslation={translation?.translation || ""}
        isLoading={isLoading}
        id={translation?.id}
        isFavorite={translation?.isFavorite}
        changeTransFavorite={changeTransFavorite}
        srcLang={srcLang}
        error={error}
      />
      {error && (
        <ErrorComponent error={error} getTranslation={getTranslation} />
      )}

      {!error && activeTab === "translate" && (
        <TranslationTab
          isLoading={isLoading}
          synonymsTarget={translation?.synonymsTarget}
          synonymsSource={translation?.synonymsSource}
        />
      )}
      {!error && activeTab === "definition" && (
        <DefinitionTab
          definition={translation?.definition}
          isLoading={isLoading}
        />
      )}
      {!error && activeTab === "examples" && (
        <ExamplesTab
          lang={
            Object.values(SupportedLanguageEnum).includes(
              capitalizeFirstLetter(
                translation?.srcLang
              ) as SupportedLanguageEnum
            )
              ? (capitalizeFirstLetter(
                  translation?.srcLang
                ) as SupportedLanguageEnum)
              : SupportedLanguageEnum.English
          }
          isLoading={isLoading}
          examples={translation?.examples}
        />
      )}
    </div>
  );
}

export default OneWordPopup;
