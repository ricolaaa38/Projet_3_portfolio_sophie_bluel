let modal = null;
const focusableSelector = "button, a, input, textarea"
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
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    
}

// fonction pour fermer la modal
const closeModal = function (e) {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault(); 
    modal.setAttribute("aria-hidden", true);
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener("animationend", hideModal);
        modal = null;
    }
    modal.addEventListener("animationend", hideModal);
}

// fonction pour empecher la fermeture de la modal au click sur celle-ci
const stopPropagation = function (e) {
    e.stopPropagation();
}

// fonction pour le controle avec Tab
const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(":focus"));
    if (e.shiftkey === true) {
        index --;
    } else {
        index ++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
}

// ouverture de la modale sur le click du lien
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal );
    
})

// Ajout de controle clavier sur la modale
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
})

// Apparition des éléments de la page si l'administrateur est connecté
if (myToken !== "") {
    const lienJsModal = document.querySelector(".js-modal");
    lienJsModal.style.display = null;
    const barreEdition = document.querySelector(".barre-edition");
    barreEdition.style.display = null;
}

