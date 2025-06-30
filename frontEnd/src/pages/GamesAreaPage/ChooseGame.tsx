import { useNavigate } from "react-router";

function ChooseGame() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div
        onClick={() => navigate("flashcards")}
        className="cursor-pointer w-full flex-1 flex justify-center items-center bg-[var(--outer-boxes-bg)] box-hover rounded-xl transition-all duration-300 text-6xl font-bold border-2 border-[var(--box-border)]"
      >
        Flashcards
      </div>

      <div
        onClick={() => navigate("quiz")}
        className="cursor-pointer w-full flex-1 flex justify-center items-center bg-[var(--outer-boxes-bg)] box-hover rounded-xl transition-all duration-300 text-6xl font-bold border-2 border-[var(--box-border)]"
      >
        Quizzes
      </div>
    </div>
  );
}

export default ChooseGame;
