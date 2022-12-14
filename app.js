const canvas = document.querySelector("canvas");
const modeBtn = document.querySelector("#mode-btn");
const ctx = canvas.getContext("2d");
const saveBtn = document.querySelector("#save");
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const destroyBtn = document.querySelector("#destroyBtn");
const eraseBtn = document.querySelector("#eraseBtn");
const inputText = document.querySelector("inputText");
const colorOption = Array.from(
    document.getElementsByClassName("color-option")
);
const fileInput = document.querySelector("#file");
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const fontSize = document.querySelector("#fontSize");
const fonts = document.querySelector("#fontList");
const fontList = ["caption", "italic", "Tahoma"];


let isFilling = false;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

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

function onFileChange (event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}

function onSaveButtonClick (event) {
    const url = canvas.toDataURL ();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

function onLoadDocument () {
    onLoadFontList();
    onLoadFontSize();
}

function onLoadFontList () {
    fontList.forEach(font => {
        let option = document.createElement("option");
        option.value = font;
        option.innerText = font;
        fonts.options.add(option);
    });
}

function onLoadFontSize() {
    for (var i = 1; i <= 10; i++) {
        let option = document.createElement("option");
        option.value = i * 10;
        option.innerText = i * 10;
        fontSize.options.add(option);
    }
}

function onChangeFontSize () {
    ctx.font = `${fontSize.value}px ${fonts.value}`;
}

function onChangeFont () {
    ctx.font = `${fontSize.value}px ${fonts.value}`;
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPaintings);
canvas.addEventListener("mouseleave", cancelPaintings);
canvas.addEventListener("click", onCanvasClick);
document.addEventListener("DOMContentLoaded", onLoadDocument);
fontSize.addEventListener("change", onChangeFontSize);
fonts.addEventListener("change", onChangeFont);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", onModeChange);
destroyBtn.addEventListener("click", onDestoryClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveButtonClick);


colorOption.forEach(colorOp => colorOp.addEventListener("click", onColorClick));