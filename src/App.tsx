import { useEffect, useState } from 'react';
import { generateGameBoard } from './helpers/board';
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

  useEffect(() => {
    const board = generateGameBoard();
    setGameBoard(board);
  }, [])

  // TEST FOR GAME OVER ON EACH INTERACTION UPDATE
  useEffect(() => {
    if (gameBoard !== null) {
      interactions.forEach((item) => {
        const test = gameBoard.includes(item.replace('OPEN', 'X'));
        if (test) {
          setGameOver(true);
        }
      })
    }
  }, [gameBoard, interactions])

  // TEST FOR GAME WIN ON EACH INTERACTION UPDATE
  useEffect(() => {
    if (interactions.length === 81) {
      setGameComplete(true);
    }
  }, [interactions])

  return (
    <>
      <section className="container px-4">
        <h1 className="text-3xl font-bold underline">Minesweeper</h1>
      </section>
      <section className="container px-4">
        <div className="grid gap-1 grid-cols-9 grid-rows-9 bg-slate-50 w-fit p-1 border-2 border-solid border-black">
          <DisplayBoard gameBoard={gameBoard} interactions={interactions} handleClick={handleClick} />
        </div>
      </section>
      <section className="game-over">
        <p>{gameOver && "Game Over" || " "}</p>
      </section>
      <section className="game-complete">
        <p>{gameComplete && "Game Complete" || " "}</p>
      </section>
      <section className="instructions">
        <p>Minesweeper has a 9x9 grid of squares, behind each square could be a bomb, click to reveal a square - inside you will find the number of bombs that square touches (vertically, horizontally and diagonally).</p>
        <p>When you know where a mine is, place a flag (use ctrl + click, or right click)</p>
        <p>The goal is to reveal, or MARK all the squares in the grid.</p>
      </section>
    </>
  )
}

export default App
