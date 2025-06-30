import Options from "./Options";
import { QuestionType, QuizReducerAction } from "./QuizesGame";

interface Props {
  question: QuestionType;
  dispatch: React.Dispatch<QuizReducerAction>;
  answer: number | null;
}

function Question({ question, dispatch, answer }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-2xl mb-8">{question.question.slice(3)}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
