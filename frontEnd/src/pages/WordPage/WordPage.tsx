import WordCard from "./WordCard";
import TranslationCard from "./TranslationCard";
import DifinitionCard from "./DifinitionCard";
import ExamplesCard from "./ExamplesCard";

function WordPage() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 border-t-[var(--box-border)] border-t py-8 px-1">
      {/* left */}
      <div className="flex flex-col gap-4 flex-1">
        <WordCard />
        <TranslationCard />
      </div>
      {/* right boxes */}
      <div className="flex flex-col gap-4 flex-1">
        <DifinitionCard />
        <ExamplesCard />
      </div>
    </div>
  );
}

export default WordPage;
