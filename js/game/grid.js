import { config, state } from './config';
import Cell from './cell';

export default class
{
    constructor(n)
    {
        this.n = n;
        this.grid = [];
        this.init();
    }

    init()
    {
        for (let i = 0; i < 9; i++) {
            this.grid.push(new Cell());
        }
    }

    clear()
    {
        for (let i = 0; i < 9; i++) {
            this.grid[i].clear();
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
};