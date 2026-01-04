// Éléments HTML
const choixTheme = document.getElementById("choixTheme");
const notifToggle = document.getElementById("notifToggle");
const btnAjouter = document.getElementById("btnAjouterRappel");
const soinInput = document.getElementById("soinRappel");
const heureInput = document.getElementById("heureRappel");
const joursCheckbox = document.querySelectorAll("#joursSemaine input[type='checkbox']");
const listeRappels = document.getElementById("listeRappels");

// Charger rappels et notifications depuis localStorage
let rappels = JSON.parse(localStorage.getItem("rappels")) || [];
let notifications = JSON.parse(localStorage.getItem("notifications")) || false;
let theme = localStorage.getItem("theme") || "clair";

// Initialiser les champs
notifToggle.checked = notifications;
choixTheme.value = theme;

// ===============================
// FONCTIONS
// ===============================

// Afficher les rappels
function renderRappels() {
  listeRappels.innerHTML = "";
  rappels.forEach((rappel, index) => {
    const div = document.createElement("div");
    div.className = "rappel";
    div.innerHTML = `
      <span>🧴 ${rappel.soin} ${rappel.heure ? "⏰ " + rappel.heure : ""} ${rappel.jours.length ? "📅 " + rappel.jours.join(", ") : ""}</span>
      <button onclick="supprimerRappel(${index})">❌</button>
    `;
    listeRappels.appendChild(div);
  });
}

// Ajouter un rappel
function ajouterRappel() {
  const soin = soinInput.value.trim();
  const heure = heureInput.value;
  const jours = Array.from(joursCheckbox).filter(c => c.checked).map(c => c.value);

  if (!soin) return alert("Veuillez entrer un nom de soin.");
  if (!heure) return alert("Veuillez sélectionner une heure.");
  if (jours.length === 0) return alert("Veuillez sélectionner au moins un jour.");

  rappels.push({ soin, heure, jours });
  localStorage.setItem("rappels", JSON.stringify(rappels));

  // Reset champs
  soinInput.value = "";
  heureInput.value = "";
  joursCheckbox.forEach(c => c.checked = false);

  renderRappels();
}

// Supprimer un rappel
function supprimerRappel(index) {
  rappels.splice(index, 1);
  localStorage.setItem("rappels", JSON.stringify(rappels));
  renderRappels();
}

// ===============================
// NOTIFICATIONS
// ===============================

// Vérifier si on peut utiliser les notifications
function demanderPermission() {
  if (Notification.permission !== "granted" && Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notifications autorisées !");
      }
    });
  }
}

// Vérifier tous les rappels toutes les minutes
function checkRappels() {
  if (!notifications) return;

  const now = new Date();
  const jourActuel = now.toLocaleDateString('fr-FR', { weekday: 'long' }); // Lundi, Mardi...
  const heures = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timeNow = `${heures}:${minutes}`;

  rappels.forEach(rappel => {
    if (rappel.jours.includes(jourActuel) && rappel.heure === timeNow) {
      new Notification(`🧴 Rappel de soin`, {
        body: `C'est l'heure de : ${rappel.soin}`,
        icon: "icon.png"
      });
    }
  });
}

// ===============================
// GESTION THEME & NOTIF TOGGLE
// ===============================
notifToggle.addEventListener("change", () => {
  notifications = notifToggle.checked;
  localStorage.setItem("notifications", JSON.stringify(notifications));
  if (notifications) demanderPermission();
});

choixTheme.addEventListener("change", () => {
  theme = choixTheme.value;
  localStorage.setItem("theme", theme);
  // Appliquer le thème ici si nécessaire
});

// ===============================
// BOUTON AJOUTER
// ===============================
btnAjouter.addEventListener("click", ajouterRappel);

// ===============================
// INITIALISATION
// ===============================
renderRappels();
demanderPermission();
setInterval(checkRappels, 60 * 1000); // Vérifie toutes les minutes

// Pour pouvoir appeler depuis HTML
window.supprimerRappel = supprimerRappel;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("SW enregistré"))
    .catch(err => console.error(err));
}