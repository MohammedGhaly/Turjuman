import { useEffect, useState } from "react";
import Popup from "./Popup";
import PopupIcon from "./PopupIcon";
import { container } from "../../contentScript";
import {
  calculateIconPosition,
  calculatePopupPosition,
} from "../utils/CalculateIconAndPopupPositions";

export interface IconPosition {
  left: number;
  top: number;
}
export interface PopupPosition {
  left: number;
  top: number;
}

function PopupApp() {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [selectedParagraph, setSelectedParagraph] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isIconOpen, setIsIconOpen] = useState<boolean>(false);
  const [iconPosition, setIconPosition] = useState<IconPosition>({
    left: 0,
    top: 50,
  });
  const [popupPosition, setPopupPosition] = useState<PopupPosition>({
    left: 3,
    top: 50,
  });

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsIconOpen(false);
  };

  useEffect(
    function () {
      moveContainerIcon(iconPosition);
    },
    [iconPosition]
  );

  // Listen for text selection
  useEffect(() => {
    const handleMouseup = (e: MouseEvent) => {
      chrome.storage.sync.get(
        ["popupEnabled", "autoDisablePopup"],
        async (result) => {
          const res = await chrome.storage.local.get(["autoDisablePopupSites"]);
          if (result.autoDisablePopup && res.autoDisablePopupSites) {
            const disableSites: string[] =
              res.autoDisablePopupSites.split(",,,");
            let shouldReturn = false;
            disableSites.forEach((s) => {
              if (s && window.location.hostname.includes(s)) {
                shouldReturn = true;
              }
            });
            if (shouldReturn) return;
          }

          if (result.popupEnabled === undefined || result.popupEnabled) {
            const targetElement = e.target as HTMLElement; // Cast target to HTMLElement
            if (targetElement.id === "Turjuman-Popup-container") return;

            // const text = window.getSelection()?.toString().trim();
            const { text, paragraph } = getSelectedTextDetails();
            if (text) {
              const { left, top, right, bottom } = window
                .getSelection()
                ?.getRangeAt(0)
                .getBoundingClientRect() || {
                left: 0,
                top: 0,
                right: 50,
                bottom: 0,
              };
              const iconPos = { left, right, top, bottom };
              setIconPosition(calculateIconPosition(iconPos));
              setPopupPosition(calculatePopupPosition(iconPos));

              requestAnimationFrame(() => {
                setIsIconOpen(true);
                setSelectedWord(text);
                setSelectedParagraph(paragraph);
                container.style.display = "block";
              });
            } else {
              container.style.display = "none";
              setIsIconOpen(false);
              setIsPopupOpen(false);
            }
          }
        }
      );
    };
    document.addEventListener("mouseup", handleMouseup);
    return () => {
      document.removeEventListener("mouseup", handleMouseup);
    };
  }, [iconPosition]);

  function handleOpenPopup() {
    // calculate the position of the popup depending on the 'iconPosition' state
    setIsIconOpen(false);
    moveContainerPopup(popupPosition);
    setIsPopupOpen(true);
  }

  return (
    (isPopupOpen && (
      <Popup
        paragraph={selectedParagraph}
        text={selectedWord}
        onClose={closePopup}
      />
    )) ||
    (isIconOpen && (
      <PopupIcon setIsPopupOpen={handleOpenPopup} theme={"theme-dark"} />
    )) || <></>
  );
}

function moveContainerIcon(pos: IconPosition) {
  container.style.top = `${pos.top}px`;
  container.style.left = `${pos.left}px`;
}

function moveContainerPopup({ left, top }: PopupPosition) {
  container.style.top = `${top > 0 ? top.toString() + "px" : ""}`;
  container.style.left = `${left}px`;
}

function getSelectedTextDetails() {
  const selection = window.getSelection();
  const text = selection?.toString().trim();

  if (!text) return { text: "", paragraph: "" };

  const words = text.split(/\s+/);
  if (words.length > 1) {
    return { text, paragraph: text };
  }

  const range = selection?.getRangeAt(0);
  if (!range) return { text, paragraph: text };

  const startContainer = range.startContainer;
  const parentNode = startContainer.parentNode;

  if (parentNode && parentNode.textContent) {
    const fullText = parentNode.textContent.trim();
    const allWords = fullText.split(/\s+/);
    const selectedIndex = allWords.indexOf(text);

    if (selectedIndex !== -1) {
      const start = Math.max(0, selectedIndex - 10);
      const end = Math.min(allWords.length, selectedIndex + 11);
      const paragraph = allWords.slice(start, end).join(" ");
      return { text, paragraph };
    }
  }

  return { text, paragraph: text };
}

export default PopupApp;
