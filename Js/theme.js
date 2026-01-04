// ====== GESTION DU THÈME VIA VARIABLES CSS ======
function appliquerTheme(theme) {
  const root = document.documentElement;

  const themes = {
    clair: {
      "--bg-body": "linear-gradient(180deg, #e6f8f9 0%, #fff4e8 100%)",
      "--bg-card": "rgba(255, 252, 245, 0.94)",
      "--bg-header": "#9adbd6",
      "--bg-nav": "rgba(154, 219, 214, 0.96)",
      "--text-main": "#355f6b",
      "--btn-bg": "#9adbd6",
      "--btn-text": "#ffffff",
      "--accent": "#9adbd6"
    },

    jungle: {
      "--bg-body": "linear-gradient(to bottom, #cdebb0, #b3d9a5)",
      "--bg-card": "rgba(222,239,212,0.9)",
      "--bg-header": "#8fb68d",
      "--bg-nav": "rgba(205,235,176,0.95)",
      "--text-main": "#2c3e23",
      "--btn-bg": "#8fb68d",
      "--btn-text": "#ffffff",
      "--accent": "#3e7c3a"
    },

    girlyViolet: {
      "--bg-body": "linear-gradient(to bottom, #f3e6fa, #e1c8f2)",
      "--bg-card": "rgba(241,221,245,0.9)",
      "--bg-header": "#d4a5f5",
      "--bg-nav": "rgba(212,165,245,0.95)",
      "--text-main": "#4b1d5f",
      "--btn-bg": "#d4a5f5",
      "--btn-text": "#4b1d5f",
      "--accent": "#9f57d6"
    },

    coucherSoleil: {
      "--bg-body": "linear-gradient(180deg, #f7b2b7 0%, #f6a28e 45%, #f9d976 100%)",
      "--bg-card": "rgba(255,247,235,0.94)",
      "--bg-header": "#e27a7a",
      "--bg-nav": "rgba(74,28,28,0.96)",
      "--text-main": "#4a1c1c",
      "--btn-bg": "#e27a7a",
      "--btn-text": "#fff8ef",
      "--accent": "#f9d976"
    }
  };

  const valeurs = themes[theme] || themes.clair;

  Object.entries(valeurs).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  localStorage.setItem("themeChoisi", theme);
}

// ====== INITIALISATION ======
document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("choixTheme");
  const themeSauve = localStorage.getItem("themeChoisi") || "clair";

  appliquerTheme(themeSauve);

  if (themeSelect) {
    themeSelect.value = themeSauve;
    themeSelect.addEventListener("change", () => {
      appliquerTheme(themeSelect.value);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const selectTheme = document.getElementById("choixTheme");

  // Thème sauvegardé ou clair par défaut
  const themeSauvegarde = localStorage.getItem("theme") || "clair";

  appliquerTheme(themeSauvegarde);

  // Si on est sur la page paramètres
  if (selectTheme) {
    selectTheme.value = themeSauvegarde;
    selectTheme.addEventListener("change", () => {
      appliquerTheme(selectTheme.value);
    });
  }
});

function appliquerTheme(theme) {
  const body = document.body;

  // Nettoyer les anciennes classes
  body.classList.remove("clair", "jungle", "girlyViolet", "coucherSoleil");

  // Appliquer la nouvelle
  body.classList.add(theme);

  // Sauvegarder
  localStorage.setItem("theme", theme);
}