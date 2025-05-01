import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

function WordPageButton() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={() => navigate("/app/word")}
        className="w-fit flex gap-1 font-semibold border border-[var(--box-border)] bg-[var(--input-background)] py-3 rounded-xl text-center px-4 hover:shadow-md transition-all duration-300"
      >
        word page <ArrowRight />
      </button>
    </div>
  );
}

export default WordPageButton;
