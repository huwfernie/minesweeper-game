import React from "react";

interface IDisplayBoardProps {
  gameBoard: string[] | null;
  interactions: string[];
  handleClick: React.MouseEventHandler<HTMLButtonElement>
}

function DisplayBoard({ gameBoard, interactions, handleClick }: IDisplayBoardProps): React.JSX.Element | null {
  if (gameBoard === null) {
    return null;
  }

  return (
    <>
      {
        gameBoard.map((el: string, index: number) => {
          // 3 options:
          // 1. return square with a MARK on
          // 2. return square that is OPEN
          // 3. return square to click on (default)

          const testShowMARK = interactions.includes(el.replace(/(\d)_(\d)_(.*)/, "$1_$2_MARK"));
          const testShowOpen = interactions.includes(el.replace(/(\d)_(\d)_(.*)/, "$1_$2_OPEN"));
          const value = el.replace(/(\d)_(\d)_(.*)/, "$3");
          if (testShowMARK) {
            return (
              <button
                className="bg-slate-100 hover:bg-slate-400 aspect-square text-xs min-w-4"
                key={el + index}
                data-el={el}
                onClick={handleClick}
              >!</button>
            )
          } else if (testShowOpen) {
            return (
              <button
                className="bg-slate-100 aspect-square text-xs min-w-4"
                key={el + index}
                data-el={el}
              >{value}</button>
            )
          } else {
            return <button
              className="bg-slate-200 hover:bg-slate-400 aspect-square text-xs min-w-4"
              key={el + index}
              data-el={el}
              onClick={handleClick}
            ></button >
          }

        })
      }
    </>
  )
}

export default DisplayBoard
