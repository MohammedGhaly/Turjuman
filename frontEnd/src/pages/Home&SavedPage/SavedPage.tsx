import WordTranslationItem from "@/pages/Home&SavedPage/WordTranslationItem";
import SearchBar from "./SearchBar";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { getSavedTranslations } from "@/services/translationClient";
import { useQuery } from "@tanstack/react-query";
import TranslationCardSkeleton from "@/components/TranslationCardSkeleton";
import EmptySavedpage from "@/pages/Home&SavedPage/EmptySavedpage";

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
      <div
        className={`turjuman-scrollable overflow-y-auto overflow-x-hidden columns-1 ${
          !isLoading && !(data && data.length) ? "md:columns-1" : "md:columns-2"
        } gap-4 space-y-4 w-full px-4 my-4 overflow-scroll`}
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map(() => (
              <TranslationCardSkeleton />
            ))}
          </>
        ) : data && data.length ? (
          data.map((trans) => (
            <WordTranslationItem
              srcLang={trans.srcLang}
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
          srcLang="English"
          isFavorite={false}
          id={"10"}
          original="Entschuldigung"
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
          srcLang="English"
          isFavorite={true}
          id={"20"}
          original="Champion"
          key={20}
          translation="yakol"
          synonymsTarget={["eat", "eats", "swallow"]}
        />
        <WordTranslationItem
          srcLang="English"
          isFavorite={false}
          id={"30"}
          original="Eat"
          key={30}
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
          srcLang="English"
          isFavorite={false}
          id={"40"}
          original="World"
          key={40}
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
          srcLang="English"
          isFavorite={false}
          id={"50"}
          original="Carbondioxide"
          key={50}
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
          srcLang="English"
          isFavorite={false}
          id={"60"}
          original="eat"
          key={60}
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
          srcLang="English"
          isFavorite={false}
          id={"70"}
          original="eat"
          key={70}
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
          srcLang="English"
          isFavorite={false}
          id={"80"}
          original="eat"
          key={80}
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
