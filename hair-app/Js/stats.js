// Mettre à jour les statistiques depuis les données Routine
function updateStats() {
  const data = JSON.parse(localStorage.getItem("routineData")) || [];
  const totalSemaines = data.length;
  const completees = data.filter(s => s.completee).length;

  // % Hydratation
  let totalJours = 0, joursActifs = 0;
  data.forEach(s => {
    s.joursHydratation.forEach(j => {
      totalJours++;
      if(j) joursActifs++;
    });
  });
  const hydratation = totalJours ? Math.round((joursActifs / totalJours) * 100) : 0;

  // Soins réalisés
  let totalSoins = 0, soinsFaits = 0;
  data.forEach(s => {
    s.soins.forEach(soin => {
      totalSoins++;
      if(soin.checked) soinsFaits++;
    });
  });
  const soinsPercent = totalSoins ? `${soinsFaits}/${totalSoins}` : '0/0';

  // Affichage
  document.getElementById("statHydratation").textContent = hydratation + "%";
  document.getElementById("statSoins").textContent = soinsPercent;
  document.getElementById("statSemaines").textContent = `${completees}/${totalSemaines}`;

  // Barre de progression
  const pourcentage = totalSemaines ? Math.round((completees / totalSemaines) * 100) : 0;
  const barre = document.getElementById("progressionBar");
  const texte = document.getElementById("progressionText");
  if(barre) barre.style.width = pourcentage + "%";
  if(texte) texte.textContent = `Progression : ${pourcentage}% (${completees}/${totalSemaines})`;
}

// Initialisation à l'ouverture
document.addEventListener("DOMContentLoaded", () => {
  updateStats();
});
