import { QuizReducerAction } from "./QuizesGame";

interface Props {
  dispatch: React.Dispatch<QuizReducerAction>;
  answer: number | null;
  index: number;
  numQuestions: number;
}

function NextButton({ dispatch, answer, index, numQuestions }: Props) {
  if (answer === null) return null;
  return (
    <button
      className="px-4 py-3 w-fit self-end border border-[var(--box-border)] rounded-lg bg-[var(--quiz-option-bg)] font-semibold text-lg transition-all duration-300 cursor-pointer hover:brightness-90 active:bg-[var(--quiz-option-active-bg)]"
      onClick={() =>
        dispatch({
          type: index === numQuestions - 1 ? "finish" : "nextQuestion",
        })
      }
    >
      {index === numQuestions - 1 ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
