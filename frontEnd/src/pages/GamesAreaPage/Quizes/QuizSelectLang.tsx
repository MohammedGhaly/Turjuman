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

// function QuizSelectLang({ dispatch, srcLang }: Props) {
//   return (
// <div className="flex flex-col justify-center items-center gap-4 h-full">
//   <select
//     name="srcLang"
//     id="srcLang"
//     value={srcLang}
//     onChange={(e) => {
//       dispatch({
//         type: "setTargetLang",
//         payload: e.target.value as SupportedLanguageEnum,
//       });
//     }}
//     className="appearance-none w-fit font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl flex-1 flex items-center text-center gap-2 md:flex-grow-0 md:px-4 cursor-pointer hover:shadow-md transition-all duration-200"
//   >
//     {supportedLanguages.map((l) => (
//       <option key={l + " to"} value={l}>
//         {getLangEmoji(l)} {l}
//       </option>
//     ))}
//   </select>
//   <button className="appearance-none w-fit font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl flex-1 flex items-center text-center gap-2 md:flex-grow-0 md:px-4 cursor-pointer hover:shadow-md transition-all duration-200">
//     Next
//   </button>
// </div>
//   );
// }

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
      <div className="flex gap-4">
        <button className="">
          <ChevronLeft onClick={() => handleLangChange("left")} />
        </button>
        <img
          className="w-40 md:w-52"
          src={getLangFlag(srcLang)}
          alt="flag-img"
        />
        <button className="">
          <ChevronRight onClick={() => handleLangChange("right")} />
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
