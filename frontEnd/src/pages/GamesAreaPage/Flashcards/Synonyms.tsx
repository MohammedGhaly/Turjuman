interface Props {
  synonymsTarget: string[];
  synonymsSource: string[];
}

function Synonyms({ synonymsSource, synonymsTarget }: Props) {
  return (
    <div className="rounded-xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)]">
      <div className="flex flex-col gap-4">
        <WordList words={synonymsTarget || []} key={"wordlist1"} />
        <WordList words={synonymsSource || []} key={"wordlist2"} />
      </div>
    </div>
  );
}

interface WordlistProps {
  words: Array<string> | undefined;
}

function WordList({ words }: WordlistProps) {
  return (
    <div className="flex gap-1 flex-wrap font-bold text-sm md:text-lg">
      {words?.map((w) => (
        <span
          key={w + `${Math.random()}`}
          className="border-[var(--word-tile-border)] border px-2 py-1 bg-[var(--word-tile)] text-[var(--foreground)] rounded-lg font-semibold font-base min-w-10 text-center"
        >
          {w}
        </span>
      ))}
    </div>
  );
}

export default Synonyms;
