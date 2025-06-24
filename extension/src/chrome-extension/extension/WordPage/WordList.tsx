interface Props {
  words: Array<string>;
}

function WordList({ words }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {words.map((w) => (
        <span
          key={w}
          className="border-[var(--border)] border px-[6px] py-1 bg-[var(--secondary)] text-[var(--foreground)] rounded-md font-semibold font-base min-w-10 text-center"
        >
          {w}
        </span>
      ))}
    </div>
  );
}

export default WordList;
