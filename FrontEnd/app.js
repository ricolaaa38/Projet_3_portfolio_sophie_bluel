let modal = null;
const focusableSelector = "button, a, input, textarea, select";
let focusables = [];
let previouslyFocusedElement = null;
const myToken = sessionStorage.getItem("token");

// fonction pour ouvrir la modal
const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  focusables[0].focus();
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", true);
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// fonction pour fermer la modal
const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  const hideModal = function () {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    modal = null;
  };
  modal.addEventListener("animationend", hideModal);
};

// fonction pour empecher la fermeture de la modal au click sur celle-ci
const stopPropagation = function (e) {
  e.stopPropagation();
};

// fonction pour le controle avec Tab
const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftkey === true) {
    index--;
  } else {
    index++;
    
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

// Modale 2 Ajout photo

let modal2 = null;
let focusables2 = [];

// fonction pour l'ouverture de la modal 2

const openModal2 = function (e) {
  e.preventDefault();
  modal2 = document.querySelector(e.target.getAttribute("href"));
  focusables2 = Array.from(modal2.querySelectorAll(focusableSelector));
  previouslyFocusedElement = document.querySelector(":focus");
  modal2.style.display = null;
  modal.style.display = "none";
  focusables2[0].focus();
  modal2.removeAttribute("aria-hidden");
  modal2.setAttribute("aria-modal", "true");
  modal2.addEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-close")
    .addEventListener("click", closeModal2);
  modal2.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal2
    .querySelector(".js-modal2-stop")
    .addEventListener("click", stopPropagation);
  const btnRetour = document.querySelector(".js-modal-retour");
  btnRetour.addEventListener("click", function (e) {
    modal2.style.display = "none";
    modal.style.display = null;
  });
};

// fonction pour fermer la modal

const closeModal2 = function (e) {
  if (modal2 === null) return;
  if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
  e.preventDefault();
  modal2.setAttribute("aria-hidden", "true");
  modal2.removeAttribute("aria-modal");
  modal2.removeEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal2
    .querySelector(".js-modal2-stop")
    .removeEventListener("click", stopPropagation);
  const hideModal2 = function () {
    modal2.style.display = "none";
    modal2.removeEventListener("animationend", hideModal2);
    modal2 = null;
  };
  modal2.addEventListener("animationend", hideModal2);
};

// fonction pour le controle avec Tab

const focusInModal2 = function (e) {
  e.preventDefault();
  let index2 = focusables2.findIndex(
    (f) => f === modal2.querySelector(":focus")
  );
  if (e.shiftkey === true) {
    index2--;
  } else {
    index2++;    
  }
  if (focusables2.disabled === true  ) {
      index2++
    }
    if (index2 >= focusables2.length) {
      index2 = 0;
    }
    if (index2 < 0) {
      index2 = focusables2.length - 1;
    }
  
  focusables2[index2].focus();
};

// ouverture de la modale 1 sur le click du lien
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// ouverture de la modale 2 sur le click du lien
document.querySelectorAll(".js-modal2").forEach((a) => {
  a.addEventListener("click", openModal2);
});

// Ajout de controle clavier sur la modale

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    if (modal2 !== null) {
      closeModal2(e);
      closeModal(e);
    } else {
      closeModal(e);
    }
  }
  // if (e.key === "Tab" && modal.style.display !== null) {
  //     focusInModal(e);
  // }
  if (e.key === "Tab" && modal !== null && modal2 === null) {
    focusInModal(e);
  } else if (
    e.key === "Tab" &&
    modal !== null &&
    modal2 !== null &&
    modal2.style.display !== "none"
  ) {
    focusInModal2(e);
  } else if (
    e.key === "Tab" &&
    modal !== null &&
    modal2.style.display === "none"
  ) {
    focusInModal(e);
  }
});

// Apparition des éléments de la page si l'administrateur est connecté
if (myToken !== null && myToken !== "") {
  const lienJsModal = document.querySelector(".js-modal");
  lienJsModal.style.display = null;
  const barreEdition = document.querySelector(".barre-edition");
  barreEdition.style.display = null;
}

// fonction pour faire un apercu de l'image à uploader et controler la taille du fichier

const choixImg = document.getElementById("imgFile");
const imgPreview = document.querySelector(".photoAjouter");
const pFile = document.querySelector(".pFile");
const labelFile = document.querySelector(".labelFile");
const logoImg = document.querySelector(".fa-image");

choixImg.addEventListener("change", function () {
  if (this.files[0].size > 4200000) {
    alert("taille image > 4 mo");
    this.value = "";
  } else {
    getImgData();
  }
});

imgPreview.addEventListener("click", function () {
  const imageUniquement = document.querySelector(".photoAjouter img");
  labelFile.style.display = null;
  pFile.style.display = null;
  logoImg.style.display = null;
  imageUniquement.style.display = "none";
});

function getImgData() {
  const files = choixImg.files[0];

  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = `<img src="` + this.result + `"/>`;
      labelFile.style.display = "none";
      pFile.style.display = "none";
      logoImg.style.display = "none";
    });
  }
}

// fonction pour activer et modifier le submit de l'envoi de formulaire

const submitFormulaire = document.getElementById("submitFormulaire");
const inputImgForm = document.getElementById("imgFile");
const inputTitreForm = document.getElementById("titre");
const inputCategorieForm = document.getElementById("categorie");

function activateSubmitForm() {
  if (
    inputImgForm.files.length > 0 &&
    inputTitreForm.value !== "" &&
    inputCategorieForm.value !== ""
  ) {
    submitFormulaire.style.backgroundColor = "#1D6154";
    submitFormulaire.disabled = false;
  }
}

inputImgForm.addEventListener("input", activateSubmitForm);
inputTitreForm.addEventListener("input", activateSubmitForm);
inputCategorieForm.addEventListener("input", activateSubmitForm);
