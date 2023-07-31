let myToken = sessionStorage.getItem("token");


if (myToken !== null && myToken !== "") {
  const logout = document.querySelector(".login-out");
  logout.setAttribute("href", "index.html")
  logout.innerText = "logout";
  logoutBtn(logout);

}

function logoutBtn(logout) {
  logout.addEventListener("click", function () {
    myToken = "";
    sessionStorage.setItem("token", myToken);
    
  });
}
