import { toast } from "@/hooks/use-toast";
import {
  saveTranslation,
  unsaveTranslation,
} from "@/services/translationClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { useState } from "react";

interface BookmarkProps {
  isFavorite: boolean;
  id: string;
}

export default function WordPageGradientBookmark({
  isFavorite,
  id,
}: BookmarkProps) {
  const queryClient = useQueryClient();
  const [tempBookmark, setTempBookmark] = useState<null | boolean>(null);

  const { mutate: saveMutate, isPending: isPendingSave } = useMutation({
    mutationFn: () => saveTranslation(id),
    onSuccess: () => {
      ["homeTranslations", "savedTranslations"].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
      toast({ title: "translation saved", variant: "success" });
      setTempBookmark(true);
    },
    onError: () => {
      toast({ title: "Error saving the translation", variant: "destructive" });
    },
  });

  const { mutate: unSaveMutate, isPending: isPendingUnSave } = useMutation({
    mutationFn: () => unsaveTranslation(id),
    onSuccess: () => {
      ["savedTranslations", "homeTranslations"].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );

      toast({ title: "translation removed", variant: "success" });
      setTempBookmark(false);
    },
    onError: () => {
      toast({
        title: "Error removing the translation",
        variant: "destructive",
      });
    },
  });

  let fill = "";
  let stroke = "";
  if (isPendingSave || isPendingUnSave) {
    fill = "url(#gradient-stroke)";
    stroke = "url(#gradient-stroke)";
  } else {
    if (tempBookmark === true) {
      fill = "var(--foreground)";
    } else if (tempBookmark === false) {
      fill = "";
    } else {
      if (isFavorite) fill = "var(--foreground)";
      else fill = "";
    }
    stroke = "var(--foreground)";
  }

  function handleOnClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (!isFavorite) saveMutate();
    else unSaveMutate();
    e.stopPropagation();
  }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={(e) => handleOnClick(e)}
    >
      <defs>
        <linearGradient
          id="gradient-stroke"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#8135ad" />
          <stop offset="50%" stopColor="#ff006a" />
          <stop offset="100%" stopColor="#ffc400" />
        </linearGradient>
      </defs>
      <Bookmark stroke={stroke} fill={fill} />
    </svg>
  );
}
