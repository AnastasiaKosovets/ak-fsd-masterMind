// new board style
const createMyFills = () => {

let containerR = document.getElementById("container");

for (let i = 0; i < 4; i++) {
    let squareR = document.createElement("div");
    squareR.className = "squareR";
    containerR.appendChild(squareR);
}

let grid = document.createElement("div");
grid.className = "grid";
for ( let i = 0; i < 4; i++){
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    grid.appendChild(gridItem)
}
containerR.appendChild(grid);

}
createMyFills();




// beginner level == beginner board

function screenBeginnerBoard() {

    createMyFills();

    // let container = document.getElementById("container");

    // for ( let i = 0; i < 9; i++){
    //     for (let i = 0; i < 4; i++) {
    //         let squareR = document.createElement("div");
    //         squareR.className = "squareR";
    //         container.appendChild(squareR);
    //     }
    //     let grid = document.createElement("div");
    //     grid.className = "grid";
        
    //     for ( let i = 0; i < 4; i++){
    //         let gridItem = document.createElement("div");
    //         gridItem.className = "grid-item";
    //         grid.appendChild(gridItem);
    //     }
    //     container.appendChild(grid);
    // }
    // window.location.href = "./readyToPlay.html"
}
