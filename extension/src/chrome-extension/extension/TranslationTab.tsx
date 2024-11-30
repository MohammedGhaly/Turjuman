import WordList from "./WordList";

function TranslationTab() {
  return (
    <div className="flex flex-col justify-between h-full text-[var(--foreground)]">
      <div className="flex flex-col gap-3">
        <WordList words={["يتناول", "يمضغ", "يلتهم", "أكل", "يأكل"]} />
        <div>
          <h4 className="mb-2">synonyms</h4>
          <WordList words={["feed", "chew", "dine", "inhale", "bite"]} />
        </div>
      </div>
    </div>
  );
}

export default TranslationTab;
