import { state } from './config';

export default class
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
};