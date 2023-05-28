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
        // Clonamos y reemplazamos los squares de la fila para quitarles el eventListener
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

        // if (currentRow){
        //     console.log(currentRow);
        //     let  nextSquareElements = nextFill.querySelectorAll(".squareR");
        //     nextSquareElements.forEach(square => {
        //         square.style.backgroundColor = "transparent";
        //     });
        //     nextFill.addEventListener("click", checkMyAnswer);

        //     } else {
        //         console.log("se acabo!!!!!");
        //     }
        }
    };








// // new board style

// let containerR = document.getElementById("containerR");

// const createMyFills = (numRows) => {

//     for (let i = 0; i < numRows; i++) {
//      let fila = document.createElement("div");
//      fila.className = "fila";
//      fila.classList.add("fila-" + 1);
 
//      for (let x = 0; x < 4; x++) {
 
//          let squareR = document.createElement("div");
//          squareR.className = "squareR";
//          fila.appendChild(squareR);
//      }
 
//      let grid = document.createElement("div");
//      grid.className = "grid";
//      fila.appendChild(grid);
 
//      for (let x = 0; x < 4; x++) {
 
//          let gridItem = document.createElement("div");
//          gridItem.className = "grid-item";
//          grid.appendChild(gridItem)
 
//      }
 
//      containerR.appendChild(fila);
 
//     }  
//  };

// //  Según el nivel te hace el tablero correspondiente

// let dificultad = sessionStorage.getItem("forLevel");

// if (dificultad === "beginnerRow") {
//     createMyFills(10);
// } else if (dificultad === "mediumRow") {
//     createMyFills(8);
// } else if (dificultad === "advancedRow") {
//     createMyFills(6);
// }

// //  Guardamos los colores seleccionados y pasamos a los divs

// //  Prueba de pintar cada circulo con los colores elegidos
// // let squareElements = document.querySelectorAll(".squareR");

// // Este es el contenedor donde se van a agregar los colores en el HTML.
// let myColorsForPlayElement = document.querySelector("#myColorsForPlay > div");
// let colorsFromLocalStorage = JSON.parse(sessionStorage.getItem("myColor"));

// //Aquí creamos un array de todos los valores de ese objeto
// let colors = Object.values(colorsFromLocalStorage);

// // declaro la variable gridItems patra poder recoger id y poder pintarlos en rojo cuando coincida la posicion de color
// let gridItems = document.querySelectorAll(".grid-item");

// // aquí estoy intentando bloquear las filas, para que de momento solo se pueda tranajr sobre la primera
// // utilizando el nth-child y el selector del CSS, para especificar cuales están disponibles para pintar
// const firstRowSquares = document.querySelectorAll(".fila:first-child .squareR")
// // // Con el metodo forEach y el evento click ceramos la opcion de seleccionar color del array de colores elegidos dentro de los circulos

//     firstRowSquares.forEach((square, index) => {
//         square.addEventListener("click", () => {
//             let currentColorIndex = colors.indexOf(square.style.backgroundColor);
//             let nextColorIndex = (currentColorIndex + 1) % colors.length;
//             let nextColor = colors[nextColorIndex];
//             square.style.backgroundColor = nextColor;
//         });
//     })
    
// // Creamos para los colores disponibles el hueco con su html correspondiente

// colors.map((color, index) => {

//     let selectedColor = document.createElement("div");
//     selectedColor.classList.add("circleC-myColor");
//     selectedColor.id = "selectedColorsOfPicker" + index;
//     selectedColor.style.backgroundColor = color;
//     myColorsForPlayElement.appendChild(selectedColor);
// });

// //  Segunda prueba combinación secreta

// let randomColors = [];

// const secretAnswerColor = () => {
//     let transformToArrayColors = Object.values(colorsFromLocalStorage);
//     let indexArray = [...Array(transformToArrayColors.length).keys()];
//     for (let i = 0; i < transformToArrayColors.length; i++) {

//         let randomIndex = Math.floor(Math.random() * indexArray.length);
//         let randomColorIndex = indexArray[randomIndex];
//         randomColors.push(transformToArrayColors[randomColorIndex]);
//         indexArray.splice(randomIndex, 1);
//     }
// };
// secretAnswerColor();

// // Pintamos con colores aleatorios los circulos

// document.getElementById("secretColorAnswer1").style.backgroundColor = randomColors[0];
// document.getElementById("secretColorAnswer2").style.backgroundColor = randomColors[1];
// document.getElementById("secretColorAnswer3").style.backgroundColor = randomColors[2];
// document.getElementById("secretColorAnswer4").style.backgroundColor = randomColors[3];

// // agregamos una constante
// const checkButtton = document.getElementById("checkMyVersion");
// checkButtton.addEventListener("click", () => {
//     checkMyAnswer();
// });

// // Creando const vinculado al check, para comprobar los colores elegidos con secret answer

// const checkMyAnswer = () => {

// // Aquí utilice funcion de mapeo que se aplica a cada elemento del NodeList, extrayendo el valor de background de cada elemento

//     let yourCombination = Array.from(squareElements, el => el.style.backgroundColor);
//     let matchedColors = [];
//     let matchedPosicions = [];

//     for (let i = 0; i < randomColors.length; i++) {
//         if (randomColors[i] === yourCombination[i]) {
//             // esto me sirve para los circulos blancos
//             // matchedColors.push(i);

//             // prueba para que me diga que posiciones han coincidido
//             matchedPosicions.push(i);
//             // console.log("posiciones que han coincidido:", matchedPosicions);
//         } else if (yourCombination.includes(randomColors[i])) {
//             // asi logro que me saque los colores en sí que coinciden
//             matchedColors.push(i);
//         }
//     }

//     //  aqui declaro que: usando la comparación anterior me pinte los circulos pequeños de color rojo
//     // si coincide la posicion y de color blanco si coincide el color en sí, utilizando el metodo includes dentro de un if..else if..else
//         gridItems.forEach((gridItem, index) => {
//             if(index < 4) {
//                 if (matchedPosicions.includes(index)) {
//                     gridItem.style.backgroundColor = "red";
//                 } else if (matchedColors.includes(index)) {
//                     gridItem.style.backgroundColor = "white";
//                 } else {
//                     gridItem.style.backgroundColor = "transparent";
//                 }
//             }
//         });

//     let correctAnswerSecretChoise = Array.from(firstRowSquares, (el) => el.style.backgroundColor);
    
//         if (JSON.stringify(correctAnswerSecretChoise) === JSON.stringify(randomColors)) {
//             // console.log("has acertado con los colores");
//             window.location.href = "./winner.html"
//         } else {
//             // const rowCurrentPosicion = document.querySelector(".fila:not(.unlocked");
//             // if (rowCurrentPosicion) {
//             //     rowCurrentPosicion.classList.add("unlocked");
//             //     const nextRowFills = rowCurrentPosicion.nextElementSibling.querySelectorAll(".squareR");
//             //     const nextRowSquares = Array.from(nextRowFills);
//             //     nextRowSquares.forEach((square) => {
//             //         square.addEventListener("click", () => {
//             //             let currentColorIndex = colors.indexOf(square.style.backgroundColor);
//             //             let nextColorIndex = (currentColorIndex + 1) % colors.length;
//             //             let nextColor = colors[nextColorIndex];
//             //             square.style.backgroundColor = nextColor;
//             //         });
//             //     });
//             // }
//         }
// };
// checkMyAnswer();
