import { useEffect, useState } from "react";
import PopupTopBar, { Controls, TabS, Tabs } from "./PopupTopBar";
import { SupportedLanguageEnum } from "../types/SupportedLanguages";
import LogoSvg from "./LogoSvg";
import SentencePopup from "./SentencePopup";
import OneWordPopup from "./OneWordPopup";
import { Toaster } from "@/components/ui/toaster";
import PopupLanguageSelector from "./PopupLanguageSelector";

export type Themes = "theme-dark" | "theme-light";

interface PopupProps {
  text: string;
  paragraph: string;
  onClose: () => void;
}

function Popup({ text, paragraph, onClose }: PopupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabS>("translate");
  const [theme, setTheme] = useState<Themes>("theme-light");
  const [srcLang, setSrcLang] = useState(SupportedLanguageEnum.English);
  const [targetLang, setTargetLang] = useState(SupportedLanguageEnum.Arabic);
  const [langsFetched, setLangsFetched] = useState(false);

  const oneWord = text.split(" ").length === 1;

  // gets the stored langs in sync storage
  useEffect(function () {
    const getLangs = () => {
      try {
        chrome.storage.sync.get(["srcLang", "targetLang"], (data) => {
          const { srcLang: storedSrcLang, targetLang: storedTargetLang } = data;
          if (storedSrcLang && srcLang !== storedSrcLang)
            setSrcLang(storedSrcLang);
          if (storedTargetLang && targetLang !== storedTargetLang)
            setTargetLang(storedTargetLang);
        });
      } catch (e) {
        if (e instanceof Error) console.log(e.message);
      } finally {
        setLangsFetched(true);
      }
    };

    getLangs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // gets the stored theme in sync storage
  useEffect(function () {
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
      style={{ fontSize: "16px" }}
      className={`${isLoading ? "gradient-border p-[2px]" : ""} rounded-xl`}
    >
      <div
        className={`w-[440px] bg-[var(--primary)] turjuman-popup-div text-[var(--foreground)] rounded-lg overflow-hidden ${theme}`}
        id="turjuman-popup-div"
        onClick={(e) => e.stopPropagation()}
      >
        <PopupTopBar>
          <div
            className="flex items-center gap-3 ml-1"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <LogoSvg theme={theme} size="40" />
            {oneWord ? (
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
                <PopupLanguageSelector
                  handleSetSrcLang={handleSetSrcLang}
                  handleSetTargetLang={handleSetTargetLang}
                  srcLang={srcLang}
                  targetLang={targetLang}
                  swapLangs={swapLangs}
                />
              </Tabs>
            ) : (
              <PopupLanguageSelector
                handleSetSrcLang={handleSetSrcLang}
                handleSetTargetLang={handleSetTargetLang}
                srcLang={srcLang}
                targetLang={targetLang}
                swapLangs={swapLangs}
              />
            )}
          </div>
          <Controls closePopup={onClose} theme={theme} setTheme={setTheme} />
        </PopupTopBar>

        {oneWord ? (
          <OneWordPopup
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            activeTab={activeTab}
            word={text}
            srcLang={srcLang}
            targetLang={targetLang}
            langsFetched={langsFetched}
            paragraph={paragraph}
          />
        ) : (
          <SentencePopup
            text={text}
            srcLang={srcLang}
            targetLang={targetLang}
            langsFetched={langsFetched}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default Popup;
