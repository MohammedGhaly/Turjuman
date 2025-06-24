import Tabs from "../Translation/Tabs";
import TranslationTab from "../WordPage/TranslationTab";
import DefinitionTab from "../WordPage/DefinitionTab";
import ExamplesTab from "../WordPage/ExamplesTab";
import WordBar from "../WordPage/WordBar";
import { Youtube } from "lucide-react";
import { Switch } from "../Components/Switch";
import { useEffect, useState } from "react";
import { TranslationResponse } from "../../types/TranslationResponse";
import openYouglish from "../../utils/youglish";
import { SupportedLanguageEnum } from "@/chrome-extension/types/SupportedLanguages";
import { capitalizeFirstLetter } from "@/chrome-extension/utils/capitalizeFirstLetter";

interface Props {
  isLoading: boolean;
  translation: TranslationResponse | null;
  changeTransFavorite: (isFavorite: boolean) => void;
}

function WordPage({ isLoading, translation, changeTransFavorite }: Props) {
  const [activeTab, setActiveTab] = useState<
    "translation" | "definition" | "examples"
  >("translation");

  const [popupEnabled, setPopupEnabled] = useState<boolean>(true);

  useEffect(function () {
    async function checkPopupEnabled() {
      const result = await chrome.storage.sync.get("popupEnabled");
      setPopupEnabled(result.popupEnabled ?? true);
    }
    checkPopupEnabled();
  }, []);

  function handlePopupSwitchChange() {
    setPopupEnabled((prev) => !prev);
    chrome.storage.sync.set({ popupEnabled: !popupEnabled });
  }

  return (
    <div className="flex-grow p-4 pt-2">
      <div className="flex flex-col justify-between h-full gap-3">
        <div className="flex flex-col gap-3 h-fit">
          {/* <InputBar /> */}
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <WordBar
            word={translation?.original || ""}
            aiTranslation={translation?.translation || ""}
            isLoading={isLoading}
            id={translation?.id}
            isFavorite={translation?.isFavorite}
            srcLang={
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
            changeTransFavorite={changeTransFavorite}
          />
        </div>

        <div className="flex-1 basis-1 text-[var(--foreground)] mt-1 overflow-y-auto turjuman-scrollable pr-2">
          {activeTab === "translation" && (
            <TranslationTab
              isLoading={isLoading}
              synonymsTarget={translation?.synonymsTarget}
              synonymsSource={translation?.synonymsSource}
            />
          )}
          {activeTab === "definition" && (
            <DefinitionTab
              definition={translation?.definition}
              isLoading={isLoading}
            />
          )}
          {activeTab === "examples" && (
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

        <div className="flex justify-between items-center h-6">
          <button className="text-white bg-[var(--secondary)] h-8 w-12 rounded-full border border-[var(--border)] flex justify-center">
            <Youtube
              className="mx-auto"
              color="var(--foreground)"
              size={22}
              onClick={(e) => {
                e.stopPropagation();
                if (translation)
                  openYouglish(translation?.original, translation.srcLang);
              }}
            />
          </button>
          <span className="text-white">
            <Switch
              checked={popupEnabled}
              onCheckedChange={handlePopupSwitchChange}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default WordPage;
