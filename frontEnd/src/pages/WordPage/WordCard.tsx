import WordPageGradientBookmark from "./WordPageGradientBookmark";
import { Trash2, Volume1, Youtube } from "lucide-react";
import capitalize from "../../utils/capitalize";
import openYouglish from "@/utils/youglish";
import { pronounce } from "@/utils/pronounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTranslation } from "@/services/translationClient";
import { useToast } from "@/hooks/use-toast";

interface Props {
  original: string;
  id: string;
  isFavorite: boolean;
  srcLang: string;
}

function WordCard({ original, id, isFavorite, srcLang }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isPendingDelete } = useMutation({
    mutationFn: () => deleteTranslation(id),
    onSuccess: () => {
      ["homeTranslations", "savedTranslations"].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      toast({ title: "translation deleted", variant: "success" });
    },
    onError: () => {
      toast({
        title: "Error deleting the translation",
        variant: "destructive",
      });
    },
  });

  function handleDelte(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    deleteMutate();
    e.stopPropagation();
  }

  return (
    <div className="rounded-xl px-6 py-5 font-bold text-3xl flex justify-between bg-[var(--outer-boxes-bg)] border border-[var(--box-border)]">
      <div>{original ? capitalize(original) : ""}</div>
      <div className="flex justify-between gap-1 w-fit ">
        <button
          onClick={() => pronounce(original, srcLang)}
          className="hover:bg-[var(--icon-btn-hover)] p-2 rounded-full duration-200 transition-all"
        >
          <Volume1 strokeWidth="1.5px" />
        </button>
        <button className="hover:bg-[var(--icon-btn-hover)] p-2 rounded-full duration-200 transition-all">
          <Youtube
            strokeWidth="1.5px"
            onClick={(e) => {
              e.stopPropagation();
              openYouglish(original, srcLang);
            }}
          />
        </button>
        <button className="hover:bg-[var(--icon-btn-hover)] p-2 rounded-full duration-200 transition-all">
          <WordPageGradientBookmark id={id} isFavorite={isFavorite} />
        </button>
        <button
          onClick={handleDelte}
          className={`hover:bg-red-500/15 p-2 ${
            isPendingDelete ? "hover:bg-red-500/30 p-2" : ""
          } rounded-full duration-200 transition-all`}
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}

export default WordCard;
