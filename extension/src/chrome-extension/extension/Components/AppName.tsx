interface Props {
  cn: string;
}

function AppName({ cn }: Props) {
  return <span className={`${cn} font-aboreto font-semibold`}>Turjuman</span>;
}

export default AppName;
