(function () {
  "use strict";
  if (window.__hesedGlobalHeaderReady) return;
  window.__hesedGlobalHeaderReady = true;

  // This sheet is deliberately appended after app.js: app.js adds aurore-pill.css
  // dynamically, and the home/header layout must win that final cascade.
  function loadHomeLayoutStyles() {
    var id = "hesed-memory-home-layout-final";
    if (document.getElementById(id)) return;
    var link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "css/hesed-memory-home-layout-v3.css?v=20261122-final-layout-v3";
    document.head.appendChild(link);
  }

  function sessionFrom(value) {
    if (!value) return null;
    if (value.data && value.data.session) return value.data.session;
    if (value.session) return value.session;
    if (value.user) return value;
    return null;
  }

  function buildMarkup() {
    var header = document.createElement("header");
    header.className = "hesed-organic-site-header";
    header.id = "hesedArchivesTopblock";
    header.setAttribute("aria-label", "En-tête permanent Hesed Mémoire");
    header.innerHTML =
      '<div class="wrap header-inner">' +
        '<div class="brand">' +
          '<div aria-hidden="true" class="brand-logo" id="brandLogo"><span class="hesed-brand-plus">+</span></div>' +
          '<div class="brand-text">' +
            '<div class="site-name">Hesed Mémoire</div>' +
            '<div class="site-tag">Un espace personnel pour apprendre et se souvenir.</div>' +
          '</div>' +
        '</div>' +
        '<div class="search-box" id="searchIconHost">' +
          '<span class="hesed-header-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.3"></circle><path d="m16 16 4.2 4.2"></path></svg></span>' +
          '<input id="headerSearchInput" type="search" autocomplete="off" placeholder="Rechercher une mémorisation, une carte ou un cours…"/>' +
        '</div>' +
        '<button aria-label="Ouvrir Hesed" class="aurore-ia-header-btn" id="auroreIAHeaderBtn" title="Hesed" type="button"><span aria-hidden="true">✦</span><span>Hesed</span></button>' +
        '<div class="theme-switch" id="hesedHeaderThemeSwitch" role="group" aria-label="Mode d’affichage"></div>' +
        '<div class="color-theme-picker" id="hesedHeaderColorPicker" aria-label="Palette de couleurs"></div>' +
        '<div class="auth-zone" id="authZone">' +
          '<button class="hesed-topblock-auth" id="hesedTopblockAuth" type="button" aria-label="Se connecter avec Hesed ID">' +
            '<span class="hesed-topblock-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span>' +
            '<span class="hesed-topblock-auth-copy"><strong>Connexion</strong><small>Accès à votre espace</small></span>' +
          '</button>' +
          '<div class="user-chip" id="userChip" hidden>' +
            '<button class="user-chip-info" id="btnOuvrirProfil" title="Voir mon profil" type="button">' +
              '<img class="user-avatar" id="userAvatar" alt="" src="" hidden/>' +
              '<span id="userIconHost" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span>' +
              '<span id="userNom"></span>' +
            '</button>' +
            '<button class="user-chip-logout" id="btnDeconnexion" aria-label="Se déconnecter" title="Se déconnecter" type="button"><span aria-hidden="true">↪</span></button>' +
          '</div>' +
        '</div>' +
        '<button aria-label="Installer Hesed" class="pwa-install-btn" id="pwaInstallBtn" type="button"><span aria-hidden="true">⇩</span> Installer</button>' +
        '<a class="deposer-btn" id="btnDeposer" href="creer.html"><span id="uploadIconHost" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 16V4m-5 5 5-5 5 5M4 19h16"></path></svg></span> Ajouter du contenu</a>' +
      '</div>';
    return header;
  }

  function placeHeader(header) {
    var main = document.querySelector("main");
    if (main && main.parentNode) {
      main.parentNode.insertBefore(header, main);
      return;
    }
    document.body.insertBefore(header, document.body.firstChild);
  }

  function moveAppearanceControls(header) {
    var source = document.querySelector(".hesed-header-control-source");
    if (!source) return;

    var modeHost = header.querySelector("#hesedHeaderThemeSwitch");
    var paletteHost = header.querySelector("#hesedHeaderColorPicker");
    var modeChoices = source.querySelector(".theme-mode-choices");
    var themeToggle = source.querySelector("#themeToggle");
    var colorWrap = source.querySelector(".color-theme-wrap");

    // app.js creates .theme-mode-choices and binds its click handler before
    // this header script runs. Moving it preserves its event listeners.
    if (modeChoices && modeHost) modeHost.appendChild(modeChoices);
    else if (themeToggle && modeHost) {
      themeToggle.hidden = true;
      modeHost.appendChild(themeToggle);
    }
    if (colorWrap && paletteHost) paletteHost.appendChild(colorWrap);

    // The controls now live in the visible header; only remove the empty source.
    source.remove();
  }

  function bindAuth(header) {
    var loginButton = header.querySelector("#hesedTopblockAuth");
    var userChip = header.querySelector("#userChip");
    var userInfo = header.querySelector("#btnOuvrirProfil");
    var userLogout = header.querySelector("#btnDeconnexion");
    var userName = header.querySelector("#userNom");
    var userAvatar = header.querySelector("#userAvatar");
    var userIcon = header.querySelector("#userIconHost");

    function syncAuth(value) {
      var session = sessionFrom(value);
      var user = session && session.user;
      loginButton.hidden = !!user;
      userChip.hidden = !user;
      if (!user) {
        userName.textContent = "";
        userAvatar.hidden = true;
        userIcon.hidden = false;
        return;
      }

      var meta = user.user_metadata || {};
      var name = meta.full_name || meta.name || meta.preferred_username ||
        (user.email ? user.email.split("@")[0] : "Mon compte");
      userName.textContent = name;
      userInfo.title = "Voir le profil de " + name;

      var avatarUrl = meta.avatar_url || meta.picture || "";
      if (avatarUrl) {
        userAvatar.src = avatarUrl;
        userAvatar.hidden = false;
        userIcon.hidden = true;
      } else {
        userAvatar.hidden = true;
        userIcon.hidden = false;
      }
    }

    if (!loginButton.dataset.bound) {
      loginButton.dataset.bound = "1";
      loginButton.addEventListener("click", function () {
        var accessButton = document.getElementById("memoryAccessAuroreId");
        if (accessButton) {
          accessButton.click();
          return;
        }
        if (typeof window.auroreShowAccessGate === "function") {
          window.auroreShowAccessGate();
          return;
        }
        var signIn = document.getElementById("appMenuSignIn");
        if (signIn) signIn.click();
      });
    }

    if (!userInfo.dataset.bound) {
      userInfo.dataset.bound = "1";
      userInfo.addEventListener("click", function () {
        var account = document.getElementById("hesedSidebarAccount");
        if (account) account.click();
        else {
          var menu = document.getElementById("appMenuToggle");
          if (menu) menu.click();
        }
      });
    }

    if (!userLogout.dataset.bound) {
      userLogout.dataset.bound = "1";
      userLogout.addEventListener("click", async function () {
        userLogout.disabled = true;
        try {
          var auth = window.auroreAuth;
          if (window.auroreAuthReady) auth = await window.auroreAuthReady;
          if (!auth || typeof auth.signOut !== "function") {
            throw new Error("Le service de déconnexion n’est pas disponible.");
          }
          var result = await auth.signOut();
          if (result && result.error) throw result.error;
          if (typeof window.auroreToast === "function") {
            window.auroreToast("Vous êtes déconnecté d’Hesed Mémoire.");
          }
        } catch (error) {
          if (typeof window.auroreToast === "function") {
            window.auroreToast(error && error.message ? error.message : "La déconnexion a échoué.");
          }
        } finally {
          userLogout.disabled = false;
        }
      });
    }

    window.addEventListener("aurore:auth-changed", function (event) {
      syncAuth(event && event.detail ? (event.detail.session || event.detail) : null);
    });

    (async function restoreSession() {
      try {
        var auth = window.auroreAuth;
        if (window.auroreAuthReady) auth = await window.auroreAuthReady;
        if (auth && typeof auth.getSession === "function") syncAuth(await auth.getSession());
        else syncAuth(null);
      } catch (_) {
        syncAuth(null);
      }
    })();
  }

  function bindSearch(header) {
    var topInput = header.querySelector("#headerSearchInput");
    var heroInput = document.getElementById("hesedMemorySearchInput");
    var heroForm = document.getElementById("hesedMemorySearch");
    if (!topInput) return;

    if (heroInput) {
      topInput.addEventListener("input", function () {
        heroInput.value = topInput.value;
        heroInput.dispatchEvent(new Event("input", { bubbles: true }));
      });
      heroInput.addEventListener("input", function () {
        if (topInput.value !== heroInput.value) topInput.value = heroInput.value;
      });
    }

    topInput.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;
      event.preventDefault();
      var query = topInput.value.trim();
      if (heroInput && heroForm) {
        heroInput.value = query;
        heroForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      } else {
        window.location.href = "mes-memoires.html" + (query ? "?q=" + encodeURIComponent(query) : "");
      }
    });
  }

  function mount() {
    if (!document.body) return;
    loadHomeLayoutStyles();

    var existing = document.getElementById("hesedArchivesTopblock");
    var header = existing || buildMarkup();
    if (!existing) placeHeader(header);

    // Avoid duplicate headers if a cached page fragment was restored.
    document.querySelectorAll("body>header.hesed-organic-site-header").forEach(function (node) {
      if (node !== header) node.remove();
    });

    moveAppearanceControls(header);
    bindAuth(header);
    bindSearch(header);

    header.dataset.sharedReady = "1";
    header.dataset.ready = "1";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
