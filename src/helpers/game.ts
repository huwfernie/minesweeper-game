
export function testGameOver(interactions :string[], gameBoard: string[]): boolean {
    let result = false;
    interactions.forEach((item) => {
        const test = gameBoard.includes(item.replace('OPEN', 'X'));
        if (test) {
            result = true;
        }
    });
    return result
}

export function testGameWin(interactions :string[], gameBoard: string[]): boolean {
    const hasFinishedGuessing = interactions.length === gameBoard.length;
    const numberOfMinesInGame = gameBoard.filter((el) => el.includes('X')).length;
    const numberOfMarksPlaced = interactions.filter((el) => el.includes('MARK')).length;
    const numbersMatch = numberOfMinesInGame === numberOfMarksPlaced;
    
    return hasFinishedGuessing && numbersMatch;
}
