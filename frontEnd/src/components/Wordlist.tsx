interface Props {
  words: Array<string>;
}

function WordList({ words }: Props) {
  return (
    <div className="flex gap-2 flex-wrap justify-between">
      {words.map((w) => (
        <span
          key={w}
          className="border-[var(--word-tile-border)] border px-[6px] md:px-4 py-1 bg-[var(--word-tile)] text-[0.9rem] md:text-xl rounded-lg font-semibold font-base min-w-10 text-center"
        >
          {w}
        </span>
      ))}
    </div>
  );
}

export default WordList;
