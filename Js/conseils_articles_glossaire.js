/* ===============================
   CONSEILS DU JOUR
================================ */
const conseils = [
  "💧 Hydratez vos cheveux peu poreux.",
  "🧴 Appliquez une huile pénétrante.",
  "🥥 Utilisez une huile scellante.",
  "🛁 Pré-shampooing chaud pour nourrir la fibre.",
  "🧑‍🦱 Coiffures protectrices : tresses, twists, vanilles.",
  "💆‍♀️ Massage du cuir chevelu quotidien.",
  "🧴 Masques protéinés toutes les 3-4 semaines.",
  "🌿 Aloe vera pour apaiser et hydrater.",
  "🍯 Ajoutez du miel à vos masques hydratants.",
  "🕒 Shampooing doux toutes les 1-2 semaines.",
  "🌞 Protection solaire pour les cheveux.",
  "💨 Limiter l’usage de la chaleur.",
  "🌸 Crèmes légères ou gels à base d’eau pour définir les boucles.",
  "💦 Rincer à l’eau tiède pour meilleure pénétration.",
  "🥭 Beurre de mangue pour sceller l’hydratation.",
  "🧊 Rinçage froid pour refermer la cuticule.",
  "✨ Routine nocturne avec bonnet satin."
];

/* ===============================
   ARTICLES
================================ */
const articles = [
  {
    titre: "💧 Hydratation légère quotidienne",
    texte: "Pour les cheveux peu poreux, privilégiez les sprays ou brumes légères pour hydrater sans alourdir."
  },
  {
    titre: "🧴 Huiles pénétrantes",
    texte: "Les huiles comme jojoba ou amande douce pénètrent mieux les cheveux peu poreux."
  },
  {
    titre: "🔥 Deep conditioning",
    texte: "Utilise une source de chaleur douce pour ouvrir les cuticules."
  }
];

/* ===============================
   GLOSSAIRE
================================ */
const glossaire = [
  { terme: "Porosité", definition: "Capacité du cheveu à absorber et retenir l’humidité." },
  { terme: "Leave-in", definition: "Produit hydratant sans rinçage." },
  { terme: "Humectant", definition: "Ingrédient qui attire l’humidité." },
  { terme: "Clarifiant", definition: "Shampooing qui nettoie en profondeur." }
];

/* ===============================
   ÉLÉMENTS DOM
================================ */
const conseilDiv = document.getElementById("conseilDuJour");
const btnConseil = document.getElementById("nouveauConseil");

const articleDiv = document.getElementById("articleDuJour");
const btnArticle = document.getElementById("nouvelArticle");

const termeDiv = document.getElementById("termeDuJour");
const listeGlossaire = document.getElementById("listeGlossaire");
const inputGlossaire = document.getElementById("rechercheGlossaire");

/* ===============================
   FONCTIONS AFFICHAGE
================================ */

// CONSEIL
function afficherConseil() {
  const index = Math.floor(Math.random() * conseils.length);
  conseilDiv.innerHTML = `
    <p class="texte-carte">${conseils[index]}</p>
  `;
}

// ARTICLE
function afficherArticle() {
  const index = Math.floor(Math.random() * articles.length);
  articleDiv.innerHTML = `
    <h4 class="titre-carte">${articles[index].titre}</h4>
    <p class="texte-carte">${articles[index].texte}</p>
  `;
}

// TERME DU JOUR
function afficherTermeDuJour() {
  const index = Math.floor(Math.random() * glossaire.length);
  termeDiv.innerHTML = `
    <p class="texte-carte">
      <strong>${glossaire[index].terme}</strong> : ${glossaire[index].definition}
    </p>
  `;
}

// RECHERCHE GLOSSAIRE
function rechercheGlossaire() {
  const filtre = inputGlossaire.value.toLowerCase();
  listeGlossaire.innerHTML = "";

  glossaire.forEach(item => {
    if (item.terme.toLowerCase().includes(filtre)) {
      const div = document.createElement("div");
      div.className = "glossaire-item texte-carte";
      div.innerHTML = `
        <strong>${item.terme}</strong> : ${item.definition}
      `;
      listeGlossaire.appendChild(div);
    }
  });
}

/* ===============================
   EVENTS
================================ */
btnConseil.addEventListener("click", afficherConseil);
btnArticle.addEventListener("click", afficherArticle);
inputGlossaire.addEventListener("input", rechercheGlossaire);

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  afficherConseil();
  afficherArticle();
  afficherTermeDuJour();
});