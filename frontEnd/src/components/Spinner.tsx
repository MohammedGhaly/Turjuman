interface Props {
  size: number;
}

function Spinner({ size }: Props) {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-white border-t-transparent  rounded-full animate-spin`}
    ></div>
  );
}

export default Spinner;
