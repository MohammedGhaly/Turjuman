interface Props {
  fontSize: string;
}

function AppName({ fontSize }: Props) {
  return <span className={`${fontSize} font-aboreto`}>Turjuman</span>;
}

export default AppName;
