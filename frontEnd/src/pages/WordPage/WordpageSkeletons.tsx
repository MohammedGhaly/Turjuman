import { Skeleton } from "@/components/ui/skeleton";

function WordpageSkeletons() {
  return (
    <div className="flex flex-col md:flex-row w-full gap-4 py-8 px-4">
      {/* left */}
      <div className="flex flex-col gap-4 flex-1">
        {/* <WordCard /> */}
        <div className="gradient-border rounded-xl p-[1px]">
          <div className="rounded-xl px-6 py-5 font-bold text-3xl flex justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
            <Skeleton className="w-32 h-10 rounded-lg" />
            <div className="flex justify-between gap-3 w-fit ">
              <button>
                <Skeleton className="rounded-full h-8 w-8" />
              </button>
              <button>
                <Skeleton className="rounded-full h-8 w-8" />
              </button>
              <button>
                <Skeleton className="rounded-full h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
        {/* <TranslationCard /> */}
        <div className="gradient-border rounded-xl p-[1px]">
          <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
            <div className="flex justify-between w-full mb-1 md:mb-4">
              <Skeleton className="w-32 h-10" />
              <div className=" flex gap-2 items-center justify-between">
                <Skeleton className="w-20 h-10" />
              </div>
            </div>

            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
      {/* right boxes */}
      <div className="flex flex-col gap-4 flex-1">
        {/* <DifinitionCard  /> */}
        <div className="gradient-border rounded-xl p-[1px]">
          <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
            <Skeleton className="mb-1 md:mb-4 h-10 w-32" />
            <Skeleton className="text-base md:text-xl font-base px-4 py-4 rounded-lg h-20 w-full"></Skeleton>
          </div>
        </div>
        {/* <ExamplesCard /> */}
        <div className="gradient-border rounded-xl p-[1px]">
          <div className="rounded-xl px-4 pt-5 pb-3 font-bold text-xl md:text-3xl flex flex-col gap-2 justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
            <Skeleton className="mb-1 md:mb-4 h-10 w-32" />
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map(() => (
                <Skeleton className="w-full h-10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordpageSkeletons;
