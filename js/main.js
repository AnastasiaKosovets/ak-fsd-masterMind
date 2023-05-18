
const savePlayerName = () => {

    let player = document.getElementById("name").value;
    sessionStorage.setItem("playerNameIs", player);
    savePlayerName.innerHTML += "player";
}


