import { useNavigate } from "react-router";
import { QuizReducerAction } from "./QuizesGame";

interface Props {
  points: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<QuizReducerAction>;
}

function FinishScreen({ points, maxPossiblePoints, dispatch }: Props) {
  const percentage = (points / maxPossiblePoints) * 100;
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col justify-center items-center gap-10">
      <p className="result text-4xl px-10 py-8 rounded-xl text-[var(--foreground)] bg-[var(--inner-boxes-bg)]">
        You scored {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}
        %)
      </p>
      <div className="flex justify-center gap-10">
        <button
          className="btn btn-ui px-4 py-3 w-fit self-end border border-[var(--box-border)] rounded-lg bg-[var(--quiz-option-bg)] font-semibold text-lg transition-all duration-300 cursor-pointer hover:brightness-90 active:bg-[var(--quiz-option-active-bg)]"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart
        </button>
        <button
          className="btn btn-ui px-4 py-3 w-fit self-end border border-[var(--box-border)] rounded-lg bg-[var(--quiz-option-bg)] font-semibold text-lg transition-all duration-300 cursor-pointer hover:brightness-90 active:bg-[var(--quiz-option-active-bg)]"
          onClick={() => navigate("/app/homepage")}
        >
          Homepage
        </button>
      </div>
    </div>
  );
}

export default FinishScreen;
