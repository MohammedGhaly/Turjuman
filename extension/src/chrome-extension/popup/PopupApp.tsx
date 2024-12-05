import { useEffect, useState } from "react";
import Popup from "./Popup";
import PopupIcon from "./PopupIcon";
import { container } from "../../contentScript";
import calculateIconPosition from "../utils/CalculateIconPosition";

export interface IconPosition {
  left: number;
  top: number;
}

const PopupApp = () => {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isIconOpen, setIsIconOpen] = useState<boolean>(false);
  const [iconPosition, setIconPosition] = useState<IconPosition>({
    left: 0,
    top: 50,
  });

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsIconOpen(false);
  };

  useEffect(
    function () {
      moveContainer(iconPosition);
    },
    [iconPosition]
  );

  // Listen for text selection
  useEffect(() => {
    const handleMouseup = (e: MouseEvent) => {
      // console.log("Mouseup event occurred inside the popup (element)");
      const targetElement = e.target as HTMLElement; // Cast target to HTMLElement
      if (targetElement.id === "Turjuman-Popup-container") {
        return;
      }

      const text = window.getSelection()?.toString().trim();
      if (text) {
        const { left, top, right } = window
          .getSelection()
          ?.getRangeAt(0)
          .getBoundingClientRect() || { left: 0, top: 0, right: 50 };
        const iconPos = { left, right, top };
        setIsIconOpen(true);
        setSelectedWord(text);
        setIconPosition(calculateIconPosition(iconPos));
        container.style.display = "block";
      } else {
        container.style.display = "none";
        setIsIconOpen(false);
        setIsPopupOpen(false);
      }
    };
    document.addEventListener("mouseup", handleMouseup);
    return () => {
      document.removeEventListener("mouseup", handleMouseup);
    };
  }, [iconPosition]);

  return (
    (isPopupOpen && <Popup word={selectedWord} onClose={closePopup} />) ||
    (isIconOpen && (
      <PopupIcon position={iconPosition} setIsPopupOpen={setIsPopupOpen} />
    )) || <></>
  );
};

function moveContainer(pos: IconPosition) {
  container.style.top = `${pos.top}px`;
  container.style.left = `${pos.left}px`;
}

export default PopupApp;
