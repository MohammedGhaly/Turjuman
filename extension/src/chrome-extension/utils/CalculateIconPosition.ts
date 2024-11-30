export default function calculateIconPosition(position: {
  left: number;
  top: number;
  right: number;
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
