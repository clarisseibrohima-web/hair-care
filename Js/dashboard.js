const moodResult = document.getElementById("moodResult");
const moodButtons = document.querySelectorAll(".mood-options button");
const moodHistorique = document.getElementById("moodHistorique");

let moods = JSON.parse(localStorage.getItem("moods")) || [];

// Afficher le mood d'aujourd'hui
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toLocaleDateString("fr-FR");
  const savedMood = moods.find(m => m.date === today);
  if (savedMood) {
    moodResult.textContent = "Aujourd’hui : " + savedMood.mood;
  }
  renderMoodHistorique();
});

function renderMoodHistorique() {
  moodHistorique.innerHTML = "";
  moods.slice().reverse().forEach(m => {
    const div = document.createElement("div");
    div.className = "mood-card";
    div.innerHTML = `
      <span>${m.date}</span>
      <span style="font-size:1.2em">${m.mood}</span>
    `;
    moodHistorique.appendChild(div);
  });
}

moodButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const today = new Date().toLocaleDateString("fr-FR");

    // Supprimer l'ancien mood si déjà présent
    moods = moods.filter(m => m.date !== today);

    // Ajouter le nouveau mood
    moods.push({
      date: today,
      mood: btn.dataset.mood
    });

    localStorage.setItem("moods", JSON.stringify(moods));

    // Mettre à jour l'affichage
    moodResult.textContent = "Aujourd’hui : " + btn.dataset.mood;
    renderMoodHistorique();
  });
});