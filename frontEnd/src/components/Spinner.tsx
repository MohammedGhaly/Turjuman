interface Props {
  cn: string;
  color: string;
}

function Spinner({ cn, color }: Props) {
  return (
    <div
      style={{ borderColor: color, borderTopColor: "transparent" }}
      className={cn}
    ></div>
  );
}

export default Spinner;
