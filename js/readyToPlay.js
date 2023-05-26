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

for ( let i = 0; i < 4; i++){

    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    grid.appendChild(gridItem)

} 
    containerR.appendChild(fila); 
};

//  intento de comparar con screenBeginnerBoard

let dificultad = sessionStorage.getItem("forLevel");

//  console.log(dificultad);

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

//   pruebas para guardar los colores seleccionados y pasarlos a mis divs

//  prueba de pintar cada circulo con los colores elegidos
let squareElements = document.querySelectorAll(".squareR");
// Este es el contenedor donde se van a agregar los colores en el HTML.
let myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");
let colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));

//Aquí creamos un array de todos los valores de ese objeto

let colors = Object.values(colorsFromLocalStorage);
// con el metodo forEach y el evento click ceramos la opcion de seleccionar color del array de colores elegidos dentro de los circulos
squareElements.forEach((square, index) => {
    square.addEventListener("click", () => {
        let currentColorIndex = colors.indexOf(square.style.backgroundColor);
        let nextColorIndex = (currentColorIndex + 1) % colors.length;
        let nextColor = colors[nextColorIndex];
        square.style.backgroundColor = nextColor;
    });
});

// con los colores disponibles creamos el hueco con su html correspondiente

colors.map((color, index) => {

    let selectedColor = document.createElement("div");
    selectedColor.classList.add("circleC-myColor");
    selectedColor.id = "selectedColorsOfPicker" + index;
    selectedColor.style.backgroundColor = color;
    myColorsForPlayElement.appendChild(selectedColor);
});

//  segunda prueba combinación secreta

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

// pintamos con colores aleatorios los circulos

document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];
document.getElementById("secretColorAnswer5").style.backgroundColor = randomColors[4];
document.getElementById("secretColorAnswer6").style.backgroundColor = randomColors[5];




  