let myToken = sessionStorage.getItem("token");
let estConnecte = sessionStorage.getItem("connecte");

if (myToken !== null && myToken !== "") {
  const logout = document.querySelector(".login-out");
  logout.setAttribute("href", "index.html")
  logout.innerText = "logout";
  logoutBtn(logout);

}

function logoutBtn(logout) {
  logout.addEventListener("click", function () {
    myToken = "";
    estConnecte = false;
    sessionStorage.setItem("token", myToken);
    sessionStorage.setItem("connecte", estConnecte);
    
  });
}
