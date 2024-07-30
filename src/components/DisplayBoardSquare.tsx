import React from "react";

interface ISquareWithValue {
  value: string;
  el: string;
}

interface IClickableSquare {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  el: string;
}

function DefaultSquare({ handleClick, el }: IClickableSquare): React.JSX.Element {
  return <button
    className="bg-slate-200 hover:bg-slate-400 aspect-square text-xs min-w-4"
    data-el={el}
    onClick={handleClick}
    onContextMenu={handleClick}
  ></button>
}

function OpenSquare({ value, el }: ISquareWithValue): React.JSX.Element {
  return (
    <button
      className="bg-slate-100 aspect-square text-xs min-w-4"
      data-el={el}
    >{value}</button>
  )
}

function MarkedSquare({ handleClick, el }: IClickableSquare): React.JSX.Element {
  return (
    <button
      className="bg-red-100 hover:bg-red-400 aspect-square text-xs min-w-4 text-red-600 font-bold"
      data-el={el}
      onClick={handleClick}
      onContextMenu={handleClick}
    >!</button>
  )
}

export { DefaultSquare, OpenSquare, MarkedSquare }
