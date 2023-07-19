
const myToken = localStorage.getItem("token");

function logoutBtn (logout, myToken) {
    logout.addEventListener("click", function () {
    myToken = "";
    localStorage.setItem("token", myToken);
})
}

if (myToken !== "") {
    console.log("connecté", myToken)
    const logout = document.querySelector(".login-out")
    logout.innerText = "logout";
    logoutBtn(logout, myToken);
} else {
    console.log("non connecté", myToken)
}

