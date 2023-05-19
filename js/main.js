
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

// const screenLevel = () => {
//     window.location.href = "../pages/colors.html"
// }


