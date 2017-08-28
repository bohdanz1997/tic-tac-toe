import { convertations, config } from './config';
import Game from './game';

export default class
{
    constructor(canvas)
    {
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "25px serif";

        this.game = new Game(this.handleGameEnd.bind(this));

        this.gameResultMessage = '';
        this.isPlaying = true;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

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
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
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

        if (this.ctx.offsetParent) {
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
};