import capitalize from "../../utils/capitalize";
import WordList from "../../components/Wordlist";
import AiTranslationIcon from "@/components/AiTranslationIcon";

interface Props {
  original: string;
  synonymsTarget: string[];
  synonymsSource: string[];
}

function TranslationCard({ original, synonymsSource, synonymsTarget }: Props) {
  return (
    <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <div className="flex justify-between w-full mb-1 md:mb-4">
        <div>Translation</div>
        <div className=" flex gap-2 items-center justify-between">
          <span>{original ? capitalize(original) : ""}</span>
          <span>
            <AiTranslationIcon />
          </span>
        </div>
      </div>

      <WordList words={synonymsTarget || []} />
      <span className="text-sm text-[var(--shaded-text)] md:text-base">
        synonyms
      </span>
      <WordList words={synonymsSource || []} />
    </div>
  );
}

export default TranslationCard;
