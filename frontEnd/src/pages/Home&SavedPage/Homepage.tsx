import SearchBar from "./SearchBar";
import WordTranslationItem from "./WordTranslationItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHomeTranslations } from "@/services/translationClient";
import TranslationCardSkeleton from "@/components/TranslationCardSkeleton";
import EmptyHomepage from "@/pages/Home&SavedPage/EmptyHomepage";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import PageSelector from "./PageSelector";

export const HOME_ITEMS_PER_PAGE = 12;

function Homepage() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: [`homeTranslations${currentPage}`],
    queryFn: () => getHomeTranslations(currentPage),
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
        queryKey: [`homeTranslations${currentPage}`],
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
      exit={{ opacity: 0, scale: 1.95 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col flex-1 overflow-hidden"
    >
      <div className="mt-4 mb-1 px-4">
        <SearchBar />
        <div className="w-full flex items-center justify-center mt-4">
          {(data?.count || 0) > 0 && (
            <PageSelector
              isLoading={isLoading}
              count={data?.count || 0}
              switchPage={handleSwitchPage}
              currentPage={currentPage}
              itemsPerPage={HOME_ITEMS_PER_PAGE}
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
            {[101, 202, 303, 404, 505, 606].map((k) => (
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
          <EmptyHomepage />
        )}
      </div>
    </motion.div>
  );
}

export default Homepage;
