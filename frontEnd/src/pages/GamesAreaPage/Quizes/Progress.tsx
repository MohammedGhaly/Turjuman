interface Props {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}
function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: Props) {
  return (
    <>
      <div className="progress w-full">
        <progress
          max={numQuestions}
          value={index + Number(answer !== null)}
          className="w-full"
        />
        <p className="text-[var(--foreground)] text-base">
          Question <strong>{index + 1}</strong>/{numQuestions}
        </p>
        <p className="text-[var(--foreground)] text-base">
          Points {points}/{maxPossiblePoints}
        </p>
      </div>
    </>
  );
}

export default Progress;
