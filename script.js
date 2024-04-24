//etiquetas y se le asigna el 2d
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//botones como herramientas
const toolBtns = document.querySelectorAll(".tool");
const sizeSlider = document.querySelector("#size-slider");
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");

//Variables para realizar dibujos
let prevMouseX, prevMouseY, snapshot,
dibujando = false,
selectedTool = "pincel",
brushWidth = 3,
selectedColor = "#000";

//Variable para el color del lienzo
const setCanvasBackground = () => {
    ctx.fillStyle = "#f0f8ff"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

//Variable para el trazo del dibujo
const iniciarDibujo = (e) => {
    dibujando = true;
    prevMouseX = e.offsetX; 
    prevMouseY = e.offsetY;
    ctx.lineCap = 'round'
    ctx.beginPath(); 
    ctx.lineWidth = pincelWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

//Variable para seleccionar hacer el dibujo dependiendo de la herramienta
const dibujar = (e) => {
    if(!dibujando) return;
    ctx.putImageData(snapshot, 0, 0);

    if(selectedTool === "pincel" || selectedTool === "borra") {
        ctx.strokeStyle = selectedTool === "borra" ? "#f0f8ff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); 
    } else {
        drawTriangle(e);
    }
}

//evento para cambiar la herramienta  
toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { 
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

//evento donde se cambia el tamano del pincel o la borra
sizeSlider.addEventListener("change", () => pincelWidth = sizeSlider.value); 

//evento para los botones de los colores
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { 
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

//evento para el color predeterminado
colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

//inicio y fin del dibujo
canvas.addEventListener("mousedown", iniciarDibujo);
canvas.addEventListener("mousemove", dibujar);
canvas.addEventListener("mouseup", () => dibujando = false);
