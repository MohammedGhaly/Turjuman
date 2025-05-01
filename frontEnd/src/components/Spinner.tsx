interface Props {
  size: string;
  color: string;
}

function Spinner({ size, color }: Props) {
  return (
    <div
      style={{ borderColor: color, borderTopColor: "transparent" }}
      className={`w-${size} h-${size} border-4 rounded-full animate-spin`}
    ></div>
  );
}

export default Spinner;
