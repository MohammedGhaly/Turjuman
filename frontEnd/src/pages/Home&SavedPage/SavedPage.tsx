import WordTranslationItem from "@/pages/Home&SavedPage/WordTranslationItem";
import SearchBar from "./SearchBar";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { getSavedTranslations } from "@/services/translationClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TranslationCardSkeleton from "@/components/TranslationCardSkeleton";
import EmptySavedpage from "@/pages/Home&SavedPage/EmptySavedpage";
import { motion } from "framer-motion";
import PageSelector from "./PageSelector";

export const SAVED_ITEMS_PER_PAGE = 12;

function SavedPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: [`savedTranslations${currentPage}`],
    queryFn: () => getSavedTranslations(currentPage),
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

  useEffect(
    function () {
      queryClient.invalidateQueries({
        queryKey: [`savedTranslations${currentPage}`],
      });
    },
    [currentPage, queryClient]
  );

  function handleSwitchPage(clickedPage: number) {
    setCurrentPage(clickedPage);
  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="border-t border-t-[var(--box-border)] flex flex-col flex-1 overflow-hidden"
    >
      <div className="mt-4 mb-4 px-4">
        <SearchBar />
        <div className="w-full flex items-center justify-center mt-4">
          {data?.count && (
            <PageSelector
              isLoading={isLoading}
              count={data.count}
              switchPage={handleSwitchPage}
              currentPage={currentPage}
              itemsPerPage={SAVED_ITEMS_PER_PAGE}
            />
          )}
        </div>
        <Toaster />
      </div>
      <div
        className={`turjuman-scrollable overflow-y-auto overflow-x-hidden columns-1 ${
          !isLoading && !(data?.res && data.res.length)
            ? "md:columns-1"
            : "md:columns-2"
        } gap-4 space-y-4 w-full px-4 mt-1 pb-4 overflow-scroll`}
      >
        {isLoading ? (
          <>
            {[111, 222, 333, 444, 555, 666].map((k) => (
              <TranslationCardSkeleton key={k} />
            ))}
          </>
        ) : data?.res && data.res.length ? (
          data.res.map((trans) => (
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
    </motion.div>
  );
}

export default SavedPage;
