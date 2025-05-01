import { ArrowRight, ArrowRightLeft, File, Image, Mic } from "lucide-react";

import {
  SupportedLanguageEnum,
  supportedLanguages,
} from "../types/SupportedLanguages";
import getLangEmoji from "../utils/getLangEmoji";
import { useTranslationPage } from "../contexts/TranslationProvider";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function TranslationPage() {
  const {
    targetLang,
    srcLang,
    text,
    setText,
    setSrcLang,
    setTargetLang,
    swapLangs,
    translation,
    isLoading,
  } = useTranslationPage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (translation) {
      try {
        await navigator.clipboard.writeText(translation.translation);
        toast({ title: "copied successfully", variant: "success" });
      } catch {
        toast({ title: "Failed to copy", variant: "destructive" });
      }
    }
  };

  return (
    <div className="flex flex-col border-t border-t-[var(--box-border)] px-1 py-8 gap-6 md:gap-10 overflow-y-auto">
      <Toaster />
      {/* language selection div */}
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
      {/* text areas div */}
      <div className="flex flex-col gap-8 md:flex-row ">
        <div className="w-full flex-1 min-h-[20vh] md:min-h-[25vh]">
          <textarea
            name="text"
            id="text"
            className="resize-none w-full h-full bg-[var(--input-background)] font-semibold border border-[var(--box-border)] rounded-lg p-3 min-h-[20vh] md:min-h-[25vh]"
            placeholder="type here..."
            value={text}
            onChange={(e) => setText?.(e.target.value)}
          ></textarea>
        </div>
        <div
          className={`min-h-[20vh] md:min-h-[25vh] w-full flex-1 rounded-lg p-[2px]  ${
            isLoading ? "gradient-border" : ""
          }`}
        >
          <textarea
            name="translation"
            id="translation"
            value={
              isLoading && translation.translation
                ? translation.translation + "..."
                : isLoading && !translation.translation
                ? "..."
                : translation?.translation || ""
            }
            readOnly
            className={`resize-none w-full bg-[var(--input-background)] font-semibold p-3 h-full border border-[var(--box-border)] rounded-lg outline-none cursor-pointer`}
            placeholder="translation goes here..."
            onDoubleClick={copyToClipboard}
          ></textarea>
        </div>
      </div>
      {/* word page button */}
      {text.trim() && text.trim().split(" ").length === 1 && (
        <div className="w-full flex justify-center">
          <button
            onClick={() => navigate("/app/word")}
            className="w-fit flex gap-1 font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl text-center px-4 hover:shadow-md transition-all duration-300"
          >
            word page <ArrowRight />
          </button>
        </div>
      )}
      {/* text input options div */}
      <div className="w-full">
        <div className="flex gap-6 items-center justify-center md:gap-20">
          <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
            <File className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
          </button>
          <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
            <Mic className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
          </button>
          <button className="border border-gray-300 rounded-full p-2 hover:shadow-lg transition-all duration-200">
            <Image className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslationPage;
