import Core from './core';

(function init() {
    const canvas = document.getElementById('game');

    const core = new Core(canvas);
    canvas.addEventListener("click", e => core.onClick(e));
    canvas.addEventListener("keydown", e => core.onKeyDown(e));
}());
