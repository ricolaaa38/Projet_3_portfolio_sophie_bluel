let works = await fetch("http://localhost:5678/api/works");
let projets = await works.json();
const category = await fetch("http://localhost:5678/api/categories");
const categorie = await category.json();
let myToken = sessionStorage.getItem("token");

// fonction pour creer les projets et les afficher sur la galerie

function genererProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];
    const sectionProjets = document.querySelector(".gallery");
    const projetElement = document.createElement("article");
    projetElement.dataset.id = projets[i].id;

    const imageProjet = document.createElement("img");
    imageProjet.src = article.imageUrl;
    const nomProjet = document.createElement("figcaption");
    nomProjet.innerText = article.title;

    sectionProjets.appendChild(projetElement);
    projetElement.appendChild(imageProjet);
    projetElement.appendChild(nomProjet);
  }
}

genererProjets(projets);

// fonction pour creer, afficher et supprimer les projets sur la modal

function genererProjetsModal(projets) {
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];
    const sectionModal = document.querySelector(".zoneModifProjets");
    const modalElement = document.createElement("article");
    modalElement.dataset.id = projets[i].id;
    modalElement.className = "modalElement";

    const imageModal = document.createElement("img");
    imageModal.src = article.imageUrl;
    const nomModal = document.createElement("figcaption");
    nomModal.innerText = "éditer";
    const divLogo = document.createElement("div");
    divLogo.className = "divLogo";
    const logoFleche = document.createElement("button");
    logoFleche.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right"></i>`;
    logoFleche.className = "logoFleche";
    const logoTrash = document.createElement("button");
    logoTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';
    logoTrash.className = "logoTrash";
    logoTrash.dataset.id = projets[i].id;

    sectionModal.appendChild(modalElement);
    modalElement.appendChild(divLogo);
    divLogo.appendChild(logoFleche);
    divLogo.appendChild(logoTrash);
    modalElement.appendChild(imageModal);
    modalElement.appendChild(nomModal);

    // supprimerProjet(logoTrash)

    logoTrash.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const iconeElement = article.id;
      console.log(iconeElement);

      let response = await fetch(
        `http://localhost:5678/api/works/${iconeElement}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${myToken}`,
          },
        }
      );
      if (response.ok) {
        alert("Projet supprimé avec succés");
        let divGalerie = document.querySelector(".gallery");
        let btnFiltres = document.querySelector(".filtres");
        btnFiltres.innerHTML = "";
        divGalerie.innerHTML = "";
        modalElement.remove();
        works = await fetch("http://localhost:5678/api/works");
        projets = await works.json();
        genererProjets(projets);
        btnTous(projets);
        genererBtnFiltres(projets);
      } else {
        alert("Echec de suppression");
      }
    });
  }
}

genererProjetsModal(projets);

// fonction de filtre "tous"

function btnTous(projets) {
  const zoneBtnTous = document.querySelector(".filtres");
  const tous = document.createElement("button");
  tous.innerText = "tous";
  tous.className = "tous";

  zoneBtnTous.appendChild(tous);

  const boutonTous = document.querySelector(".tous");
  boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projets);
  });
}

btnTous(projets);

// function pour filtrer les projets au click sur les boutons

function filtre(button, projets) {
  button.addEventListener("click", function () {
    const filtreProjet = projets.filter((projet) => {
      return projet.category.name === button.innerText;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(filtreProjet);
  });
}

// fonction de generation de bouton de filtres

function genererBtnFiltres(projets) {
  for (let i = 0; i < categorie.length; i++) {
    const sectionBtnFiltres = document.querySelector(".filtres");
    const projetCategorieBtn = document.createElement("button");
    projetCategorieBtn.innerHTML = categorie[i].name;

    sectionBtnFiltres.appendChild(projetCategorieBtn);

    filtre(projetCategorieBtn, projets);
  }
}

genererBtnFiltres(projets);

// fonction pour generer les categories sur la modal d'ajout de nouveau projet

function genererCategorieModal2() {
  for (let i = 0; i < categorie.length; i++) {
    const sectionCategorie = document.getElementById("categorie");
    const typeCategorie = document.createElement("option");
    typeCategorie.innerHTML = categorie[i].name;
    typeCategorie.value = categorie[i].name;
    typeCategorie.setAttribute("id", categorie[i].id);
    sectionCategorie.appendChild(typeCategorie);
  }
}

genererCategorieModal2();

// fonction pour controler le remplissage du formulaire d'envoi, le creer et l'envoyer

function genererNewProjet() {
  const submitNewProjet = document.querySelector(".ajoutPhoto");
  submitNewProjet.addEventListener("submit", async function (e) {
    e.preventDefault();
    const imageFormulaire = document.getElementById("imgFile").files[0];
    const titreFormulaire = document.getElementById("titre").value;
    const categorieFormulaire = document.getElementById("categorie");
    const categorieValue =
      categorieFormulaire.options[categorieFormulaire.selectedIndex].id;

    if (
      imageFormulaire === null ||
      titreFormulaire === "" ||
      categorieFormulaire === ""
    ) {
      alert("formulaire incorrect");
    } else {
      const formData = new FormData();
      formData.append("image", imageFormulaire);
      formData.append("title", titreFormulaire);
      formData.append("category", categorieValue);

      console.log(formData);

      const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${myToken}`,
        },
        body: formData,
      });
      if (reponse.ok) {
        alert("Projet ajouté avec succés ");
        let zoneModifProjets = document.querySelector(".zoneModifProjets");
        let divGalerie = document.querySelector(".gallery");
        let btnFiltres = document.querySelector(".filtres");
        zoneModifProjets.innerHTML = "";
        btnFiltres.innerHTML = "";
        divGalerie.innerHTML = "";
        works = await fetch("http://localhost:5678/api/works");
        projets = await works.json();
        genererProjets(projets);
        btnTous(projets);
        genererBtnFiltres(projets);
        genererProjetsModal(projets);
      } else {
        alert("Echec de l'ajout du projet");
      }
    }
  });
}

genererNewProjet();
