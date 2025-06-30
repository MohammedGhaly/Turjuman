import { QuizReducerAction } from "./QuizesGame";

interface Props {
  points: number;
  maxPossiblePoints: number;
  dispatch: React.Dispatch<QuizReducerAction>;
}

function FinishScreen({ points, maxPossiblePoints, dispatch }: Props) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}
        %)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
