

// new board style
let containerR = document.getElementById("containerR");
let filaNumber = 0;
let currentRow = 0;

const createMyFills = (numRows) => {
    for (let i = 0; i < numRows; i++) {
        let fila = document.createElement("div");
        fila.className = "fila";
        // añadir id y despues llamarlo y añadir listener, si cae en error la respuesta añadit id ++
        fila.id = "fila-" + i;

        for (let x = 0; x < 4; x++) {
            let squareR = document.createElement("div");
            squareR.className = "squareR";
            
            fila.appendChild(squareR);
        }

        let grid = document.createElement("div");
        grid.className = "grid";
        fila.appendChild(grid);

        for (let x = 0; x < 4; x++) {
            let gridItem = document.createElement("div");
            gridItem.className = "grid-item";
            grid.appendChild(gridItem);
        }
        containerR.appendChild(fila);
    }
};

// Según el nivel se crea el tablero correspondiente
let dificultad = sessionStorage.getItem("forLevel");

if (dificultad === "beginnerRow") {
    createMyFills(10);
} else if (dificultad === "mediumRow") {
    createMyFills(8);
} else if (dificultad === "advancedRow") {
    createMyFills(6);
}

// Guardamos los colores seleccionados y los agregamos a los divs
// intentar poner click en todos y ver que hace
let squareElements = document.querySelectorAll(".squareR");
let myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");
let colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));
let colors = Object.values(colorsFromLocalStorage);
let gridItems = document.querySelectorAll(".grid-item");

// revisar si esta bien declarado el click, por que quiero que me funcione en cada linea
const firstRowSquares = document.querySelectorAll(".fila:first-child .squareR");

firstRowSquares.forEach((square, index) => {
    square.addEventListener("click", () => {
        let filaID = square.parentNode.id;
        let filaNumber = parseInt(filaID.split("-")[1]);

        let currentColorIndex = colors.indexOf(square.style.backgroundColor);
        let nextColorIndex = (currentColorIndex + 1) % colors.length;
        let nextColor = colors[nextColorIndex];
        square.style.backgroundColor = nextColor;

        if (nextColorIndex === 0) {
            // aqui intento pasar a la siguiente fila
            let nextFillId = "fila-" + (filaNumber + 1);
            let nextFilaSquare = document.querySelectorAll("#" + nextFillId + " .squareR");
            nextFilaSquare[0].click();
        }
    });
});
// firstRowSquares.forEach((square, index) => {
//     square.addEventListener("click", () => {
//         let currentColorIndex = colors.indexOf(square.style.backgroundColor);
//         let nextColorIndex = (currentColorIndex + 1) % colors.length;
//         let nextColor = colors[nextColorIndex];
//         square.style.backgroundColor = nextColor;
//     });
// });

colors.map((color, index) => {
    let selectedColor = document.createElement("div");
    selectedColor.classList.add("circleC-myColor");
    selectedColor.id = "selectedColorsOfPicker" + index;
    selectedColor.style.backgroundColor = color;
    myColorsForPlayElement.appendChild(selectedColor);
});

// Generamos la combinación secreta de colores
let randomColors = [];

const secretAnswerColor = () => {
    let transformToArrayColors = Object.values(colorsFromLocalStorage);
    let indexArray = [...Array(transformToArrayColors.length).keys()];
    for (let i = 0; i < transformToArrayColors.length; i++) {
        let randomIndex = Math.floor(Math.random() * indexArray.length);
        let randomColorIndex = indexArray[randomIndex];
        randomColors.push(transformToArrayColors[randomColorIndex]);
        indexArray.splice(randomIndex, 1);
    }
};

secretAnswerColor();

document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];

const checkMyAnswer = () => {
    let yourCombination = Array.from(squareElements, (el) => el.style.backgroundColor);
    let matchedColors = [];
    let matchedPositions = [];

    for (let i = 0; i < randomColors.length; i++) {
        if (randomColors[i] === yourCombination[i]) {
            matchedPositions.push(i);
        } else if (yourCombination.includes(randomColors[i])) {
            matchedColors.push(i);
        }
    }

    gridItems.forEach((gridItem, index) => {
        if (index < 4) {
            if (matchedPositions.includes(index)) {
                gridItem.style.backgroundColor = "red";
            } else if (matchedColors.includes(index)) {
                gridItem.style.backgroundColor = "white";
            } else {
                gridItem.style.backgroundColor = "transparent";
            }
        }
    });

    let correctAnswerSecretChoice = Array.from(firstRowSquares, (el) => el.style.backgroundColor);

    if (JSON.stringify(correctAnswerSecretChoice) === JSON.stringify(randomColors)) {
        window.location.href = "./winner.html";
    } else {
        currentRow++;
        // console.log(currentRow);
        if (currentRow < filaNumber){
            let nextFill = document.getElementById(`fila${currentRow}`);
            console.log(currentRow);
            let  nextSquareElements = nextFill.querySelectorAll(".squareR");
            nextSquareElements.forEach(square => {
                square.style.backgroundColor = "transparent";
            });
            nextFill.addEventListener("click", checkMyAnswer);

            } else {
                console.log("se acabo!!!!!");
            }
        }
    };

