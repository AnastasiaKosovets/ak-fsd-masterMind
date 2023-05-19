
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
choose.innerHTML = `Hola ${playerNAme}, escoge tus colores`;

// ------------------------pruebas 

// const screenLevel1 = () => {´
//     let player = document.getElementById("name").value;
//     window.location.href = "../colors/level.html";
// }

// const screenLevel2 = () => {
//     document.getElementById("secondColorsLine").classList.remove("secondLineC");
// }

// const screenLevel3 = () => {
//     document.getElementById("firstColorsLine").classList.remove("firstLineColors");
// }



// const screenLevel1 = () => {
//     let levelOn = document.getElementById("beginner").value;
//     let color1 = document.getElementById("firstColors").value;

//     if(levelOn === "beginner") {
//         sessionStorage.setItem("levelIs", levelOn);
//         window.location.href = "../pages/colors.html"

//     }
// }


// const screenLevel = () => {
//     if()
//     let levelOn = document.getElementById("beginner").value;
//     sessionStorage.setItem("levelIs", levelOn);
//     window.location.href = "../pages/colors.html"
// }
// const screenLevel = () => {
//     window.location.href = "../pages/colors.html"
// }


