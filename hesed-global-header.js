(function(){
  'use strict';
  if(window.__hesedGlobalHeaderReady)return;
  window.__hesedGlobalHeaderReady=true;

  function sessionFrom(value){
    if(!value)return null;
    if(value.data&&value.data.session)return value.data.session;
    if(value.session)return value.session;
    if(value.user)return value;
    return null;
  }

  function buildMarkup(){
    var header=document.createElement('header');
    header.className='hesed-organic-site-header';
    header.id='hesedArchivesTopblock';
    header.setAttribute('aria-label','En-t\u0018te permanent Hesed M\u001bmoire');
    header.innerHTML=
      '<div class="wrap header-inner">'+
        '<div class="brand">'+
          '<div aria-hidden="true" class="brand-logo" id="brandLogo"></div>'+
          '<div class="brand-text">'+
            '<div class="site-name">Hesed M\u001bmoire</div>'+
            '<div class="site-tag">Un espace personnel pour apprendre et se souvenir.</div>'+
          '</div>'+
        '</div>'+
        '<div class="search-box" id="searchIconHost">'+
          '<input id="hesedTopblockSearchInput" placeholder="Rechercher une m\u001bmorisation, une carte ou un cours\u2026" type="text"/>'+
        '</div>'+
        '<button aria-label="Ouvrir Hesed" class="aurore-ia-header-btn" id="auroreIAHeaderBtn" title="Hesed" type="button"><span aria-hidden="true">\u2726</span><span>Hesed</span></button>'+
        '<div aria-label="Choix du th\u0018me" class="theme-switch" id="themeSwitch" role="group">'+
          '<button aria-pressed="false" class="theme-switch-btn" data-theme-choice="sombre" title="Th\u0018me sombre" type="button"><span class="theme-icon-host" data-icon="moon"></span></button>'+
          '<button aria-pressed="false" class="theme-switch-btn" data-theme-choice="clair" title="Th\u0018me clair" type="button"><span class="theme-icon-host" data-icon="sun"></span></button>'+
          '<button aria-pressed="false" class="theme-switch-btn" data-theme-choice="systeme" title="Th\u0018me syst\u0018me" type="button"><span class="theme-icon-host" data-icon="monitor"></span></button>'+
        '</div>'+
        '<div class="color-theme-picker" id="colorThemePicker">'+
          '<button aria-expanded="false" aria-haspopup="true" class="color-theme-btn" id="colorThemeBtn" title="Couleur du site" type="button">'+
            '<span aria-hidden="true" class="color-theme-btn-dot" id="colorThemeBtnDot"></span>'+
          '</button>'+
          '<div aria-hidden="true" aria-label="Choisir la couleur du site" class="color-theme-flyout" id="colorThemeFlyout" role="menu">'+
            '<div class="color-theme-flyout-head">'+
              '<span>Couleur du site</span>'+
              '<strong id="colorThemeFlyoutCurrent">Violet</strong>'+
            '</div>'+
            '<div class="color-theme-flyout-scroll" id="colorThemeFlyoutScroll">'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="violet" title="Violet" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="rouge" title="Rouge" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="vert" title="Vert" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="bleu" title="Bleu" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="orange" title="Orange" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="rose" title="Rose" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="indigo" title="Indigo" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="emeraude" title="\u0013meraude" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="lime" title="Citron vert" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="corail" title="Corail" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="bordeaux" title="Bordeaux" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="azur" title="Azur" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="jaune" title="Jaune" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="cyan" title="Cyan" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="turquoise" title="Turquoise" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="sarcelle" title="Sarcelle" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="magenta" title="Magenta" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="fuchsia" title="Fuchsia" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="pourpre" title="Pourpre" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="prune" title="Prune" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="or" title="Or" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="ambre" title="Ambre" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="menthe" title="Menthe" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="lavande" title="Lavande" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="safran" title="Safran" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="petrole-cuivre" title="P\u001atrole & cuivre" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="nuit-peche" title="Nuit & p\u001ache" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="prune-rouge" title="Prune & rouge" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="terre-orange" title="Terre & orange" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="rose-sable" title="Rose poudr\u001ae" type="button"></button>'+
              '<button aria-pressed="false" class="theme-color-swatch" data-color-choice="sarcelle-creme" title="Sarcelle & cr\u0018me" type="button"></button>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="auth-zone" id="authZone">'+
        '<div id="gSignInBtn"></div>'+
        '<div class="user-chip" id="userChip" style="display:none;">'+
          '<button class="user-chip-info" id="btnOuvrirProfil" title="Voir mon profil" type="button">'+
            '<img alt="" class="user-avatar" decoding="async" id="userAvatar" loading="lazy" src=""/>'+
            '<span id="userIconHost"></span>'+
            '<span id="userNom"></span>'+
          '</button>'+
          '<button aria-label="Se d\u0019connecter" class="user-chip-logout" id="btnDeconnexion" title="Se d\u0019connecter" type="button"><span aria-hidden="true" class="user-chip-logout-icon">\u21aa</span><span class="user-chip-logout-label">D\u0019connexion</span></button>'+
        '</div>'+
      '</div>'+
      '<button aria-label="Installer Hesed" class="pwa-install-btn" id="pwaInstallBtn" type="button"><span aria-hidden="true">\u21e9</span> Installer</button>'+
      '<a class="deposer-btn" id="btnDeposer" href="creer.html"><span id="uploadIconHost"></span> Ajouter du contenu</a>'+
      '<div class="hesed-topblock-tools">'+
        '<div class="hesed-topblock-mode-slot" id="hesedTopblockModeSlot" aria-label="Mode d\u0019affichage"></div>'+
        '<div class="hesed-topblock-palette-slot" id="hesedTopblockPaletteSlot" aria-label="Palette de couleurs"></div>'+
      '<form class="hesed-topblock-search" id="hesedTopblockSearch" role="search" style="display:none;"><button type="submit" style="display:none;"></button></form>' +
      '</div>' +
    return header;
  }

  function placeHeader(header){
    var main=document.querySelector('main');
    if(main&&main.parentNode){main.parentNode.insertBefore(header,main);return}
    var app=document.querySelector('#screen-aurore-ia .aurore-ia-app');
    if(app){app.insertBefore(header,app.firstChild);return}
    document.body.insertBefore(header,document.body.firstChild);
  }

  function mount(){
    if(!document.body)return;
    var headers=document.querySelectorAll('#hesedArchivesTopblock');
    var header=headers.length?headers[0]:null;
    if(!header){
      header=buildMarkup();
      placeHeader(header);
    }
    headers.forEach(function(node){if(node!==header)node.remove()});
    header.dataset.sharedReady='1';
    header.dataset.ready='1';

    // Pull appearance controls out of the hidden legacy header source before deleting it.
    var themeSwitch=header.querySelector('#themeSwitch');
    var colorThemePicker=header.querySelector('#colorThemePicker');
    var modeSlot=header.querySelector('#hesedTopblockModeSlot');
    var paletteSlot=header.querySelector('#hesedTopblockPaletteSlot');

    // Transfer theme controls from hidden source
    var legacySource=document.querySelector('.hesed-header-control-source');
    if(legacySource){
      var modeChoices=legacySource.querySelector('.theme-mode-choices');
      var colorWrap=legacySource.querySelector('.color-theme-wrap');
      
      if(modeChoices&&modeSlot){
        modeSlot.appendChild(modeChoices);
      }
      
      if(colorWrap&&paletteSlot){
        paletteSlot.appendChild(colorWrap);
      }
    }

    // Keep the appearance controls alive if a page had not yet built the mode group.
    var themeButton=document.querySelector('.hesed-header-control-source #themeToggle');
    if(!themeSwitch&&themeButton&&modeSlot){
      modeSlot.appendChild(themeButton);
    }

    // One shared header only: transfer controls, then remove every legacy header.
    function removeLegacyHeaders(){
      var selector='.topbar,.aurore-ia-topbar,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]';
      document.querySelectorAll(selector).forEach(function(node){
        if(node!==header&&!node.contains(header))node.remove();
      });
      document.querySelectorAll('.hesed-header-control-source').forEach(function(node){
        if(node!==header&&!node.contains(header))node.remove();
      });
    }
    removeLegacyHeaders();
    if(!window.__hesedLegacyHeaderObserver&&window.MutationObserver){
      window.__hesedLegacyHeaderObserver=new MutationObserver(function(records){
        var added=false;
        records.forEach(function(record){
          record.addedNodes&&record.addedNodes.forEach(function(node){
            if(node.nodeType===1&&(node.matches('.topbar,.aurore-ia-topbar,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]')||node.querySelector('.topbar,.aurore-ia-topbar,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]')))added=true;
          });
        });
        if(added)removeLegacyHeaders();
      });
      window.__hesedLegacyHeaderObserver.observe(document.body,{childList:true,subtree:true});
    }

    // Sync auth state
    var authButton=header.querySelector('#btnOuvrirProfil,#btnDeconnexion');
    function syncAuth(value){
      var session=sessionFrom(value),user=session&&session.user;
      var userChip=header.querySelector('#userChip');
      var userInfo=header.querySelector('#btnOuvrirProfil');
      var userLogout=header.querySelector('#btnDeconnexion');
      var userAvatar=header.querySelector('#userAvatar');
      var userNom=header.querySelector('#userNom');
      var userIconHost=header.querySelector('#userIconHost');
      
      if(userChip){
        userChip.style.display=user?'block':'none';
      }
      if(userInfo){
        var text='Mon compte';
        if(user){
          var meta=user.user_metadata||{};
          text=meta.full_name||meta.name||meta.preferred_username||
            (user.email?user.email.split('@')[0]:'Mon compte');
        }
        userInfo.textContent=text;
        userInfo.title=user?'Voir mon profil':'Voir mon profil';
      }
      if(userLogout){
        userLogout.style.display=user?'block':'none';
      }
      if(userNom&&user){
        var meta=user.user_metadata||{};
        userNom.textContent=meta.full_name||meta.name||meta.preferred_username||
          (user.email?user.email.split('@')[0]:'');
      }
      if(userAvatar&&user&&user.user_metadata&&user.user_metadata.avatar_url){
        userAvatar.src=user.user_metadata.avatar_url;
      }
      if(userIconHost&&!userIconHost.querySelector('svg')&&user){
        userIconHost.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/><path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
      }
    }
    
    if(authButton&&!authButton.dataset.bound){
      authButton.dataset.bound='1';
      authButton.addEventListener('click',function(){
        var account=document.getElementById('hesedSidebarAccount');
        if(account){account.click();return}
        var signIn=document.getElementById('appMenuSignIn');
        if(signIn){signIn.click();return}
        var assistantLogin=document.getElementById('auroreAssistantLogin');
        if(assistantLogin){assistantLogin.click();return}
        if(typeof window.auroreShowAccessGate==='function')window.auroreShowAccessGate();
      });
      window.addEventListener('aurore:auth-changed',function(e){syncAuth(e&&e.detail?e.detail.session||e.detail:e)});
      (async function(){
        try{
          var auth=window.auroreAuth;
          if(window.auroreAuthReady)auth=await window.auroreAuthReady;
          if(auth&&typeof auth.getSession==='function')syncAuth(await auth.getSession());
        }catch(_){}
      })();
    }

    // Search form sync with hero
    var headerSearchInput=header.querySelector('#headerSearchInput');
    var heroInput=document.getElementById('hesedMemorySearchInput');
    var heroForm=document.getElementById('hesedMemorySearch');
    var topForm=document.getElementById('hesedTopblockSearch');
    if(headerSearchInput&&!headerSearchInput.dataset.bound){
      headerSearchInput.dataset.bound='1';
      if(heroInput){
        headerSearchInput.addEventListener('input',function(){
          heroInput.value=headerSearchInput.value;
          heroInput.dispatchEvent(new Event('input',{bubbles:true}));
        });
        heroInput.addEventListener('input',function(){
          if(headerSearchInput.value!==heroInput.value)headerSearchInput.value=heroInput.value;
        });
      }
      headerSearchInput.addEventListener('keydown',function(e){
        if(e.key==='Enter'){
          e.preventDefault();
          var query=headerSearchInput.value.trim();
          if(heroInput&&heroForm){
            heroInput.value=query;
            heroForm.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
          }else{
            window.location.href='mes-memoires.html'+(query?'?q='+encodeURIComponent(query):'');
          }
        }
      });
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
