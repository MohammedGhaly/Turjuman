interface Props {
  error: string;
  getTranslation: () => void;
}

function Error({ error, getTranslation }: Props) {
  return (
    <div className="flex flex-col w-full items-center pb-2">
      <h2 className="w-full font-semibold text-base text-center pt-4 pb-3">
        {"🚫 "}
        {error}
      </h2>
      <button
        onClick={getTranslation}
        className="text-base border-solid bg-[var(--input-background)] w-fit p-2 font-semibold text-[var(--foreground)] border border-[var(--border)] rounded-lg hover:brightness-[0.93] hover:shadow-sm transition-all duration-300"
      >
        try again
      </button>
    </div>
  );
}

export default Error;
