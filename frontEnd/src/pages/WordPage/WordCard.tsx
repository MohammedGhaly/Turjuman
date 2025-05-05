// import { useTranslationPage } from "@/contexts/TranslationProvider";
import { Volume1, Youtube } from "lucide-react";
import capitalize from "../../utils/capitalize";
import GradientBookmark from "@/components/GradientBookmark";

interface Props {
  original: string;
  id: string;
  isFavorite: boolean;
}

function WordCard({ original, id, isFavorite }: Props) {
  return (
    <div className="rounded-xl px-6 py-5 font-bold text-3xl flex justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <div>{original ? capitalize(original) : ""}</div>
      <div className="flex justify-between gap-3 w-fit ">
        <button>
          <Volume1 strokeWidth="1.5px" />
        </button>
        <button>
          <Youtube strokeWidth="1.5px" />
        </button>
        <button>
          <GradientBookmark id={id} isFavorite={isFavorite} />
        </button>
      </div>
    </div>
  );
}

export default WordCard;
