import { ArrowRightLeft } from "lucide-react";
import {
  SupportedLanguageEnum,
  supportedLanguages,
} from "../types/SupportedLanguages";
import getLangEmoji from "../utils/getLangEmoji";

interface Props {
  srcLang: string;
  targetLang: string;
  handleSetSrcLang: (lang: SupportedLanguageEnum) => void;
  handleSetTargetLang: (lang: SupportedLanguageEnum) => void;
  swapLangs: () => void;
}

function PopupLanguageSelector({
  srcLang,
  handleSetSrcLang,
  targetLang,
  handleSetTargetLang,
  swapLangs,
}: Props) {
  return (
    <div className="flex gap-2 mr-1">
      <select
        name="fromLang"
        id="fromLang"
        value={srcLang}
        onChange={(e) => {
          handleSetSrcLang?.(e.target.value as SupportedLanguageEnum);
        }}
        className="font-inter text-[var(--foreground)] text-xs appearance-none font-semibold border border-[var(--border)] bg-[var(--input-background)] p-1 rounded-xl flex-1 flex  text-center gap-2 cursor-pointer hover:shadow-md transition-all duration-200"
      >
        {supportedLanguages.map((l) => (
          <option key={l + " from"} value={l}>
            {getLangEmoji(l)} {l.slice(0, 2)}
          </option>
        ))}
      </select>
      <button
        onClick={swapLangs || (() => {})}
        className="text-xs border border-solid border-[var(--border)] p-1 bg-[var(--input-background)] rounded-xl hover:shadow-md transition-all duration-300"
      >
        <ArrowRightLeft size={12} color="var(--foreground)" />
      </button>
      <select
        name="toLang"
        id="toLang"
        value={targetLang}
        onChange={(e) => {
          handleSetTargetLang?.(e.target.value as SupportedLanguageEnum);
        }}
        className="text-[var(--foreground)] font-inter text-xs appearance-none font-semibold border border-[var(--border)] bg-[var(--input-background)] p-1 rounded-xl flex-1 flex items-center text-center gap-2 cursor-pointer hover:shadow-md transition-all duration-200"
      >
        {supportedLanguages.map((l) => (
          <option key={l + " to"} value={l}>
            {getLangEmoji(l)} {l.slice(0, 2)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PopupLanguageSelector;
