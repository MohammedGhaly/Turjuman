import { Volume1, Youtube } from "lucide-react";
import capitalize from "../../../utils/capitalize";
import GradientBookmark from "@/components/GradientBookmark";
import openYouglish from "@/utils/youglish";
import AiTranslation from "./AiTranslation";
import { pronounce } from "@/utils/pronounce";

interface Props {
  original: string;
  id: string;
  isFavorite: boolean;
  srcLang: string;
  translation: string;
}

function WordBar({ id, isFavorite, original, srcLang, translation }: Props) {
  return (
    <div className="font-bold flex justify-between items-center">
      <h1 className="md:text-5xl text-3xl">
        {original ? capitalize(original) : ""}
      </h1>
      <div className="flex flex-col gap-2 items-end md:pr-1">
        <div className="flex justify-between gap-3 w-fit ">
          <button>
            <Volume1
              strokeWidth="1.5px"
              onClick={() => pronounce(original, srcLang)}
            />
          </button>
          <button>
            <Youtube
              strokeWidth="1.5px"
              onClick={(e) => {
                e.stopPropagation();
                openYouglish(original, srcLang);
              }}
            />
          </button>
          <button>
            <GradientBookmark id={id} isFavorite={isFavorite} />
          </button>
        </div>
        {translation && <AiTranslation translation={translation} />}
      </div>
    </div>
  );
}

export default WordBar;
