// Color picker

window.addEventListener("load", startup, false);

let picker = document.getElementsByClassName("picker");
let arraypicker = Array.from(picker);
let arrayMyColor = {};

// Will call our function after the page will onload
function startup(event) {
    arraypicker.map(
        (element) => {
            element.value = "#FEA1A1";
            // This part add color after you choose it 
            element.addEventListener("input", (event) => updateColor(event, element), false);
            element.select();
        }
    )
}

// This part change the aquare with selected color and save it in object arrayMyColor
const updateColor = (event, element) => {
    let colorSquare = document.getElementById(`square${element.id}`);
    colorSquare.style.backgroundColor = event.target.value;
    let color = getComputedStyle(colorSquare).backgroundColor;
    arrayMyColor[element.id] = color;
}

// This function save choosen color to better work with them like in array for game part
const saveMyColor = () => {
    sessionStorage.setItem("myColor", JSON.stringify(arrayMyColor));
    window.location.href = "./readyToPlay.html";
}

let myColor = JSON.parse(sessionStorage.getItem("myColor"));
let transformToArrayColors = [];

let startColorsTransform = () => {
    for (const property in myColor) {
        transformToArrayColors.push(myColor[property]);
    }
}
startColorsTransform();

// Function that save and change screen to Game Board

const screenBeginnerBoard = () => {
    sessionStorage.setItem("forBoard", "beginnerBoard");
    window.location.href = "./readyToPlay.html";
    difficulty = "screenBeginnerBoard";

};

const screenMediumBoard = () => {
    sessionStorage.setItem("forBoard", "mediumBoard");
    window.location.href = "./readyToPlay.html";
    difficulty = "screenMediumBoard";
}

const screenAdvancedBoard = () => {
    sessionStorage.setItem("forBoard", "advancedBoard"),
        window.location.href = "./readyToPlay.html";
    difficulty = "screenAdvancedBoard";
};

// Function that save and change screen of the levels

const screenLevel1 = () => {
    sessionStorage.setItem("forLevel", "beginnerRow");
    window.location.href = "./colors.html";
}

const screenLevel2 = () => {
    sessionStorage.setItem("forLevel", "mediumRow");
    window.location.href = "./colors.html";
}
const screenLevel3 = () => {
    sessionStorage.setItem("forLevel", "advancedRow");
    window.location.href = "./colors.html";
}

let selectThisLevel = sessionStorage.getItem("forLevel");
let selectRes = document.getElementById(selectThisLevel);

if (selectRes) {
    selectRes.style.display = "flex";
}

// Here we save to sessionStorage gamer Name

const savePlayerName = () => {

    let player = document.getElementById("name").value;
    if (player != "" && player != null) {
        sessionStorage.setItem("playerNameIs", player);
        window.location.href = "../pages/level.html";
    } else {
        // addd popUp if the input name it´s empty
        let inputName = document.querySelector(".inputName");
        let popUp = document.createElement("div");
        popUp.className = "popUp col-4 col-md-6";
        popUp.textContent = "Nombre obligatorio!";
        inputName.parentNode.appendChild(popUp);
        popUp.classList.add("popUp-center");

        // add setTimeOut for inputTime, dessapear after 2s
        setTimeout(() => {
            popUp.remove();
        }, 2000);
    }
}

// Create variable to get gamer Name and put it in the next page
let choose = document.getElementById("chooseColors");
let playerNAme = sessionStorage.getItem("playerNameIs");
choose.innerHTML = `Hola ${playerNAme}, escoge un nivel`;

