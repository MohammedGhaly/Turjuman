import { toast } from "@/hooks/use-toast";
import { Bookmark } from "lucide-react";
import { useState } from "react";

interface BookmarkProps {
  isFavorite: boolean | undefined;
  id: string | undefined;
  changeTransFavorite: (isFavorite: boolean) => void;
}

export default function GradientBookmark({
  isFavorite,
  id,
  changeTransFavorite,
}: BookmarkProps) {
  // const [tempBookmark, setTempBookmark] = useState<null | boolean>(null);
  const [isPendingSave, setIsPendingSave] = useState(false);
  const [isPendingUnSave, setIsPendingUnSave] = useState(false);

  async function saveWord() {
    if (!id) return;

    setIsPendingSave(true);
    chrome.runtime.sendMessage(
      {
        type: "SAVE_TRANS",
        payload: {
          id,
        },
      },
      (response) => {
        if (response?.success) {
          changeTransFavorite(true);
        } else {
          console.error("saving failed:", response?.error);
          toast({ title: response?.error, variant: "destructive" });
        }
        setIsPendingSave(false);
      }
    );
  }

  async function unsaveWord() {
    if (!id) return;

    setIsPendingUnSave(true);
    chrome.runtime.sendMessage(
      {
        type: "UNSAVE_TRANS",
        payload: {
          id,
        },
      },
      (response) => {
        if (response?.success) {
          changeTransFavorite(false);
        } else {
          console.error("unsaving failed:", response?.error);
          toast({ title: response?.error, variant: "destructive" });
        }
        setIsPendingUnSave(false);
      }
    );
  }

  let fill = "";
  let stroke = "";
  if (isPendingSave || isPendingUnSave) {
    fill = "url(#gradient-stroke)";
    stroke = "url(#gradient-stroke)";
  } else {
    if (isFavorite === true) {
      fill = "var(--foreground)";
    } else if (isFavorite === false) {
      fill = "";
    } else {
      if (isFavorite) fill = "var(--foreground)";
      else fill = "";
    }
    stroke = "var(--foreground)";
  }

  function handleOnClick(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    if (isFavorite) unsaveWord();
    else saveWord();
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
