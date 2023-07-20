let myToken = sessionStorage.getItem("token");
let estConnecte = sessionStorage.getItem("connecte");



if (myToken !== null && myToken !== "") {
    console.log("connecté", myToken)
    const logout = document.querySelector(".login-out")
    logout.innerText = "logout";
    logoutBtn(logout);
    console.log(estConnecte)
} else {
    console.log("non connecté", myToken)
    console.log(estConnecte)
}


function logoutBtn (logout) {
    logout.addEventListener("click", function () {
        myToken = "";
        estConnecte = false
        sessionStorage.setItem("token", myToken);
        sessionStorage.setItem("connecte", estConnecte);
})
}