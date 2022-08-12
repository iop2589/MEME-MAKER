const canvas = document.querySelector("canvas");
const modeBtn = document.querySelector("#mode-btn");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const destroyBtn = document.querySelector("#destroyBtn");
const eraseBtn = document.querySelector("#eraseBtn");
const colorOption = Array.from(
    document.getElementsByClassName("color-option")
);
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

let isFilling = false;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

let isPainting = false;

function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown () {
    isPainting = true;
}

function cancelPaintings () {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange (event) {
    ctx.lineWidth = event.target.value;
}
 
function onColorChange (event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick (event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeChange (event) {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick (event) {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestoryClick (event) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick (event) {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPaintings);
canvas.addEventListener("mouseleave", cancelPaintings);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", onModeChange);
destroyBtn.addEventListener("click", onDestoryClick);
eraseBtn.addEventListener("click", onEraseClick);


colorOption.forEach(colorOp => colorOp.addEventListener("click", onColorClick));