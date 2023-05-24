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





  