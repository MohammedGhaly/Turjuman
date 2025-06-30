import {
  SupportedLanguageEnum,
  supportedLanguages,
} from "@/types/SupportedLanguages";
// import getLangEmoji from "@/utils/getLangEmoji";
import { QuizReducerAction } from "./QuizesGame";
import getLangFlag from "@/utils/getLangFlag";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  srcLang: SupportedLanguageEnum;
  dispatch: React.Dispatch<QuizReducerAction>;
}

function QuizSelectLang({ dispatch, srcLang }: Props) {
  const [langIndex, setLangIndex] = useState(0);

  function handleLangChange(direction: "left" | "right") {
    if (direction === "left") {
      setLangIndex(
        (prev) =>
          (prev - 1 + supportedLanguages.length) % supportedLanguages.length
      );
      dispatch({
        type: "setTargetLang",
        payload:
          supportedLanguages[
            (langIndex - 1 + supportedLanguages.length) %
              supportedLanguages.length
          ],
      });
    } else {
      setLangIndex((prev) => (prev + 1) % supportedLanguages.length);
      dispatch({
        type: "setTargetLang",
        payload:
          supportedLanguages[
            (langIndex + 1 + supportedLanguages.length) %
              supportedLanguages.length
          ],
      });
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="flex gap-4 items-center">
        <button className="w-12 h-12 hover:bg-[var(--icon-btn-hover)] rounded-full">
          <ChevronLeft size={40} onClick={() => handleLangChange("left")} />
        </button>
        <img
          className="w-40 md:w-52"
          src={getLangFlag(srcLang)}
          alt="flag-img"
        />
        <button className="w-12 h-12 hover:bg-[var(--icon-btn-hover)] rounded-full">
          <ChevronRight size={40} onClick={() => handleLangChange("right")} />
        </button>
      </div>
      <h2 className="text-xl font-semibold">{srcLang}</h2>
      <button
        onClick={() => dispatch({ type: "load" })}
        className="px-4 py-3 w-fit border border-[var(--box-border)] rounded-lg bg-[var(--quiz-option-bg)] font-semibold text-lg transition-all duration-300 cursor-pointer hover:brightness-90 active:bg-[var(--quiz-option-active-bg)]"
      >
        Next
      </button>
    </div>
  );
}

export default QuizSelectLang;
