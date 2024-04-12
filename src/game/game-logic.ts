export function generateGameField(cellCount: any, memoryCount: any) {
    const cellsIndexes = [...Array(cellCount * cellCount)].map((_, i) => i);
    const field = [...cellsIndexes].fill(1);
    const hiddenCells = [];

    for (let i = 0; i < memoryCount; i++) {
        const rNum = Math.floor(Math.random() * cellsIndexes.length);
        const toChange = cellsIndexes.splice(rNum, 1).pop();

        hiddenCells.push(toChange);
        field[toChange] = 2;
    }

    return {
        field,
        hiddenCells,
    };
}
