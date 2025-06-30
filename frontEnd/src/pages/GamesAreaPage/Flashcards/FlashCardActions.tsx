export type Level = "very hard" | "hard" | "medium" | "easy";

interface Props {
  onAction: (level: Level) => void;
}

function FlashCardActions({ onAction }: Props) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="h-full lg:w-3/5 flex justify-center  items-stretch  bg-[var(--inner-boxes-bg)] gap-[0.4rem] md:gap-2 p-2 rounded-xl">
        <button
          className="text-sm md:text-base p-3 md:px-4 md:py-5 bg-red-200 text-red-900 dark:bg-opacity-50 dark:bg-red-700 dark:text-red-200 rounded-lg font-semibold flex-1 transition-all duration-200 dark:hover:bg-opacity-40 hover:bg-opacity-80"
          key={"actionBtn1"}
          onClick={() => onAction("very hard")}
        >
          very hard
        </button>
        <button
          className="text-sm md:text-base p-3 md:px-4 md:py-5 bg-orange-200 text-orange-900 dark:bg-opacity-40 dark:bg-orange-500 dark:text-orange-200  rounded-lg font-semibold flex-1  transition-all duration-200 dark:hover:bg-opacity-30 hover:bg-opacity-80"
          key={"actionBtn2"}
          onClick={() => onAction("hard")}
        >
          hard
        </button>
        <button
          className="text-sm md:text-base p-3 md:px-4 md:py-5 bg-green-200 text-green-900 dark:bg-opacity-40 dark:bg-green-700 dark:text-green-200 rounded-lg font-semibold flex-1  transition-all duration-200 dark:hover:bg-opacity-30 hover:bg-opacity-80"
          key={"actionBtn3"}
          onClick={() => onAction("medium")}
        >
          medium
        </button>
        <button
          className="text-sm md:text-base p-3 md:px-4 md:py-5 bg-blue-200 text-blue-900 dark:bg-opacity-40 dark:bg-blue-700 dark:text-blue-200  rounded-lg font-semibold flex-1  transition-all duration-200 dark:hover:bg-opacity-30 hover:bg-opacity-80"
          key={"actionBtn4"}
          onClick={() => onAction("easy")}
        >
          easy
        </button>
      </div>
      {/* <div className="h-full flex justify-center  items-stretch  bg-[var(--inner-boxes-bg)] gap-[0.4rem] md:gap-2 p-2 rounded-xl">
        <button
          className="text-sm md:text-base p-3 md:p-4 bg-red-500 text-red-900 bg-opacity-25 rounded-lg font-semibold flex-1 transition-all duration-200 hover:bg-opacity-30"
          key={"actionBtn1"}
        >
          very hard
        </button>
        <button
          className="text-sm md:text-base p-3 md:p-4 bg-orange-500 text-orange-900 bg-opacity-25 rounded-lg font-semibold flex-1  transition-all duration-200 hover:bg-opacity-30"
          key={"actionBtn2"}
        >
          hard
        </button>
        <button
          className="text-sm md:text-base p-3 md:p-4 bg-green-500 text-green-900 bg-opacity-25 rounded-lg font-semibold flex-1  transition-all duration-200 hover:bg-opacity-30"
          key={"actionBtn3"}
        >
          medium
        </button>
        <button
          className="text-sm md:text-base p-3 md:p-4 bg-blue-500 text-blue-900 bg-opacity-25  rounded-lg font-semibold flex-1  transition-all duration-200 hover:bg-opacity-30"
          key={"actionBtn4"}
        >
          easy
        </button>
      </div> */}
    </div>
  );
}

export default FlashCardActions;
