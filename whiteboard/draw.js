var cuadro = document.getElementById("canvas");
var papel = cuadro.getContext("2d");
var xMouse, yMouse;
var mouseState;
var size;
var color = "black";
var colorErase = "white";
var currentTool = "pencil";
var colorSelected;
var cont = 0;

var btnSave = document.getElementById("btnSave");
var btnPencil = document.getElementById("btnDibujar");
var btnEraser = document.getElementById("btnBorrar");


btnPencil.addEventListener("click", pencilSelected);
btnEraser.addEventListener("click", eraserSelected);
btnSave.addEventListener("click", saveArt);

function saveArt() {
    var imagen = cuadro.toDataURL();
    var link = document.createElement("a");
    link.href = imagen;
    link.download = ("sketch"+cont);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    cont++;
}

function eraserSelected(event) {
    currentTool = "eraser";
    console.log("entra a la funcion eraserSelected");
}

function pencilSelected(event) {
    currentTool = "pencil";
    cuadro.addEventListener("mousedown", presionar);
    cuadro.addEventListener("mousemove", dibujar);
    cuadro.addEventListener("mouseup", soltar);
    console.log("entra a la funcion pencilSelected");
}

function get_color(c) {
    color = c;
    var icono = document.querySelector(".tools .pencil")
    icono.style.color = color;
}

function presionar(event) {
    mouseState = true;
    xMouse = event.offsetX;
    yMouse = event.offsetY;
    console.log("se presiona el mouse");
}

function dibujar(event) {
    if (mouseState) {
        if (currentTool === "pencil") {
            console.log("entra a dibujar, deberia dibujar normal");
            drawCanvas(color, 5, xMouse, yMouse, event.offsetX, event.offsetY, papel);
            xMouse = event.offsetX;
            yMouse = event.offsetY;
            
        }
        else{
            console.log("entra al else, deberia de borrar");
            drawCanvas(colorErase, 10, xMouse, yMouse, event.offsetX, event.offsetY, papel);
            xMouse = event.offsetX;
            yMouse = event.offsetY;
        }
    }
}

function soltar(event) {
    mouseState = false;
}

function drawCanvas(colorSelected, size, xInicial, yInicial, xFinal, yFinal, lienzo) {
    lienzo.beginPath();
    lienzo.strokeStyle = colorSelected;
    lienzo.lineWidth = size; //permite hacer que la linea sea mas gruesa
    lienzo.lineCap = "round";
    lienzo.moveTo(xInicial, yInicial);
    lienzo.lineTo(xFinal, yFinal);
    lienzo.stroke();
    lienzo.closePath();
}