import { QuestionType, QuizReducerAction } from "./QuizesGame";

interface Props {
  question: QuestionType;
  dispatch: React.Dispatch<QuizReducerAction>;
  answer: number | null;
}

function Options({ question, dispatch, answer }: Props) {
  const answered = answer !== null;
  return (
    <>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option px-6 py-4 text-left text-xl transition-all duration-300 cursor-pointer border border-[var(--box-border)] rounded-xl bg-[var(--quiz-option-bg)] font-semibold  ${
            index === answer ? "answer" : ""
          } ${
            answered
              ? index === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option[0]}
          disabled={answered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option.slice(3)}
        </button>
      ))}
    </>
  );
}

export default Options;
