export function calculatePopupPosition(position: {
  left: number;
  top: number;
}) {
  //calculates the position using pixels
  let t = position.top;
  let l = position.left;
  // calculate l
  if (position.left + 440 > window.innerWidth) {
    // if the popup is too close to the right edge, render it on the left
    l = window.scrollX + position.left - 445;
  }

  if (t + 235 > window.innerHeight) {
    t = window.scrollY + window.innerHeight - 260;
  } else {
    t = window.scrollY + t;
  }

  return {
    left: Math.max(l, 3),
    top: t,
  };
}

export function calculateIconPosition(position: {
  left: number;
  top: number;
  right: number;
  bottom: number;
}) {
  //calculates the position using pixels
  let t = position.top;
  let l = position.left;

  if (t + 60 >= window.innerHeight) t = window.scrollY + t - 34;
  else t = window.scrollY + t + 24;

  if (position.right + 60 >= window.innerWidth) l = window.innerWidth - 75;
  else l = window.scrollX + l + 10;

  return { left: l, top: t };
}
