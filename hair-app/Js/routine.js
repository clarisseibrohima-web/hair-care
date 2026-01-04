const container = document.getElementById("routineContainer");

// Données de base pour chaque soin
const soinsBase = [
  { nom: "Hydratation", emoji: "💧", checked: false },
  { nom: "Wash day", emoji: "🧼", checked: false },
  { nom: "Masque", emoji: "🧴", checked: false },
  { nom: "Massage cuir chevelu", emoji: "💆🏾‍♀️", checked: false }
];

// Citations motivantes
const citations = [
  "✨ Chaque soin te rapproche de tes cheveux de rêve !",
  "🌱 La régularité fait pousser la confiance !",
  "💖 Tu prends soin de toi, et ça se voit !",
  "🔥 Tu es sur la bonne voie, continue !",
  "🌸 Tes cheveux te remercient 💕"
];

// Charger ou initialiser les données
let data = JSON.parse(localStorage.getItem("routineData"));
if (!data) {
  data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      semaine: i,
      soins: JSON.parse(JSON.stringify(soinsBase)),
      joursHydratation: [false,false,false,false,false,false,false],
      completee: false,
      note: "",
      typeSoin: ""
    });
  }
  saveData();
}

// Toggle affichage toutes les semaines
let afficherToutes = false;

// Sauvegarde
function saveData() {
  localStorage.setItem("routineData", JSON.stringify(data));
}

// Retourne la semaine en cours
function getSemaineEnCours() {
  return data.find(s => !s.completee) || data[data.length-1];
}

// Définir 3 jours d'hydratation espacés
function definirJoursHydratation(semaine, indexPremierJour) {
  const jours = [false,false,false,false,false,false,false];
  const espaces = [0,2,4]; 
  espaces.forEach(offset => {
    const i = (indexPremierJour+offset)%7;
    jours[i] = true;
  });
  semaine.joursHydratation = jours;
}

// Rendu d'une semaine
function renderSemaine(sem) {
  const div = document.createElement("div");
  div.className = "semaine carte carte-routine";
  div.innerHTML = `
    <h4>📅 Semaine ${sem.semaine} ${sem.completee ? "🏆" : "⏳"}</h4>
    <input class="soin-type" placeholder="💡 Type de soin..." value="${sem.typeSoin}">
  `;

  // Saisie type soin
  div.querySelector(".soin-type").addEventListener("input", e=>{
    sem.typeSoin = e.target.value; 
    saveData();
  });

  // Soins
  sem.soins.forEach(soin=>{
    const label = document.createElement("label");
    label.className="soin";
    label.innerHTML=`<input type="checkbox" ${soin.checked?"checked":""}><span>${soin.emoji}</span> ${soin.nom}`;
    label.querySelector("input").addEventListener("change", e=>{
      soin.checked = e.target.checked;
      sem.completee = sem.soins.every(s=>s.checked);
      saveData(); render(); updateProgression();
    });
    div.appendChild(label);
  });

  // Jours hydratation
  const joursAbbr=["L","M","M","J","V","S","D"];
  const joursDiv=document.createElement("div");
  joursDiv.className="jours-hydratation";
  sem.joursHydratation.forEach((actif,i)=>{
    const btn=document.createElement("button");
    btn.textContent=joursAbbr[i];
    btn.className="jour-btn";
    if(actif) btn.classList.add("actif");
    btn.addEventListener("click",()=>{
      definirJoursHydratation(sem,i);
      saveData(); render();
    });
    joursDiv.appendChild(btn);
  });
  div.appendChild(joursDiv);

  // Note
  const textarea = document.createElement("textarea");
  textarea.placeholder="💭 Note de la semaine...";
  textarea.value = sem.note;
  textarea.addEventListener("input", e=>{
    sem.note=e.target.value; saveData();
  });
  div.appendChild(textarea);

  // Citation motivante
  const citation = document.createElement("div");
  citation.className="motivation";
  citation.textContent = citations[Math.floor(Math.random()*citations.length)];
  div.appendChild(citation);

  return div;
}

// Render global
function render() {
  container.innerHTML="";
  if(afficherToutes) data.forEach(sem=>container.appendChild(renderSemaine(sem)));
  else container.appendChild(renderSemaine(getSemaineEnCours()));

  const toggleBtn=document.createElement("button");
  toggleBtn.textContent=afficherToutes ? "⬆️ Voir la semaine en cours" : "📜 Voir toutes les semaines";
  toggleBtn.addEventListener("click",()=>{
    afficherToutes=!afficherToutes;
    render();
  });
  container.appendChild(toggleBtn);
}

// Progression
function updateProgression(){
  const total=data.length;
  const completees=data.filter(s=>s.completee).length;
  const pourcentage=Math.round((completees/total)*100);
  const barre=document.getElementById("progressionBar");
  const texte=document.getElementById("progressionText");
  if(barre) barre.style.width = pourcentage+"%";
  if(texte) texte.textContent=`Progression : ${pourcentage}% (${completees}/${total})`;
}

// Initialiser la semaine en cours
function initialiserRoutine() {
  const sem = getSemaineEnCours();
  sem.soins.forEach(s => s.checked=false);
  sem.joursHydratation=[false,false,false,false,false,false,false];
  sem.note="";
  sem.typeSoin="";
  saveData();
  render();
  updateProgression();
}

// Lancement
render();
updateProgression();