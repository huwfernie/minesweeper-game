type tBoard = string[];

export function generateGameBoard(): tBoard {
    const blankBoard = generateBoard();
    const mineBoard = populateMines(blankBoard);
    const gameBoard = mapValuesToNumbers(mineBoard);
    return gameBoard;
}

export function generateBoard(): tBoard {
    const gridSize = 9;
    const ar = [];
    for(let y = gridSize; y >= 1; y--) {
        for (let x = 1; x <= gridSize; x++) {
            ar.push(`${x}_${y}_val`);
        }
    }
    return ar;
}

export function populateMines(board: tBoard): tBoard {
    return board.map((el) => {
        const isMineHere = Math.random() > 0.9 ? true : false;
        if (isMineHere) {
            return el.replace('val', 'X');
        } else {
            return el;
        }
    })
}

export function mapValuesToNumbers(board: tBoard): tBoard {
    return board.map((el) => {
        const [_x,_y,val] = el.split("_");
        const x = parseInt(_x);
        const y = parseInt(_y);

        if (val === "X") {
            return el;
        } else {
            const n = `${x}_${y+1}_X`;
            const ne = `${x+1}_${y+1}_X`;
            const e = `${x+1}_${y}_X`;
            const se = `${x+1}_${y-1}_X`;
            const s = `${x}_${y-1}_X`;
            const sw = `${x-1}_${y-1}_X`;
            const w = `${x-1}_${y}_X`;
            const nw = `${x-1}_${y+1}_X`;
    
            let total = 0;
            [n,ne,e,se,s,sw,w, nw].forEach((item) => {                
                total = board.includes(item) ? total + 1 : total;
            })
            
            return `${x}_${y}_${total}`;
        }
    })
}