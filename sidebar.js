/*
  ============================================================
  FICHIER : sidebar.js
  RÔLE    : Injecte la sidebar + le bouton hamburger (mobile)
            dans toutes les pages du portfolio.

  ✏️ POUR MODIFIER LE MENU :
     - Ajouter une page : ajoute un objet dans MENU_ITEMS
     - Changer le titre : modifie MENU_TITLE
     - Changer le pied  : modifie MENU_FOOTER
  ============================================================
*/

const MENU_TITLE  = "📋 Menu";
const MENU_FOOTER = "© 2025 Chrystal Orian VIGAN";

/* ✏️ Liens du menu – ajoute tes pages ici */
const MENU_ITEMS = [
  { href: "home.html",        icon: "🏠", label: "Home"            },
  { href: "cv.html",          icon: "📄", label: "Mon CV"          },
  { href: "certificats.html", icon: "🥇", label: "Mes Certificats" },
  { href: "reseaux.html",     icon: "🌐", label: "Mes Réseaux"     },
  /* ✏️ Exemple pour ajouter une page :
     { href: "projets.html", icon: "🚀", label: "Mes Projets" }, */
];

/* ── Styles de la sidebar et du hamburger ── */
const SIDEBAR_CSS = `
  /* ════ SIDEBAR ════ */
  .sidebar {
    background-color: #1a1d2e;
    color: #e0e6f0;
    width: 280px;
    min-width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #2e3250;
    transition: transform 0.3s ease;
    z-index: 200;
  }
  .sidebar .menu-title {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #7dd3fc;
    padding: 2rem 1.5rem 1rem;
    border-bottom: 1px solid #2e3250;
  }
  .sidebar nav ul {
    list-style: none;
    padding: 1rem 0;
  }
  .sidebar nav ul li a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.5rem;
    color: #c8d8f0;
    text-decoration: none;
    font-size: 0.95rem;
    border-left: 3px solid transparent;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .sidebar nav ul li a .nav-icon {
    font-size: 1.2rem;
    min-width: 1.5rem;
    text-align: center;
  }
  .sidebar nav ul li a:hover,
  .sidebar nav ul li a.active {
    background-color: #232640;
    border-left-color: #7dd3fc;
    color: #ffffff;
  }
  .sidebar .menu-footer {
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    color: #4a5270;
    border-top: 1px solid #2e3250;
    margin-top: auto;
  }

  /* ════ BOUTON HAMBURGER (mobile) ════ */
  .hamburger-btn {
    display: none;           /* caché sur desktop */
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 300;
    background: #1a1d2e;
    border: 1px solid #2e3250;
    border-radius: 8px;
    width: 44px;
    height: 44px;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
  .hamburger-btn span {
    display: block;
    width: 22px;
    height: 2px;
    background: #7dd3fc;
    border-radius: 2px;
    transition: transform 0.3s, opacity 0.3s;
  }
  /* Animation croix quand menu ouvert */
  .hamburger-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger-btn.open span:nth-child(2) { opacity: 0; }
  .hamburger-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ════ OVERLAY sombre derrière la sidebar (mobile) ════ */
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 199;
  }
  .sidebar-overlay.active { display: block; }

  /* ════ RESPONSIVE MOBILE ════ */
  @media (max-width: 768px) {
    /* La sidebar sort du flux et se cache à gauche */
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      transform: translateX(-100%);  /* cachée par défaut */
    }
    /* Quand le menu est ouvert */
    .sidebar.open {
      transform: translateX(0);
    }
    /* Le bouton hamburger devient visible */
    .hamburger-btn {
      display: flex;
    }
    /* Le contenu principal prend toute la largeur */
    .page-wrapper {
      flex-direction: column !important;
    }
    .main-content {
      padding-top: 4.5rem !important;  /* évite que le contenu passe sous le bouton */
      height: 100vh;
      overflow-y: auto;
    }
  }
`;

/* ── Injection dans la page ── */
(function () {

  /* 1. Injecte le CSS */
  const style = document.createElement("style");
  style.textContent = SIDEBAR_CSS;
  document.head.appendChild(style);

  /* 2. Détecte la page active */
  const pageCourante = window.location.pathname.split("/").pop() || "home.html";

  /* 3. Construit les liens */
  const liens = MENU_ITEMS.map(item => {
    const actif = item.href === pageCourante ? ' class="active"' : '';
    return `<li>
      <a href="${item.href}"${actif}>
        <span class="nav-icon">${item.icon}</span>
        <span>${item.label}</span>
      </a>
    </li>`;
  }).join("");

  /* 4. HTML complet : overlay + sidebar + bouton hamburger */
  const html = `
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <aside class="sidebar" id="sidebar">
      <div class="menu-title">${MENU_TITLE}</div>
      <nav><ul>${liens}</ul></nav>
      <div class="menu-footer">${MENU_FOOTER}</div>
    </aside>

    <button class="hamburger-btn" id="hamburgerBtn" aria-label="Ouvrir le menu">
      <span></span><span></span><span></span>
    </button>`;

  /* 5. Insère dans .page-wrapper */
  const wrapper = document.querySelector(".page-wrapper");
  if (wrapper) {
    wrapper.insertAdjacentHTML("afterbegin", html);
  } else {
    console.warn("sidebar.js : .page-wrapper introuvable.");
    return;
  }

  /* 6. Logique d'ouverture / fermeture (mobile) */
  const btn     = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  function ouvrirMenu() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    btn.classList.add("open");
    document.body.style.overflow = "hidden"; /* bloque le scroll derrière */
  }

  function fermerMenu() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    btn.classList.remove("open");
    document.body.style.overflow = "";
  }

  btn.addEventListener("click", () => {
    sidebar.classList.contains("open") ? fermerMenu() : ouvrirMenu();
  });

  /* Ferme en cliquant sur l'overlay */
  overlay.addEventListener("click", fermerMenu);

  /* Ferme avec la touche Échap */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") fermerMenu();
  });

  /* Ferme automatiquement quand on clique sur un lien (mobile) */
  sidebar.querySelectorAll("a").forEach(lien => {
    lien.addEventListener("click", fermerMenu);
  });

})();
