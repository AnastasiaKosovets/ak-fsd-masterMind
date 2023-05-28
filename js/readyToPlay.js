// new board style
let containerR = document.getElementById("containerR");

// define id for each row for better work with them
let rowCounter = 1;

const createMyFills = () => {
    let rowFil = document.createElement("div");
    rowFil.className = "rowFil";
    rowFil.id = "rowFil-" + rowCounter;

    for (let i = 0; i < 4; i++) {
        let squareR = document.createElement("div");
        squareR.className = "squareR";
        rowFil.appendChild(squareR);
    }

    let grid = document.createElement("div");
    grid.className = "grid";
    rowFil.appendChild(grid);

    for (let i = 0; i < 4; i++) {
        let gridItem = document.createElement("div");
        gridItem.className = "grid-item";
        grid.appendChild(gridItem);
    }
    rowCounter += 1;
    containerR.appendChild(rowFil);
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
    // for each color in array it creates one div
    const selectedColor = document.createElement("div");
    selectedColor.classList.add("circleC-myColor");
    selectedColor.id = "selectedColorsOfPicker" + index;
    selectedColor.style.backgroundColor = color;
    myColorsForPlayElement.appendChild(selectedColor);
});

// Generate random answer colors
let randomColors = [];

const secretAnswerColor = () => {
    // asign values of saved colors
    let transformToArrayColors = Object.values(colorsFromLocalStorage);
    //   new variable that asign arrat entire numbers in combination with keys()
    let indexArray = [...Array(transformToArrayColors.length).keys()];
    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * indexArray.length);
        let randomColorIndex = indexArray[randomIndex];
        // save the color to array with .push()
        randomColors.push(transformToArrayColors[randomColorIndex]);
        // This part permits that the same color can not be choosen
        indexArray.splice(randomIndex, 1);
    }
};

secretAnswerColor();
console.log("Colores aleatorios:", randomColors);

// Paint circles with random colors
document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];

// This part select all elements with .squareR class, that are child of first .rowFil
const firstRowSquares = document.querySelectorAll(".rowFil:first-child .squareR");

// With the forEach method and the click event we create the option to select color from the array of colors chosen within the circles.
firstRowSquares.forEach((square) => {
    square.addEventListener("click", () => {
        // This part look index of color of the aquare and compare it with colors of array colors
        let currentColorIndex = colors.indexOf(square.style.backgroundColor);
        // Calculate index of next color with %, when it get last color, the index will be reset
        let nextColorIndex = (currentColorIndex + 1) % colors.length;
        // Take the index of the previos line
        let nextColor = colors[nextColorIndex];
        // casign the color that take from style.backgroundColor
        square.style.backgroundColor = nextColor;
    });
});

// Start verification of the answer colors with random answer colors
let currentRow = 1;

const checkMyAnswer = () => {

    // Here use mapping function that is applied to each element of the NodeList, extracting the background value of each element
    let squareElements = document.querySelectorAll(`#rowFil-${currentRow} .squareR`);
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
    let gridItems = document.querySelectorAll(`#rowFil-${currentRow} .grid-item`);
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
        // Here I clone and change squares of the row to change eventListener 
        squareElements.forEach((square) => {
            // With .cloneNode(true) method I clone every sauqre and elements that containe square
            let clonedSquare = square.cloneNode(true);
            // With this method I replace origin square fot it cloned square
            square.parentNode.replaceChild(clonedSquare, square);
        })
        // This permit acces to the squatres of next row
        let nextSquareElements = document.querySelectorAll(`#rowFil-${currentRow + 1} .squareR`);
        nextSquareElements.forEach((square) => {
            square.addEventListener("click", () => {
                // Take index of actual color of the square
                let currentColorIndex = colors.indexOf(square.style.backgroundColor);
                // Calculate index of next color , it permits to control when we are in the last colot
                let nextColorIndex = (currentColorIndex + 1) % colors.length;
                let nextColor = colors[nextColorIndex];
                square.style.backgroundColor = nextColor;
            })
        })
        currentRow++;

        if (difficulty === "beginnerRow" && currentRow > 10) {
            window.location.href = "./notYourTime.html"
        } else if (difficulty === "mediumRow" && currentRow > 8) {
            window.location.href = "./notYourTime.html"
        } else if (difficulty === "advancedRow" && currentRow > 6) {
            window.location.href = "./notYourTime.html"
        }
    }
};
