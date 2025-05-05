import { Skeleton } from "./ui/skeleton";

function TranslationCardSkeleton() {
  return (
    <div className="gradient-border rounded-xl p-[1px]">
      <div className="flex flex-col h-fit gap-4 px-5 py-[10px] bg-[var(--outer-boxes-bg)] border border-[--box-border] rounded-xl">
        <div className="flex items-center justify-between">
          {/* left */}
          <div className="flex gap-4 items-center">
            <Skeleton className="h-8 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          {/* right */}
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex justify-end gap-4 items-center text-2xl">
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="my-2 flex flex-row gap-2">
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    </div>
  );
}

export default TranslationCardSkeleton;
