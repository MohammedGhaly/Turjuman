interface Props {
  definition: string;
}

function Definition({ definition }: Props) {
  return (
    <div className="flex flex-col h-fit w-full">
      <h2 className="mb-1 md:mb-2 text-base md:text-lg font-bold">
        Definition
      </h2>
      <p className="bg-[var(--inner-boxes-bg)] text-[0.8rem] md:text-base font-semibold px-4 py-2 rounded-lg">
        {definition || ""}
      </p>
    </div>
  );
}

export default Definition;
