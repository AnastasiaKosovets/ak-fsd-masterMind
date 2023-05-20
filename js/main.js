// --------------- color picker

window.addEventListener("load", startup, false);

let colorPicker = document.getElementsByClassName("colorpicker");
let arrayColorPicker = Array.from(colorPicker);
let arrayChosenColours = [];

function startup(event) {
    arrayColorPicker.map(
        (element) => {
            element.value = "#FEA1A1";
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
//     window.location.href = "./game.html";
// }


const screenLevel1 = () => {
    sessionStorage.setItem("forLevel", "hello1");
    window.location.href = "./colors.html";
}

const screenLevel2 = () => {
    sessionStorage.setItem("forLevel", "hello2");
    window.location.href = "./colors.html";
}
const screenLevel3 = () => {
    sessionStorage.setItem("forLevel", "hello3");
    window.location.href = "./colors.html";
}

let selectThisLevel = sessionStorage.getItem("forLevel");
let selectRes = document.getElementById(selectThisLevel);

window.onload = (event) => {
    selectRes.style.display = "flex";
};


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

// ------------------------ trying save annd change screen of the levels





// const screenLevel2 = () => {
//     sessionStorage.setItem("forLevel", "hello2");
//     window.location.href = "./colors.html";
// }

// const screenLevel3 = () => {
//     sessionStorage.setItem("forLevel", "hello3");
//     window.location.href = "./colors.html";
// }
// window.onload = (event) => {
//     let selectThisLevel = sessionStorage.getItem("forLevel");
//     let levelRes = document.getElementById(selectThisLevel);
//     levelRes.style.display = "flex";
// }



