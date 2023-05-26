// new board style

let containerR = document.getElementById("containerR");

const createMyFills = () => {

    let fila = document.createElement("div");
    fila.className = "fila";

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
    containerR.appendChild(fila);
};

//  Según el nivel te hace el tablero correspondiente

let dificultad = sessionStorage.getItem("forLevel");

if (dificultad === "beginnerRow") {
    for (let i = 0; i < 10; i++) {
        createMyFills();
    }
} else if (dificultad === "mediumRow") {
    for (let i = 0; i < 8; i++) {
        createMyFills();
    }
} else if (dificultad === "advancedRow") {
    for (let i = 0; i < 6; i++) {
        createMyFills();
    }
}

//  Guardamos los colores seleccionados y pasamos a los divs

//  Prueba de pintar cada circulo con los colores elegidos
let squareElements = document.querySelectorAll(".squareR");

// Este es el contenedor donde se van a agregar los colores en el HTML.
let myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");
let colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));

//Aquí creamos un array de todos los valores de ese objeto
let colors = Object.values(colorsFromLocalStorage);

// declaro la variable gridItems patra poder recoger id y poder pintarlos en rojo cuando coincida la posicion de color
let gridItems = document.querySelectorAll(".grid-item");

// Con el metodo forEach y el evento click ceramos la opcion de seleccionar color del array de colores elegidos dentro de los circulos
squareElements.forEach((square, index) => {
    square.addEventListener("click", () => {
        let currentColorIndex = colors.indexOf(square.style.backgroundColor);
        let nextColorIndex = (currentColorIndex + 1) % colors.length;
        let nextColor = colors[nextColorIndex];
        square.style.backgroundColor = nextColor;

        let correctAnswerSecretChoise = Array.from(squareElements, el => el.style.backgroundColor);

        if (JSON.stringify(correctAnswerSecretChoise) === JSON.stringify(randomColors)) {
            // console.log("has acertado con los colores");
        }
    });
});

// Creamos para los colores disponibles el hueco con su html correspondiente

colors.map((color, index) => {

    let selectedColor = document.createElement("div");
    selectedColor.classList.add("circleC-myColor");
    selectedColor.id = "selectedColorsOfPicker" + index;
    selectedColor.style.backgroundColor = color;
    myColorsForPlayElement.appendChild(selectedColor);
});

//  Segunda prueba combinación secreta

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
}
secretAnswerColor();

// Pintamos con colores aleatorios los circulos

document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];

// Creando const vinculado al check, para comprobar los colores elegidos con secret answer

const checkMyAnswer = () => {

// Aquí utilice funcion de mapeo que se aplica a cada elemento del NodeList, extrayendo el valor de background de cada elemento

    let yourCombination = Array.from(squareElements, el => el.style.backgroundColor);
    let matchedColors = [];
    let matchedPosicions = [];

    for (let i = 0; i < randomColors.length; i++) {
        if (randomColors[i] === yourCombination[i]) {
            // esto me sirve para los circulos blancos
            matchedColors.push(randomColors[i]);
            
            // prueba para que me diga que posiciones han coincidido
            matchedPosicions.push(i);
            // console.log("posiciones que han coincidido:", matchedPosicions);
        }
    }

    gridItems.forEach((gridItem, index) => {
        if(matchedPosicions.includes(index)){
            gridItem.style.backgroundColor = "red";
        } else {
            gridItem.style.backgroundColor = "transparent";
        }
    });
    // console.log("colores que aparecen en array:", matchedColors);
    // console.log("posiciones que han coincidido:", matchedPosicions);


    // for (let i = 0; i < randomColors.length; i++) {
    //     if (yourCombination[i] === randomColors[i]) {
    //         console.log("has acertado");
    //     } else {
    //         console.log("has perdido");
    //     }
    // }
};
checkMyAnswer();


