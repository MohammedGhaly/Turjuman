import { IconPosition } from "./PopupApp";

interface Props {
  position: IconPosition;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PopupIcon({ position, setIsPopupOpen }: Props) {
  //   const { l, t } = calculatePosition(position);
  console.log(position);
  return (
    <div
      id="turjuman-translate-icon"
      style={{ padding: "6px", borderRadius: "8px" }}
      className={`flex bg-[#343434] justify-center items-center cursor-pointer`}
      onClick={() => setIsPopupOpen(true)}
    >
      <img
        className="TurjumanLogoImg w-5 h-5"
        src={chrome.runtime.getURL("assets/logo.png")}
      />
    </div>
  );
}

export default PopupIcon;
