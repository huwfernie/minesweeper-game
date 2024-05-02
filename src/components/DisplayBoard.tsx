import React from "react";
import { DefaultSquare, OpenSquare, MarkedSquare } from "./DisplayBoardSquare";

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
          const key = el + index;
          if (testShowMARK) {
            return <MarkedSquare key={key} el={el} handleClick={handleClick} />
          } else if (testShowOpen) {
            return <OpenSquare key={key} el={el} value={value}/>
          } else {
            return <DefaultSquare key={key} el={el} handleClick={handleClick} />
          }

        })
      }
    </>
  )
}

export default DisplayBoard
