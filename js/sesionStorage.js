// new board style

let containerR = document.getElementById("containerR");

// Put id to each row, for better work with it
let rowCounter = 1;

// with this function I creat dinamic board from js
const createMyFills = () => {

    let fila = document.createElement("div");
    fila.className = "fila";
    fila.id = "fila-" + rowCounter;  

    for (let i = 0; i < 4; i++) {
        let squareR = document.createElement("div");
        squareR.className = "squareR";
        fila.appendChild(squareR);
    }  

    let grid = document.createElement("div");
    grid.className = "grid";
    fila.appendChild(grid); 

    for (let i = 0; i < 4; i++) {
        let gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        grid.appendChild(gridItem)
    }

    rowCounter += 1;
    containerR.appendChild(fila);
 };

//  Depends of choosen level th board have different number of rows

let dificultad = sessionStorage.getItem("forLevel");

if (dificultad === "beginnerRow") {
    createMyFills(10);
} else if (dificultad === "mediumRow") {
    createMyFills(8);
} else if (dificultad === "advancedRow") {
    createMyFills(6);
}

//  Save choosen colors and add them to div
// Take value of colors previously saved
const colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));
console.log("colores de sessionStorage", colorsFromLocalStorage);

//Aquí creamos un array de todos los valores de ese objeto
const colors = Object.values(colorsFromLocalStorage);

// Este es el contenedor donde se van a agregar los colores en el HTML.
const myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");
  
// Creamos para los colores disponibles el hueco con su html correspondiente
colors.map((color, index) => {
    const selectedColor = document.createElement("div");
    selectedColor.classList.add("circleC-myColor");
    selectedColor.id = "selectedColorsOfPicker" + index;
    selectedColor.style.backgroundColor = color;
    myColorsForPlayElement.appendChild(selectedColor);
});

// Creamos la combinación secreta
let randomColors = [];

const secretAnswerColor = () => {
    let transformToArrayColors = Object.values(colorsFromLocalStorage);
    let indexArray = [...Array(transformToArrayColors.length).keys()];
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * indexArray.length);
        let randomColorIndex = indexArray[randomIndex];
        randomColors.push(transformToArrayColors[randomColorIndex]);
        indexArray.splice(randomIndex, 1);
    }
};
secretAnswerColor();

// Pintamos con colores aleatorios los circulos
document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];

// // declaro la variable gridItems patra poder recoger id y poder pintarlos en rojo cuando coincida la posicion de color
// let gridItems = document.querySelectorAll(".grid-item");

// aquí estoy intentando bloquear las filas, para que de momento solo se pueda tranajr sobre la primera
// utilizando el nth-child y el selector del CSS, para especificar cuales están disponibles para pintar
const firstRowSquares = document.querySelectorAll(".fila:first-child .squareR")
// // Con el metodo forEach y el evento click ceramos la opcion de seleccionar color del array de colores elegidos dentro de los circulos
    firstRowSquares.forEach((square, index) => {
        square.addEventListener("click", () => {
            let currentColorIndex = colors.indexOf(square.style.backgroundColor);
            let nextColorIndex = (currentColorIndex + 1) % colors.length;
            let nextColor = colors[nextColorIndex];
            square.style.backgroundColor = nextColor;
        });
    })


// Creando const vinculado al check, para comprobar los colores elegidos con secret answer
let currentRow = 1;

const checkMyAnswer = () => {

// Aquí utilice funcion de mapeo que se aplica a cada elemento del NodeList, extrayendo el valor de background de cada elemento
    let squareElements = document.querySelectorAll(`#fila-${currentRow} .squareR`);
    let yourCombination = Array.from(squareElements, el => el.style.backgroundColor);
    let matchedColors = [];
    let matchedPosicions = [];

    for (let i = 0; i < randomColors.length; i++) {
        if (randomColors[i] === yourCombination[i]) {
            // prueba para que me diga que posiciones han coincidido
            matchedPosicions.push(i);
            // console.log("posiciones que han coincidido:", matchedPosicions);
        } else if (yourCombination.includes(randomColors[i])) {
            // asi logro que me saque los colores en sí que coinciden
            matchedColors.push(i);
        }
    }
    // declaro la variable gridItems patra poder recoger id y poder pintarlos en rojo cuando coincida la posicion de color
    let gridItems = document.querySelectorAll(`#fila-${currentRow} .grid-item`);

    //  aqui declaro que: usando la comparación anterior me pinte los circulos pequeños de color rojo
    // si coincide la posicion y de color blanco si coincide el color en sí, utilizando el metodo includes dentro de un if..else if..else
    gridItems.forEach((gridItem, index) => {
            if(index < 4) {
                if (matchedPosicions.includes(index)) {
                    gridItem.style.backgroundColor = "red";
                } else if (matchedColors.includes(index)) {
                    gridItem.style.backgroundColor = "white";
                } else {
                    gridItem.style.backgroundColor = "transparent";
                }
            }
        });

    let correctAnswerSecretChoise = Array.from(firstRowSquares, (el) => el.style.backgroundColor);
    
        if (JSON.stringify(correctAnswerSecretChoise) === JSON.stringify(randomColors)) {
            // console.log("has acertado con los colores");
            window.location.href = "./winner.html"
        } else {
            // clonamos y reemplazamos los squares de la fila para quitarles el eventListener
            squareElements.forEach((square) => {
                let clonedSquare = square.cloneNode(true);
                square.parentNode.replaceChild(clonedSquare, square);
            })
            let nextSquareElements = document.querySelectorAll(`#fila-${currentRow + 1} .squareR`);
            nextSquareElements.forEach((square) => {
                square.addEventListener("click", () => {
                    let currentColorIndex = colors.indexOf(square.style.backgroundColor);
                    let nextColorIndex = (currentColorIndex + 1) % colors.length;
                    let nextColor = colors[nextColorIndex];
                    square.style.backgroundColor = nextColor;
                })
            })
            currentRow++;
        }
};
checkMyAnswer();