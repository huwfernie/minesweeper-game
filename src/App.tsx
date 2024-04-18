import { useEffect, useState } from 'react';
import { generateGameBoard } from './helpers/board';
import { testGameOver, testGameWin } from './helpers/game';
import DisplayBoard from './components/DisplayBoard'

function App() {
  const [gameBoard, setGameBoard] = useState<string[] | null>(null);
  const [interactions, setInteraction] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  function updateInteraction(el: string, type: "MARK" | "OPEN") {
    setInteraction((prevState) => {
      // Right Click / altKey - SET or REMOVE A MARK
      if (type === "MARK") {
        el = el.replace(/(\d)_(\d)_(.*)/, "$1_$2_MARK");

        // if MARK was in prevState then remove it and update state, else add MARK to state
        if (prevState.includes(el)) {
          const state = [...prevState];
          state.splice(state.indexOf(el), 1);
          return state;
        } else {
          return [...prevState, el]
        }
      } else {
        // LEFT click
        el = el.replace(/(\d)_(\d)_(.*)/, "$1_$2_OPEN");
        const test = ([...prevState] as string[]).includes(el)
        if (!test) {
          return [...prevState, el]
        } else {
          return prevState
        }
      }
    });
  }

  function handleClick(clickEvent: React.MouseEvent<HTMLButtonElement>): void {
    // TypeGuards
    if (!(clickEvent.target instanceof HTMLButtonElement)) {
      return;
    }
    // Stop if game over or game complete
    if (gameOver || gameComplete) {
      return;
    }

    // TypeGuards
    const el = clickEvent.target.dataset.el;
    if (el === undefined) {
      return;
    }

    // @TODO - handle right click where available
    if (clickEvent.altKey) {
      updateInteraction(el, "MARK");
    } else {
      updateInteraction(el, "OPEN");
    }
  }

  function handleReset(): void {
    const board = generateGameBoard();
    setGameBoard(board);
    setInteraction([]);
    setGameOver(false);
    setGameComplete(false);
  }

  useEffect(() => {
    const board = generateGameBoard();
    setGameBoard(board);
  }, [])

  // TEST FOR GAME OVER ON EACH INTERACTION UPDATE
  useEffect(() => {
    if (gameBoard !== null) {
      if (testGameOver(interactions, gameBoard)) {
        setGameOver(true);
      } else if (testGameWin(interactions, gameBoard)) {
        setGameComplete(true);
      }
    }
  }, [gameBoard, interactions])

  return (
    <>
      <section className="container px-4 py-10  mx-auto">
        <h1 className="text-3xl font-bold underline">Minesweeper</h1>
      </section>
      <section className="container px-4 py-5 mx-auto flex justify-center">
        <div className="grid gap-1 grid-cols-9 grid-rows-9 bg-slate-50 w-fit p-1 border-2 border-solid border-black">
          <DisplayBoard gameBoard={gameBoard} interactions={interactions} handleClick={handleClick} />
        </div>
      </section>
      <section className="container px-4 py-2 mx-auto">
        <p className="py-2">{gameOver && "Game Over" || gameOver && gameComplete && "Game Complete"}</p>
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleReset}>Reset</button>
      </section>
      <section className="container px-4 py-2 pb-5 mx-auto">
        <p className="pb-4">Click to reveal what's behind each square</p>
        <p className="pb-4">If it's an <strong>X</strong> - Game Over</p>
        <p className="pb-4">Use the numbers to figure out where the nearby <strong>X</strong>'s are (vertically, horizontally and diagonally)</p>
        <p className="pb-4">Place a marker (use ctrl + click, or right click) when you find an <strong>X</strong></p>
        <p>The goal is to mark or reveal all the squares.</p>
      </section>
    </>
  )
}

export default App
