import { useEffect, useReducer } from "react";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import QuizError from "./QuizError";
import SpinnerPage from "@/components/SpinnerPage";
import StartingScreen from "./StartingScreen";
import Progress from "./Progress";
import Question from "./Question";
import { useTheme } from "@/contexts/ThemeProvider";
import { SupportedLanguageEnum } from "@/types/SupportedLanguages";
import QuizSelectLang from "./QuizSelectLang";
import { getHomeTranslations } from "@/services/translationClient";
import "./QuizIndex.css";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import prepareQuiz from "@/utils/prepareQuiz";

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

// const fakeQuestions: {
//   question: string;
//   options: string[];
//   correct_answer: "A" | "B" | "C" | "D";
// }[] = [
//   {
//     question: "1. Which of the following best describes a guitar?",
//     options: [
//       "A. A brass instrument played by blowing",
//       "B. A percussion instrument hit with mallets",
//       "C. A string instrument typically played by strumming or plucking",
//       "D. A keyboard instrument with black and white keys",
//     ],
//     correct_answer: "C",
//   },
//   {
//     question:
//       "2. What action is most commonly associated with playing a guitar?",
//     options: ["A. Blowing", "B. Strumming", "C. Tapping", "D. Bowing"],
//     correct_answer: "B",
//   },
//   {
//     question: "3. What type of musical instrument is a piano?",
//     options: [
//       "A. A wind instrument",
//       "B. A string instrument",
//       "C. A keyboard instrument",
//       "D. A percussion instrument",
//     ],
//     correct_answer: "C",
//   },
//   {
//     question: "4. A person who plays the piano professionally is called a:",
//     options: ["A. Guitarist", "B. Pianist", "C. Violinist", "D. Flutist"],
//     correct_answer: "B",
//   },
//   {
//     question:
//       "5. In the context of music, what does it mean to 'play' an instrument?",
//     options: [
//       "A. To store it safely",
//       "B. To listen to music from it",
//       "C. To perform music on it",
//       "D. To repair it",
//     ],
//     correct_answer: "C",
//   },
//   {
//     question:
//       "6. Which word is a synonym for 'play' when referring to a theatrical performance?",
//     options: ["A. Work", "B. Game", "C. Drama", "D. Rest"],
//     correct_answer: "C",
//   },
//   {
//     question: "7. A violin is a string instrument typically played with a:",
//     options: ["A. Pick", "B. Mallet", "C. Bow", "D. Reed"],
//     correct_answer: "C",
//   },
//   {
//     question:
//       "8. In which type of musical ensemble is a violin most commonly found?",
//     options: [
//       "A. Rock band",
//       "B. Jazz quartet",
//       "C. Orchestra",
//       "D. Marching band",
//     ],
//     correct_answer: "C",
//   },
//   {
//     question: "9. Which family of instruments does a flute belong to?",
//     options: ["A. Brass", "B. Percussion", "C. Woodwind", "D. String"],
//     correct_answer: "C",
//   },
//   {
//     question: "10. How is sound primarily produced on a flute?",
//     options: [
//       "A. By plucking strings",
//       "B. By hitting a membrane",
//       "C. By blowing air across an opening",
//       "D. By pressing keys that strike strings",
//     ],
//     correct_answer: "C",
//   },
// ];

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
  const maxPossiblePoints = questions.length * 10;

  useEffect(
    function () {
      async function fetchQuestions() {
        if (status !== "loading") return;
        try {
          const homeWords = await getHomeTranslations(1);
          const latestWords = homeWords.res
            .slice(0, 5)
            .map((word) => word.original);
          fetch(
            "https://quizzesturjuman-production.up.railway.app/generate-questions/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ words: latestWords, srcLang }),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.detail !== undefined)
                throw new Error(data.detail[0].msg);
              else {
                const quiz = prepareQuiz(data);
                dispatch({ type: "dataReceived", payload: quiz });
              }
            });
          // const quiz = prepareQuiz(fakeQuestions);
          // dispatch({ type: "dataReceived", payload: quiz });
        } catch (e) {
          if (e instanceof Error)
            toast({ title: e.message, variant: "destructive" });
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
      <Toaster />
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
