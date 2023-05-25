// funcion que genera la combina

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

// Este es el contenedor donde se van a agregar los colores en el HTML.
let myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");
let colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));

//Aquí creamos un array de todos los valores de ese objeto

let colors = Object.values(colorsFromLocalStorage);

// con los colores disponibles creamos el hueco con su html correspondiente

colors.map((color, index) => {
    let selectedColor = document.createElement("div");
    selectedColor.classList.add("circleC-myColor");
    selectedColor.id = "selectedColorsOfPicker" + index;
    selectedColor.style.backgroundColor = color;
    myColorsForPlayElement.appendChild(selectedColor);
});



// pruebas combinacion secreta

let randomColors = [];

const secretAnswerColor = () => {

    let transformToArrayColors = Object.values(colorsFromLocalStorage);

    for( let i = 0; i < transformToArrayColors.length; i++){
        let randomMethod = Math.floor(Math.random() * (transformToArrayColors.length));
        randomColors.push(transformToArrayColors[randomMethod]);
    }
}
secretAnswerColor();
console.log(randomColors);





  