import { state } from './config';

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

export default Cell;