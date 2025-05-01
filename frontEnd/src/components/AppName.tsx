interface Props {
  cn: string;
}

function AppName({ cn }: Props) {
  return <span className={`${cn} font-aboreto`}>Turjuman</span>;
}

export default AppName;
