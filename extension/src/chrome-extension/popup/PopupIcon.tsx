import LogoSvg from "./LogoSvg";

interface Props {
  setIsPopupOpen: () => void;
  theme: string;
}

function PopupIcon({ setIsPopupOpen, theme }: Props) {
  return (
    <div
      id="turjuman-translate-icon"
      style={{ padding: "6px", borderRadius: "8px" }}
      className={`flex bg-[#343434] justify-center items-center cursor-pointer`}
      onClick={setIsPopupOpen}
    >
      <LogoSvg theme={theme} size="25" />
    </div>
  );
}

export default PopupIcon;
