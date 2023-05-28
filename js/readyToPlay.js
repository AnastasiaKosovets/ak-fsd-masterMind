// new board style
let containerR = document.getElementById("containerR");

// define id for each row for better work with them
let rowCounter = 1;

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
    grid.appendChild(gridItem);
  }
  rowCounter += 1;
  containerR.appendChild(fila);
};
//  Depends of level I create dinamic board from js
let difficulty = sessionStorage.getItem("forLevel");
if (difficulty === "beginnerRow") {
  for (let i = 0; i < 10; i++) {
    createMyFills();
  }
} else if (difficulty === "mediumRow") {
  for (let i = 0; i < 8; i++) {
    createMyFills();
  }
} else if (difficulty === "advancedRow") {
  for (let i = 0; i < 6; i++) {
    createMyFills();
  }
}

// Rescute value from sessionStorage for colors
const colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));
console.log(
  "Estos son los colores que devuelve el sessionStorage:",
  colorsFromLocalStorage
);

// Here I create an array of values of this object
const colors = Object.values(colorsFromLocalStorage);

// This is container where will be saved coolors in HTML 
const myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");

// For created colors we make space with their HTML
colors.map((color, index) => {
  const selectedColor = document.createElement("div");
  selectedColor.classList.add("circleC-myColor");
  selectedColor.id = "selectedColorsOfPicker" + index;
  selectedColor.style.backgroundColor = color;
  myColorsForPlayElement.appendChild(selectedColor);
});

// Generate random answer colors
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

// Paint circles with random colors
document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];

// try to blocked rows and work with them one-by-one
const firstRowSquares = document.querySelectorAll(".fila:first-child .squareR");

// With the forEach method and the click event we create the option to select color from the array of colors chosen within the circles.
firstRowSquares.forEach((square) => {
  square.addEventListener("click", () => {
    let currentColorIndex = colors.indexOf(square.style.backgroundColor);
    let nextColorIndex = (currentColorIndex + 1) % colors.length;
    let nextColor = colors[nextColorIndex];
    square.style.backgroundColor = nextColor;
  });
});

// Start verification of the answer colors with random answer colors

let currentRow = 1;


const checkMyAnswer = () => {

    // Here use mapping function that is applied to each element of the NodeList, extracting the background value of each element
    let squareElements = document.querySelectorAll(`#fila-${currentRow} .squareR`);
    let yourCombination = Array.from(squareElements, (el) => el.style.backgroundColor);
    let matchedColors = [];
    let matchedPositions = [];

    for (let i = 0; i < randomColors.length; i++) {
        if (randomColors[i] === yourCombination[i]) {
            // This shows which position is the same
            matchedPositions.push(i);
        } else if (yourCombination.includes(randomColors[i])) {
            // This shows with colors are the same
            matchedColors.push(i);
        }
    }

    // // here I declare that: using the above comparison I will paint the small circles red if the position matches and white
    //  if the color itself matches, using the method includes inside an if..else if..else
    let gridItems = document.querySelectorAll(`#fila-${currentRow} .grid-item`);
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

    let correctAnswerSecretChoice = Array.from(squareElements, (el) => el.style.backgroundColor);

    if (JSON.stringify(correctAnswerSecretChoice) == JSON.stringify(randomColors)) {
        window.location.href = "./winner.html";
    } else {
        // Here I clone and change squares of th row to change eventListener 
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

        if (difficulty === "beginnerRow" && currentRow > 10) {
            window.location.href ="./game.html";
        } else if (difficulty === "mediumRow" && currentRow > 8) {
            window.location.href = "./game.html"
        } else if (difficulty === "advancedRow" && currentRow > 6) {
            window.location.href = "./game.html"
        }
        }
    };
