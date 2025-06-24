import { useEffect, useState } from "react";
// import "../../global.css";
import TopBar from "./Components/TopBar";
import { ChevronLeft } from "lucide-react";
import { TranslationResponse } from "../types/TranslationResponse";
import LogoSvg from "../popup/LogoSvg";
import TranslationPage from "./Translation/TranslationPage";
import WordPage from "./WordPage/WordPage";
import { SupportedLanguageEnum } from "../types/SupportedLanguages";
import ExtensionLanguageSelector from "./Translation/ExtensionLanguageSelector";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Pages from "../types/Pages";
import SettingsPage from "./Settings/SettingsPage";

export type Themes = "theme-dark" | "theme-light";

// const fakeTrans: TranslationResponse = {
//   id: "vsdvd",
//   definition: "this is a fake definition",
//   original: "professional",
//   srcLang: "English",
//   targetLang: "Arabic",
//   translation: "جهاز",
//   examples: [
//     "this is the first example",
//     "this is the second example",
//     "this is the third example",
//   ],
//   isFavorite: false,
//   synonymsSource: ["device1", "dev", "phone", "computer", "device"],
//   synonymsTarget: ["pgwca", "vspsa", "vds", "bsduibva", "pbsvsd"],
// };

function ExtensionView() {
  const [page, setPage] = useState<Pages>("translationPage");
  const [theme, setTheme] = useState<Themes>("theme-light");
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState<string>("");
  const [translation, setTranslation] = useState<TranslationResponse | null>(
    null
  );
  const [srcLang, setSrcLang] = useState(SupportedLanguageEnum.English);
  const [targetLang, setTargetLang] = useState(SupportedLanguageEnum.Arabic);
  const [autoTranslation, setAutoTranslation] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!autoTranslation) return;
    if (!text.trim()) {
      setTranslation(null);
      return;
    }

    const getTranslation = async (word: string) => {
      setIsLoading(true);
      chrome.runtime.sendMessage(
        {
          type: "TRANSLATE_TEXT",
          payload: {
            text: word,
            paragraph: word,
            srcLang,
            targetLang,
          },
        },
        (response) => {
          setIsLoading(false);
          if (response?.success) {
            setAutoTranslation(false);
            setTranslation(response.data);
          } else {
            toast({ title: response.error, variant: "destructive" });
          }
        }
      );
    };

    const delayDebounce = setTimeout(() => getTranslation(text), 1000);

    return () => {
      clearTimeout(delayDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, srcLang, targetLang, toast]);

  useEffect(() => {
    if (!autoTranslation) {
      setTimeout(() => {
        setAutoTranslation(true);
      }, 200);
    }
  }, [autoTranslation]);

  useEffect(function () {
    async function getLangs() {
      const result = await chrome.storage.sync.get(["srcLang", "targetLang"]);
      if (result.srcLang) setSrcLang(result.srcLang);
      if (result.targetLang) setTargetLang(result.targetLang);
    }
    getLangs();
  }, []);

  useEffect(function () {
    // gets the stored theme in sync storage
    const getTheme = () => {
      try {
        chrome.storage.sync.get(["theme"], (data) => {
          const { theme: storedTheme } = data;
          if (!storedTheme) {
            chrome.storage.sync.set({ theme: "theme-light" });
          } else if (storedTheme !== theme) setTheme(storedTheme);
        });
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      }
    };
    getTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeTransFavorite(isFavorite: boolean) {
    // changes the current translation object 'isFavorite' property accordingly
    // without refetching the trans
    if (translation) setTranslation({ ...translation, isFavorite: isFavorite });
  }

  function swapLangs() {
    setSrcLang(targetLang);
    setTargetLang(srcLang);
    chrome.storage.sync.set({ srcLang: targetLang, targetLang: srcLang });
  }
  function handleSetSrcLang(lang: SupportedLanguageEnum) {
    if (lang === targetLang) swapLangs();
    else {
      setSrcLang(lang);
      chrome.storage.sync.set({ srcLang: lang });
    }
  }
  function handleSetTargetLang(lang: SupportedLanguageEnum) {
    if (lang === srcLang) swapLangs();
    else {
      setTargetLang(lang);
      chrome.storage.sync.set({ targetLang: lang });
    }
  }

  return (
    <div
      className={`bg-[var(--primary)] h-[420px] w-[360px] text-[16px] flex flex-col ${theme}`}
    >
      <TopBar theme={theme} setTheme={setTheme} setPage={setPage}>
        {page !== "translationPage" && (
          <ChevronLeft
            className="mr-1 cursor-pointer hover:bg-[var(--icon-hover)] rounded-full transition-all duration-300 p-1"
            color="var(--foreground)"
            size={36}
            onClick={(e) => {
              setPage("translationPage");
              e.stopPropagation();
            }}
          />
        )}
        {page === "translationPage" && <LogoSvg theme={theme} size="40" />}
      </TopBar>
      <Toaster />
      {page !== "settingsPage" && (
        <div className="w-full px-4 mt-3 mb-1 text-[var(--foreground)]">
          <ExtensionLanguageSelector
            handleSetSrcLang={handleSetSrcLang}
            handleSetTargetLang={handleSetTargetLang}
            srcLang={srcLang}
            targetLang={targetLang}
            handleSwapLangs={swapLangs}
          />
        </div>
      )}
      {page === "translationPage" && (
        <TranslationPage
          isLoading={isLoading}
          text={text}
          setText={setText}
          setPage={setPage}
          translation={translation}
        />
      )}
      {page === "wordPage" && (
        <WordPage
          isLoading={isLoading}
          translation={translation}
          changeTransFavorite={changeTransFavorite}
        />
      )}
      {page === "settingsPage" && <SettingsPage />}
    </div>
  );
}

export default ExtensionView;
