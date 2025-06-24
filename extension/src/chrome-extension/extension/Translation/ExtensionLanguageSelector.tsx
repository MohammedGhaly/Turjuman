import { ArrowRightLeft } from "lucide-react";
import {
  SupportedLanguageEnum,
  supportedLanguages,
} from "../../types/SupportedLanguages";
import "flag-icons/css/flag-icons.min.css";
import { useState } from "react";
import getLangCode from "../../utils/getLangCode";

interface Props {
  srcLang: SupportedLanguageEnum;
  targetLang: SupportedLanguageEnum;
  handleSetSrcLang: (lang: SupportedLanguageEnum) => void;
  handleSetTargetLang: (lang: SupportedLanguageEnum) => void;
  handleSwapLangs: () => void;
}

function ExtensionLanguageSelectors({
  srcLang,
  handleSetSrcLang,
  targetLang,
  handleSetTargetLang,
  handleSwapLangs,
}: Props) {
  return (
    <div className="flex gap-6 mr-1 items-center">
      <LangSelector lang={srcLang} setLang={handleSetSrcLang} />
      <button
        onClick={handleSwapLangs || (() => {})}
        className="border h-12 w-12 border-[var(--border)] p-2 bg-[var(--input-background)] rounded-full hover:shadow-md hover:bg-[var(--input-background-hover)] transition-all duration-300 flex justify-center items-center"
      >
        <ArrowRightLeft size={17} color="var(--foreground)" />
      </button>
      <LangSelector lang={targetLang} setLang={handleSetTargetLang} />
    </div>
  );
}

interface LangSelectorProps {
  lang: SupportedLanguageEnum;
  setLang: (lang: SupportedLanguageEnum) => void;
}

function LangSelector({ lang, setLang }: LangSelectorProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex-1 flex justify-center font-inter font-semibold">
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-inter text-base appearance-none font-semibold border border-[var(--border)] bg-[var(--input-background)] w-full p-2 rounded-md flex justify-center items-center gap-2 cursor-pointer hover:bg-[var(--input-background-hover)] hover:shadow-md transition-all duration-200"
      >
        <span className={`fi fi-${getLangCode(lang)} w-6 h-4`}></span>
        <span className="text-[var(--foreground)]">{lang}</span>
      </button>
      {open && (
        <ul className="absolute z-10 w-full border border-[var(--border)] rounded mt-11 bg-[var(--primary)]">
          {supportedLanguages.map((l) => (
            <li
              key={l + " from"}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              className="list-none"
            >
              <button className="w-full text-base font-semibold text-[var(--foreground)] bg-[var(--background)] flex items-center justify-center p-[2px] hover:bg-[var(--secondary)] transition-colors duration-200 gap-1">
                <span
                  className={`fi fi-${getLangCode(l)} w-6 h-4 inline-block`}
                ></span>
                <span>{l.slice(0, 2)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExtensionLanguageSelectors;
