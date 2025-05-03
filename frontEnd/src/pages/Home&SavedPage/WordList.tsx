interface Props {
  words: Array<string> | undefined;
}

function WordList({ words }: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {words?.map((w) => (
        <span
          key={w + `${Math.random()}`}
          className="border-[var(--word-tile-border)] border px-3 py-1 bg-[var(--word-tile)] text-[var(--foreground)] rounded-lg font-semibold font-base min-w-10 text-center"
        >
          {w}
        </span>
      ))}
    </div>
  );
}

export default WordList;
