const config = {
    cellSize: 100,
    fieldWidth: 300,
    fieldHeight: 300,
    cellsCount: 3,
    fieldMarginX: 100,
    fieldMarginY: 100
};

const state = {
    EMPTY: '',
    X: 'X',
    O: 'O'
};

const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const convertations = [
    [0, 0], [1, 0], [2, 0],
    [0, 1], [1, 1], [2, 1],
    [0, 2], [1, 2], [2, 2]
];

export { config, state, winLines, convertations };