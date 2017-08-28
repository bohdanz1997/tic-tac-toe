import { state, winLines, config } from './config';
import Grid from './grid';

export default class
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
};