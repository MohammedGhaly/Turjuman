import WordCard from "./WordCard";
import TranslationCard from "./TranslationCard";
import DifinitionCard from "./DifinitionCard";
import ExamplesCard from "./ExamplesCard";
import WordpageSkeletons from "./WordpageSkeletons";
import { useNavigate, useParams } from "react-router";
import { fetchTranslation } from "@/services/translationClient";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useTranslationPage } from "@/contexts/TranslationProvider";
import { TranslationResponse } from "@/types/TranslationResponse";

function WordPage() {
  const { id } = useParams();
  const [translation, setTranslation] = useState<
    TranslationResponse | undefined
  >();
  const { translation: currentTranslation } = useTranslationPage();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!id) return;
      if (id === currentTranslation.id) {
        setTranslation(currentTranslation);
        return;
      }
      async function fetchTrans(id: string) {
        try {
          setIsLoading(true);
          const res = await fetchTranslation(id);
          setTranslation?.(res);
        } catch {
          toast({
            variant: "destructive",
            title: "An error ocurred while fetching translation",
          });
          navigate("/app/homepage");
        } finally {
          setIsLoading(false);
        }
      }
      fetchTrans(id);
    },
    [id, setTranslation, currentTranslation, navigate]
  );

  if (isLoading) return <WordpageSkeletons />;

  return (
    <div className="flex flex-col md:flex-row w-full gap-4 border-t-[var(--box-border)] border-t py-8 px-1">
      <Toaster />
      {/* left */}
      <div className="flex flex-col gap-4 flex-1">
        <WordCard
          srcLang={translation?.srcLang || "English"}
          id={translation ? translation.id : ""}
          isFavorite={translation ? translation.isFavorite || false : false}
          original={translation ? translation?.original : ""}
        />
        <TranslationCard
          original={translation ? translation?.original : ""}
          synonymsSource={
            translation?.synonymsSource ? translation.synonymsSource : []
          }
          synonymsTarget={
            translation?.synonymsTarget ? translation.synonymsTarget : []
          }
        />
      </div>
      {/* right */}
      <div className="flex flex-col gap-4 flex-1">
        <DifinitionCard definition={translation?.definition || ""} />

        {translation?.examples && (
          <ExamplesCard examples={translation.examples || []} />
        )}
      </div>
    </div>
  );
}

export default WordPage;
