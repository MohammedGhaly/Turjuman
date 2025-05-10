import SearchBar from "./SearchBar";
import WordTranslationItem from "./WordTranslationItem";
import { useQuery } from "@tanstack/react-query";
import { getHomeTranslations } from "@/services/translationClient";
import TranslationCardSkeleton from "@/components/TranslationCardSkeleton";
import EmptyHomepage from "@/pages/Home&SavedPage/EmptyHomepage";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";

function Homepage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homeTranslations"],
    queryFn: getHomeTranslations,
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
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.95 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col flex-1 overflow-hidden border-t border-t-[var(--box-border)]"
    >
      {/* <div className="flex flex-col flex-1 overflow-hidden border-t border-t-[var(--box-border)]"> */}
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
            {[101, 202, 303, 404, 505, 606].map((k) => (
              <TranslationCardSkeleton key={k} />
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
          <EmptyHomepage />
        )}
      </div>
      {/* </div> */}
    </motion.div>
  );
}

export default Homepage;
