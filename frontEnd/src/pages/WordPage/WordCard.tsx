import WordPageGradientBookmark from "./WordPageGradientBookmark";
import { Volume1, Youtube } from "lucide-react";
import capitalize from "../../utils/capitalize";
import openYouglish from "@/utils/youglish";
import { pronounce } from "@/utils/pronounce";

interface Props {
  original: string;
  id: string;
  isFavorite: boolean;
  srcLang: string;
}

function WordCard({ original, id, isFavorite, srcLang }: Props) {
  return (
    <div className="rounded-xl px-6 py-5 font-bold text-3xl flex justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <div>{original ? capitalize(original) : ""}</div>
      <div className="flex justify-between gap-1 w-fit ">
        <button
          onClick={() => pronounce(original, srcLang)}
          className="hover:bg-[var(--icon-btn-hover)] p-2 rounded-full duration-200 transition-all"
        >
          <Volume1 strokeWidth="1.5px" />
        </button>
        <button className="hover:bg-[var(--icon-btn-hover)] p-2 rounded-full duration-200 transition-all">
          <Youtube
            strokeWidth="1.5px"
            onClick={(e) => {
              e.stopPropagation();
              openYouglish(original, srcLang);
            }}
          />
        </button>
        <button className="hover:bg-[var(--icon-btn-hover)] p-2 rounded-full duration-200 transition-all">
          <WordPageGradientBookmark id={id} isFavorite={isFavorite} />
        </button>
      </div>
    </div>
  );
}

export default WordCard;
