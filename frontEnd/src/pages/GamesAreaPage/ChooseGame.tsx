import { MessageCircleQuestion, SquareStack } from "lucide-react";
import { useNavigate } from "react-router";

function ChooseGame() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      <div
        onClick={() => navigate("flashcards")}
        className="cursor-pointer w-full h-fit p-8 flex justify-center items-start bg-[var(--outer-boxes-bg)] box-hover rounded-xl transition-all duration-300 text-3xl font-bold border-2 border-[var(--box-border)] flex-col gap-3"
      >
        <div className="flex gap-3 items-center">
          <h2>Flashcards</h2>
          <SquareStack />
        </div>
        <p className="text-sm font-normal md:pr-36">
          helps you review and reinforce vocabulary you have translated before.
          Each flashcard shows a word on one side and its translation,
          definition, or synonym on the other. test your knowledge, strengthen
          your memory.
        </p>
      </div>

      <div
        onClick={() => navigate("quiz")}
        className="cursor-pointer w-full h-fit p-8 flex justify-center items-start bg-[var(--outer-boxes-bg)] box-hover rounded-xl transition-all duration-300 text-3xl font-bold border-2 border-[var(--box-border)] flex-col gap-3"
      >
        <div className="flex gap-3 items-center">
          <h2>Quizes</h2>
          <MessageCircleQuestion />
        </div>
        <p className="text-sm font-normal md:pr-36">
          turns recent translations into multiple-choice questions. It focuses
          on testing the your retention of very recent words or other related
          ones by asking to select the correct translation or definition from a
          set of options.
        </p>
      </div>
    </div>
  );
}

export default ChooseGame;
