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

const screenLevel1 = () => {
    sessionStorage.setItem("forLevel", "hello1");
    window.location.href = "./colors.html";
}

let selectThisLevel = sessionStorage.getItem("forLevel");
let selectRes = document.getElementById(selectThisLevel);

window.onload = (event) => {
    selectRes.style.display = "flex";
};

// window.onload = (event) => {
//     let selectThisLevel = sessionStorage.getItem("forLevel");
//     let levelRes = document.getElementById(selectThisLevel);
//     levelRes.style.display = "flex";
// }

