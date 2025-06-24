import { ArrowRight } from "lucide-react";

interface Props {
  isHidden: boolean;
  handleClick: () => void;
}

function WordPageButton({ isHidden, handleClick }: Props) {
  // const hidden =
  // definition === undefined || definition === null || definition === "";

  return (
    <div className={`w-full flex justify-center ${isHidden && "invisible"} `}>
      <button
        onClick={handleClick}
        className="text-base w-fit flex text-[var(--foreground)] gap-1 font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-[10px] rounded-xl text-center px-4 hover:shadow-md transition-all duration-300 hover:opacity-90"
      >
        word page <ArrowRight />
      </button>
    </div>
  );
}

export default WordPageButton;
