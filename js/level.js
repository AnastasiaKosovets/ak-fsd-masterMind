



window.addEventListener("load", startup, false);

let colorPicker = document.getElementsByClassName("colorpicker");
let arrayColorPicker = Array.from(colorPicker);
let arrayChosenColours = [];

function startup(event) {
    arrayColorPicker.map(
        (element) => {
            element.value = "#8a2be2";
            element.addEventListener("input", (event) => updateFirst(event, element), false);
            element.select();
        }
    )
}

const updateFirst = (event, element) => {
    let colorSquare = document.getElementById(`square${element.id}`);
    colorSquare.style.backgroundColor = event.target.value;
    let color = getComputedStyle(colorSquare).backgroundColor;
    arrayChosenColours[element.id] = color;
}

console.log(arrayChosenColours);

// const saveChosenColours = () => {
//     sessionStorage.setItem("chosenColours", JSON.stringify(arrayChosenColours));
//     window.location.href = "./juego.html";
// }

// Here we save to sessionStorage gamer Name

const savePlayerName = () => {

    let player = document.getElementById("name").value;
    if(player != "" && player != null){
        sessionStorage.setItem("playerNameIs", player);
        window.location.href = "../pages/level.html";
    }else {
        alert("Nombre obligatorio!!")
    } 
}

let choose = document.getElementById("chooseColors");
let playerNAme = sessionStorage.getItem("playerNameIs");
choose.innerHTML = `Hola ${playerNAme}, escoge un nivel`;