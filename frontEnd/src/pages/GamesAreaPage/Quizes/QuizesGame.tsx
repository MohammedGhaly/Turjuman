import { useEffect, useReducer } from "react";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import QuizError from "./QuizError";
import SpinnerPage from "@/components/SpinnerPage";
import StartingScreen from "./StartingScreen";
import Progress from "./Progress";
import Question from "./Question";

// import "./QuizApp.css";
import "./QuizIndex.css";
import { useTheme } from "@/contexts/ThemeProvider";
import { SupportedLanguageEnum } from "@/types/SupportedLanguages";
import QuizSelectLang from "./QuizSelectLang";
import { getHomeTranslations } from "@/services/translationClient";

export interface QuestionType {
  question: string;
  options: string[];
  correct_answer: number;
}

interface QuizState {
  questions: Array<QuestionType>;
  status: "loading" | "ready" | "active" | "finished" | "error" | "select";
  index: number;
  answer: number | null;
  points: number;
  srcLang: SupportedLanguageEnum;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QuizReducerAction = { type: QuizReducerActionType; payload?: any };

type QuizReducerActionType =
  | "dataReceived"
  | "load"
  | "dataFailed"
  | "start"
  | "newAnswer"
  | "nextQuestion"
  | "finish"
  | "setTargetLang"
  | "restart";

function reducer(state: QuizState, action: QuizReducerAction): QuizState {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state?.questions?.at(state.index)?.correct_answer
            ? state.points + 10
            : state.points,
      };
    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
      };
    case "setTargetLang":
      return {
        ...state,
        srcLang: action.payload,
        status: "select",
        questions: [],
        index: 0,
        answer: null,
        points: 0,
      };
    case "load":
      return {
        ...state,
        status: "loading",
        questions: [],
        index: 0,
        answer: null,
        points: 0,
      };
    default:
      throw new Error("action unknown");
  }
}

const initialState: QuizState = {
  questions: [],
  status: "select",
  index: 0,
  answer: null,
  points: 0,
  srcLang: SupportedLanguageEnum.English,
};

function QuizesGame() {
  const [{ answer, index, points, questions, status, srcLang }, dispatch] =
    useReducer(reducer, initialState);

  const { theme } = useTheme();

  const maxPossiblePoints = questions.reduce((prev) => prev + 10, 0);

  useEffect(
    function () {
      async function fetchQuestions() {
        if (status !== "loading") return;
        try {
          const homeWords = await getHomeTranslations(1);
          const latestWords = homeWords.res
            .slice(0, 5)
            .map((word) => word.original);
          fetch("https://quizzesturjuman-production.up.railway.app/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ words: latestWords, srcLang }),
          })
            .then((res) => res.json())
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch(() => dispatch({ type: "dataFailed" }));
        } catch {
          dispatch({ type: "dataFailed" });
        }
      }
      fetchQuestions();
    },
    [status, srcLang]
  );

  return (
    <div
      className={`h-full w-full flex items-top justify-center transition-none ${theme} ${
        status === "active" ? "pt-20" : ""
      }`}
    >
      <div className="w-full md:w-3/5 flex flex-col gap-4">
        {status === "select" && (
          <QuizSelectLang srcLang={srcLang} dispatch={dispatch} />
        )}
        {status === "loading" && <SpinnerPage />}
        {status === "error" && <QuizError />}
        {status === "ready" && (
          <StartingScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={questions.length}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </div>
    </div>
  );
}

export default QuizesGame;
