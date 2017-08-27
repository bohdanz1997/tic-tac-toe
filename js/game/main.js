
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.font = "25px serif";

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

class Cell
{
    constructor()
    {
        this.data = state.EMPTY;
    }

    clear()
    {
        this.data = state.EMPTY;
    }

    setData(value)
    {
        this.data = value;
    }
}

class Grid
{
    constructor(n)
    {
        this.n = n;
        this.grid = [];
        this.clear();
    }

    clear()
    {
        for (let i = 0; i < 9; i++) {
            this.grid.push(new Cell());
        }
    }

    setCell(i, value)
    {
        this.grid[i].setData(value);
    }

    getCell(i)
    {
        return this.grid[i];
    }

    cellEmpty(i)
    {
        return this.grid[i].data === state.EMPTY;
    }

    draw(ctx)
    {
        for (let i = 0; i < 9; i++) {
            if (!this.cellEmpty(i)) {
                const x = Math.floor(i / this.n) * config.cellSize;
                const y = i % this.n * config.cellSize;
                ctx.fillText(this.grid[i].data, x + 40, y + 60);
                ctx.rect(x, y, config.cellSize, config.cellSize);
                ctx.stroke();
            }
        }

    }
}

class Game
{
    constructor(onGameEnd)
    {
        this.currentPlayer = state.X;
        this.grid = new Grid(config.cellsCount);
        this.moveCount = 0;
        this.onGameEnd = onGameEnd;
    }

    move(pos)
    {
        const prevPlayer = this.currentPlayer;

        if (this.grid.cellEmpty(pos)) {
            this.grid.setCell(pos, this.currentPlayer);
            this.moveCount++;
            this.switchPlayer();
        }

        if (this.checkForWin(prevPlayer)) {
            this.onGameEnd(`${prevPlayer} win!`);
        }

        if (this.moveCount > 8) {
            this.onGameEnd('Draw!');
        }
    }

    switchPlayer()
    {
        this.currentPlayer = this.currentPlayer === state.X
            ? state.O
            : state.X;
    }

    checkForWin(state)
    {
        for (let i = 0; i < winLines.length; i++) {
            if (this.checkLine(winLines[i], state)) {
                return true;
            }
        }

        return false;
    }

    checkLine(line, state)
    {
        for (let i = 0; i < line.length; i++) {
            const pos = line[i];

            if (this.grid.getCell(pos).data !== state) {
                return false;
            }
            if (i === config.cellsCount - 1) {
                return true;
            }
        }
    }

    draw(ctx)
    {
        this.grid.draw(ctx);
    }
}

class Core
{
    constructor(ctx)
    {
        this.ctx = ctx;
        this.game = new Game(this.handleGameEnd.bind(this));
        this.gameResultMessage = '';
        this.isPlaying = true;
        this.draw();
    }

    handleGameEnd(msg)
    {
        this.gameResultMessage = msg;
        this.isPlaying = false;
    }

    drawHud()
    {
        this.ctx.fillText('Next move: ' + this.game.currentPlayer, 330, 30);
        this.ctx.fillText(this.gameResultMessage, 330, 60);
    }

    clearContext() 
    {
        this.ctx.fillStyle="#ffffff";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.ctx.fillStyle="#888888";
        this.ctx.strokeRect(0, 0, config.fieldWidth, config.fieldHeight);

    }

    onClick(e)
    {
        if (this.isPlaying) {
            const cursorPos = this.getCursorPosition(e);

            const x = Math.floor(cursorPos.x / config.cellSize);
            const y = Math.floor(cursorPos.y / config.cellSize);

            if (this.isValidCoords(x, y)) {
                const pos = this.convertCoordsToPos(y, x);
                this.game.move(pos);
            }

            this.draw();
        }
    }

    draw()
    {
        this.clearContext();
        this.game.draw(this.ctx);
        this.drawHud();
    }

    getCursorPosition(e)
    {
        let element = this.ctx;
        let offsetX = config.fieldMarginX, 
            offsetY = config.fieldMarginY;

        if (ctx.offsetParent) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        return {
            x: e.pageX - offsetX,
            y: e.pageY - offsetY
        };
    }

    isValidCoords(x, y)
    {
        return x >= 0 && y >= 0 && x < 3 && y < 3;
    }

    convertCoordsToPos(x, y)
    {
        return convertations.findIndex((item =>
            item[0] === x && item[1] === y));
    }
}


(function init() 
{
    const core = new Core(ctx);
    canvas.addEventListener("click", (e) => core.onClick(e), false);
})();