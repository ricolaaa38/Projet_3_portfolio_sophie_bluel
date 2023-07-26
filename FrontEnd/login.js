let connecte = true;

async function getUser() {
  let users = {
    email: document.getElementById("emailLogin").value,
    password: document.getElementById("passwordLogin").value,
  };
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(users),
  });

  if (response.ok === true) {
    let result = await response.json();
    let token = result.token;
    window.location.href = "index.html";
    console.log(result);
    sessionStorage.setItem("token", token);
    connecte = true;
    sessionStorage.setItem("connecte", connecte);
  } else {
    afficherMessageErreur();
    console.log("une erreur c'est produite");
  }
}

function afficherMessageErreur() {
  let spanErreurMessage = document.getElementById("erreurMessage");

  if (!spanErreurMessage) {
    let popup = document.querySelector(".message");
    spanErreurMessage = document.createElement("span");
    spanErreurMessage.id = "erreurMessage";

    popup.append(spanErreurMessage);
  }

  spanErreurMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
}

const formLogin = document.querySelector(".formulaire-login");
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  getUser();
});
