console.log("from content script");
document.addEventListener("load", () => {
  console.log("document loaded");
});

document.addEventListener("mouseup", () => {
  console.log("mouseup");
  const selectedText = window.getSelection()?.toString().trim();
  if (selectedText) {
    // Create or move the translate icon
    const icon =
      document.getElementById("translate-icon") || createTranslateIcon();
    const { x, y } = window
      .getSelection()
      ?.getRangeAt(0)
      .getBoundingClientRect() || { x: 0, y: 0 };
    icon.style.top = `${window.scrollY + y + 30}px`;
    icon.style.left = `${window.scrollX + x + 10}px`;
    icon.style.display = "block";
    // icon.onclick = () => {
    //   chrome.runtime.sendMessage({
    //     type: "TRANSLATE_WORD",
    //     word: selectedText,
    //   });
    //   icon.style.display = "none"; // Hide icon after click
    // };
  } else {
    const icon = document.getElementById("translate-icon");
    if (icon) icon.style.display = "none"; // Hide icon if no text is selected
  }
});

function createTranslateIcon() {
  const icon = document.createElement("div");
  icon.id = "translate-icon";
  icon.style.position = "absolute";
  icon.style.width = "20px";
  icon.style.height = "20px";
  icon.style.backgroundColor = "yellow";
  icon.style.cursor = "pointer";
  document.body.appendChild(icon);
  return icon;
}
