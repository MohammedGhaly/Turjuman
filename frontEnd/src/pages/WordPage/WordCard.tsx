import { useTranslationPage } from "@/contexts/TranslationProvider";
import { Bookmark, Volume1, Youtube } from "lucide-react";
import capitalize from "../../utils/capitalize";

function WordCard() {
  const {
    translation: { original },
  } = useTranslationPage();
  return (
    <div className="rounded-xl px-6 py-5 font-bold text-3xl flex justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <div>{capitalize(original)}</div>
      <div className="flex justify-between gap-3 w-fit ">
        <button>
          <Volume1 strokeWidth="1.5px" />
        </button>
        <button>
          <Youtube strokeWidth="1.5px" />
        </button>
        <button>
          <Bookmark strokeWidth="1.5px" />
        </button>
      </div>
    </div>
  );
}

export default WordCard;
