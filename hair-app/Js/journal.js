document.addEventListener("DOMContentLoaded", () => {
  const etatInput = document.getElementById("etatCheveux");
  const produitsInput = document.getElementById("produitsJournal");
  const noteInput = document.getElementById("noteJournal");
  const photoInput = document.getElementById("photoInput");
  const listeJournal = document.getElementById("listeJournal");
  const btnAdd = document.getElementById("btnAdd");
  const btnInit = document.getElementById("initJournal");

  let editId = null; // id de l'entrée en cours de modification

  // AJOUT / MODIFICATION
  btnAdd.addEventListener("click", () => {
    const journal = JSON.parse(localStorage.getItem("journal")) || [];

    // Préparer les données
    const entry = {
      id: editId || Date.now(),
      date: Date.now(),
      etat: etatInput.value,
      produits: produitsInput.value,
      note: noteInput.value,
      photos: []
    };

    // Si on modifie, garder les anciennes photos
    if (editId) {
      const old = journal.find(e => e.id === editId);
      if (old && old.photos) entry.photos = [...old.photos];
    }

    const files = [...photoInput.files];
    if (files.length > 0) {
      let loaded = 0;
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          entry.photos.push(reader.result);
          loaded++;
          if (loaded === files.length) finalizeSave(journal, entry);
        };
        reader.readAsDataURL(file);
      });
    } else {
      finalizeSave(journal, entry);
    }
  });

  function finalizeSave(journal, entry) {
    if (editId) {
      const index = journal.findIndex(e => e.id === editId);
      journal[index] = entry;
      editId = null;
      btnAdd.textContent = "➕ Ajouter"; // remettre le bouton en mode ajouter
    } else {
      journal.push(entry);
    }
    localStorage.setItem("journal", JSON.stringify(journal));
    resetForm();
    renderJournal();
  }

  // AFFICHAGE DES ENTRÉES
  function renderJournal() {
    listeJournal.innerHTML = "";
    const journal = JSON.parse(localStorage.getItem("journal")) || [];
    journal.sort((a,b) => b.date - a.date).forEach(entry => {
      const card = document.createElement("div");
      card.className = "journal-card";

      card.innerHTML = `
        <strong>📅 ${new Date(entry.date).toLocaleDateString()}</strong>
        <div>🌿 ${entry.etat || "—"}</div>
        <div>🧴 ${entry.produits || ""}</div>
        <div>✏️ ${entry.note || ""}</div>
        <div class="card-actions">
          <button class="edit">✏️ Modifier</button>
          <button class="delete">🗑️ Supprimer</button>
        </div>
      `;

      // Photos
      if (entry.photos.length > 0) {
        const gallery = document.createElement("div");
        gallery.className = "photo-gallery";
        entry.photos.forEach((src, idx) => {
          const div = document.createElement("div");
          div.className = "photo-item";

          const img = document.createElement("img");
          img.src = src;

          const delBtn = document.createElement("button");
          delBtn.textContent = "✕";
          delBtn.title = "Supprimer cette photo";
          delBtn.addEventListener("click", () => {
            if (!confirm("Supprimer cette photo ?")) return;
            entry.photos.splice(idx, 1);
            const updatedJournal = journal.map(e => e.id === entry.id ? entry : e);
            localStorage.setItem("journal", JSON.stringify(updatedJournal));
            renderJournal();
          });

          div.appendChild(img);
          div.appendChild(delBtn);
          gallery.appendChild(div);
        });
        card.appendChild(gallery);
      }

      // Modifier
      card.querySelector(".edit").addEventListener("click", () => {
        etatInput.value = entry.etat;
        produitsInput.value = entry.produits;
        noteInput.value = entry.note;
        editId = entry.id;
        btnAdd.textContent = "💾 Valider modification"; // bouton passe en mode modification
      });

      // Supprimer
      card.querySelector(".delete").addEventListener("click", () => {
        if (!confirm("Supprimer cette entrée ?")) return;
        const updatedJournal = journal.filter(e => e.id !== entry.id);
        localStorage.setItem("journal", JSON.stringify(updatedJournal));
        renderJournal();
      });

      listeJournal.appendChild(card);
    });
  }

  // INITIALISER
  btnInit.addEventListener("click", () => {
    if (!confirm("⚠️ Supprimer tout le journal ?")) return;
    localStorage.removeItem("journal");
    listeJournal.innerHTML = "";
    resetForm();
    editId = null;
    btnAdd.textContent = "➕ Ajouter";
  });

  function resetForm() {
    etatInput.value = "";
    produitsInput.value = "";
    noteInput.value = "";
    photoInput.value = "";
  }

  renderJournal();
});