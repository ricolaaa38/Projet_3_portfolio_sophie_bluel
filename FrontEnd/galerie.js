const works = await fetch("http://localhost:5678/api/works");
const projets = await works.json();

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


function genererProjetsModal(projets) {
  for (let i = 0; i < projets.length; i++) {
    const article = projets[i];
    const sectionModal = document.querySelector(".zoneModifProjets")
    const modalElement = document.createElement("article");
    modalElement.dataset.id = projets[i].id;

    const imageModal = document.createElement("img");
    imageModal.src = article.imageUrl;
    const nomModal = document.createElement("figcaption");
    nomModal.innerText = "éditer";
    const logoTrash = document.createElement("button");
    logoTrash.innerHTML = '<i class="fa-solid fa-trash"></i>'

    sectionModal.appendChild(modalElement);
    modalElement.appendChild(logoTrash);
    modalElement.appendChild(imageModal);
    modalElement.appendChild(nomModal);
    }
  }

genererProjetsModal(projets);

const boutonTous = document.querySelector(".tous");
boutonTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML ="";
    document.querySelector(".zoneModifProjets").innerHTML ="";
    genererProjets(projets);
    
})

const boutonObjets = document.querySelector(".objets");
boutonObjets.addEventListener("click", function () {
  const projetsObjets = projets.filter(function (projet) {
    if (projet.category.name === "Objets"){
    return projet;
    }
  });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetsObjets);    

});

const boutonAppartements = document.querySelector(".appartements");
boutonAppartements.addEventListener("click", function () {
  const projetsAppartements = projets.filter(function (projet) {
    if (projet.category.name === "Appartements"){
    return projet;
    }
  });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetsAppartements);

});

const boutonHotelRestaurants = document.querySelector(".hotel-restaurants");
boutonHotelRestaurants.addEventListener("click", function () {
  const projetsHotelRestaurants = projets.filter(function (projet) {
    if (projet.category.name === "Hotels & restaurants"){
    return projet;
    }
  });
    document.querySelector(".gallery").innerHTML = "";
    genererProjets(projetsHotelRestaurants);

});

