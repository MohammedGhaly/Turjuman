import { useTranslationPage } from "@/contexts/TranslationProvider";
import {
  SupportedLanguageEnum,
  supportedLanguages,
} from "../../types/SupportedLanguages";
import getLangEmoji from "../../utils/getLangEmoji";
import { ArrowRightLeft } from "lucide-react";

function LanguageSelectors() {
  const { targetLang, srcLang, setSrcLang, setTargetLang, swapLangs } =
    useTranslationPage();

  return (
    <div className="flex flex-row justify-between items-center gap-4">
      <select
        name="fromLang"
        id="fromLang"
        value={srcLang}
        onChange={(e) => {
          setSrcLang?.(e.target.value as SupportedLanguageEnum);
        }}
        className="appearance-none font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl flex-1 flex  text-center gap-2 md:flex-grow-0 md:px-4 cursor-pointer hover:shadow-md transition-all duration-200"
      >
        {supportedLanguages.map((l) => (
          <option key={l + " from"} value={l}>
            {getLangEmoji(l)} {l}
          </option>
        ))}
      </select>
      <button
        onClick={swapLangs || (() => {})}
        className="border border-[var(--box-border)] bg-[var(--input-background)] py-3 px-4 rounded-xl hover:shadow-md transition-all duration-300"
      >
        <ArrowRightLeft size={18} />
      </button>
      <select
        name="toLang"
        id="toLang"
        value={targetLang}
        onChange={(e) => {
          setTargetLang?.(e.target.value as SupportedLanguageEnum);
        }}
        className="appearance-none font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl flex-1 flex items-center text-center gap-2 md:flex-grow-0 md:px-4 cursor-pointer hover:shadow-md transition-all duration-200"
      >
        {supportedLanguages.map((l) => (
          <option key={l + " to"} value={l}>
            {getLangEmoji(l)} {l}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelectors;
