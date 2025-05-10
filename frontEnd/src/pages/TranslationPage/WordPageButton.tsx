import useTranslationPage from "@/hooks/useTranslationPage";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function WordPageButton() {
  const navigate = useNavigate();
  const {
    translation: { id, definition },
  } = useTranslationPage();

  const hidden =
    definition === undefined || definition === null || definition === "";

  function handleClick() {
    navigate(`/app/word/${id}`);
  }

  return (
    <div className={`w-full flex justify-center ${hidden && "invisible"} `}>
      <button
        onClick={handleClick}
        className="w-fit flex gap-1 font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl text-center px-4 hover:shadow-md transition-all duration-300"
      >
        word page <ArrowRight />
      </button>
    </div>
  );
}

export default WordPageButton;
