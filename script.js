
const main = document.querySelector(".main");

const gridContainer = document.querySelector(".grid");
const slider = document.querySelector("#slider");
const gridDisplay = document.querySelector("#getGridSize");
const colorInput = document.querySelector("#color-input");

let isDrawing = false;

let currentColor = colorInput.value;

let currentMode = "color";

slider.addEventListener('input', (e) => {
    createGrid(e.target.value);
    gridDisplay.textContent = `${e.target.value} x ${e.target.value}`;
})

function createGrid(size) {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gridContainer.appendChild(cell);
    }
    console.log(size * size);
}

createGrid(slider.value);

function clearGrid() {
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach((cell) => {
        cell.style.backgroundColor = "rgb(221, 219, 218)";
    })
};

gridDisplay.textContent = `${slider.value} x ${slider.value}`;

gridContainer.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('cell')) {
        isDrawing = true;
        // event.target.style.backgroundColor = `${currentColor}`; // Change the color to black (or any desired color)
        draw(event);
    } 
});

window.addEventListener('mouseup', () => {
    isDrawing = false;
});

gridContainer.addEventListener('mouseover', (event) => {
    if (isDrawing && event.target.classList.contains('cell')) {
        //event.target.style.backgroundColor = `${currentColor}`; // Change the color to black (or any desired color)
        draw(event);
    }
});
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = '100%';
    const lightness = '50%';
    return `hsl(${hue}, ${saturation}, ${lightness})`;
}

function draw(event) {
    if(currentMode === "color") {
        event.target.style.backgroundColor = `${currentColor}`;
    }
    else if(currentMode === "eraser") {
        event.target.style.backgroundColor = "rgb(221, 219, 218)";
    }
    else 
        event.target.style.backgroundColor = getRandomColor();
        //event.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    
}

const clearBtn = document.querySelector("#clear-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const colorBtn = document.querySelector("#color-btn");
colorBtn.style.backgroundColor = currentColor;
const eraserBtn = document.querySelector("#eraser-btn");



clearBtn.addEventListener('click', () => {
    clearGrid();
});

colorInput.addEventListener("input", (e) => {
    currentColor = e.target.value;
    if(colorBtn.classList.contains("active")) {
        colorBtn.style.backgroundColor = currentColor;
    }
    
});



rainbowBtn.addEventListener("click", () => {
    rainbowBtn.classList.add("active", "rainbow");
    colorBtn.classList.remove("active");
    eraserBtn.classList.remove("active");
    colorBtn.style.backgroundColor = "#737374";
    currentMode = "rainbow";
});

colorBtn.addEventListener("click", () => {
    colorBtn.classList.add("active");
    colorBtn.style.backgroundColor = currentColor;
    rainbowBtn.classList.remove("active", "rainbow");
    eraserBtn.classList.remove("active");
    currentMode = "color";
});

eraserBtn.addEventListener("click", () => {
    eraserBtn.classList.add("active");
    rainbowBtn.classList.remove("active", "rainbow");
    colorBtn.classList.remove("active");
    colorBtn.style.backgroundColor = "#737374";
    currentMode = "eraser";
});
