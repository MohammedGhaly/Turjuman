import SearchBar from "../components/Home/SearchBar";
import WordTranslationItem from "../components/Home/WordTranslationItem";
import { useQuery } from "@tanstack/react-query";
import { getHomeTranslations } from "@/services/translationClient";
import TranslationCardSkeleton from "@/components/TranslationCardSkeleton";
import EmptyHomepage from "@/components/Home/EmptyHomepage";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Homepage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homeTranslations"],
    queryFn: getHomeTranslations,
  });
  console.log("react query error=> ", error);

  useEffect(
    function () {
      if (error)
        toast({
          variant: "destructive",
          title: "An error ocurred while fetching translations",
        });
    },
    [error]
  );

  return (
    <div className="flex-1 border-t border-t-[var(--box-border)]">
      <div className="mt-4 mb-4 px-4">
        <SearchBar />
        <Toaster />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 my-4 px-4">
        {isLoading ? (
          <>
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
          </>
        ) : data && data.length ? (
          data.map((trans) => (
            <WordTranslationItem
              key={trans.id}
              original={trans.original}
              translation={trans.translation}
              synonymsTarget={trans.synonymsTarget}
            />
          ))
        ) : (
          <EmptyHomepage />
        )}
      </div>
    </div>
  );
}

export default Homepage;
