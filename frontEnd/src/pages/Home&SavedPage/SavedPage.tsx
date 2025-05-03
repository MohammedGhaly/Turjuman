import WordTranslationItem from "@/pages/Home&SavedPage/WordTranslationItem";
import SearchBar from "./SearchBar";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { getSavedTranslations } from "@/services/translationClient";
import { useQuery } from "@tanstack/react-query";
import TranslationCardSkeleton from "@/components/TranslationCardSkeleton";
import EmptySavedpage from "@/pages/Home&SavedPage/EmptySavedpage";
// import WordTranslationItem from "../components/Home/WordTranslationItem";

function SavedPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["savedTranslations"],
    queryFn: getSavedTranslations,
    staleTime: 15000,
  });

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
    <div className="h-full border-t border-t-[var(--box-border)] flex flex-col flex-1 overflow-hidden">
      <div className="mt-4 mb-4 px-4">
        <SearchBar />
        <Toaster />
      </div>
      <div className="turjuman-scrollable overflow-y-auto overflow-x-hidden grid grid-cols-1 md:grid-cols-2 w-full  gap-4 my-4 px-4 overflow-scroll">
        {isLoading ? (
          <>
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
            <TranslationCardSkeleton />
          </>
        ) : data && data.length ? (
          data.map((trans) => (
            <WordTranslationItem
              key={trans.id}
              id={trans.id}
              original={trans.original}
              translation={trans.translation}
              synonymsTarget={trans.synonymsTarget}
              isFavorite={trans.isFavorite}
            />
          ))
        ) : (
          <EmptySavedpage />
        )}

        {/* <WordTranslationItem
          isFavorite={false}
          id={"10"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        />
        <WordTranslationItem
          isFavorite={true}
          id={"20"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={["eat", "eats", "swallow"]}
        />
        <WordTranslationItem
          isFavorite={false}
          id={"30"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        />
        <WordTranslationItem
          isFavorite={false}
          id={"40"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        />
        <WordTranslationItem
          isFavorite={false}
          id={"50"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        />
        <WordTranslationItem
          isFavorite={false}
          id={"60"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        />
        <WordTranslationItem
          isFavorite={false}
          id={"70"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        />
        <WordTranslationItem
          isFavorite={false}
          id={"80"}
          original="eat"
          key={10}
          translation="yakol"
          synonymsTarget={[
            "eat",
            "eats",
            "swallow",
            "chew",
            "eat",
            "eat",
            "eat",
          ]}
        /> */}
      </div>
    </div>
  );
}

export default SavedPage;
