interface Props {
  words: Array<string>;
}

function WordList({ words }: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {words.map((w) => (
        <span
          key={w}
          className="border-[var(--border)] border px-2 py-1 bg-[var(--secondary)] text-[var(--foreground)] rounded-sm font-semibold font-base min-w-10 text-center"
        >
          {w}
        </span>
      ))}
    </div>
  );
}

export default WordList;
