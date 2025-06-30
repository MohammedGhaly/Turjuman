import { QuizReducerAction } from "./QuizesGame";

interface Props {
  numQuestions: number;
  dispatch: React.Dispatch<QuizReducerAction>;
}
function StartingScreen({ numQuestions, dispatch }: Props) {
  return (
    <div className="w-full h-full items-center justify-center flex flex-col gap-6">
      <h3 className="text-3xl font-bold">
        {numQuestions} questions to test your language Mastery
      </h3>
      <button
        className="p-4 text-lg bg-[var(--quiz-start-btn-bg)] border border-[var(--box-border)] rounded-xl font-semibold hover:brightness-90 transition-all duration-300"
        onClick={() => dispatch({ type: "start" })}
      >
        let's start
      </button>
    </div>
  );
}

export default StartingScreen;
