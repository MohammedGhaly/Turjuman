export default function prepareQuiz(
  quiz: {
    question: string;
    options: string[];
    correct_answer: "A" | "B" | "C" | "D";
  }[]
) {
  return quiz.map((q) => ({
    question: q.question,
    options: q.options,
    correct_answer: ["A", "B", "C", "D"].indexOf(q.correct_answer),
  }));
}
