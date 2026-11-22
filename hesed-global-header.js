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
    header.setAttribute('aria-label','En-tête permanent Hesed Mémoire');
    header.innerHTML=
      '<div class="wrap header-inner">'+
        '<div class="brand">'+
          '<div aria-hidden="true" class="brand-logo" id="brandLogo"><span class="hesed-brand-plus">+</span></div>'+
          '<div class="brand-text">'+
            '<div class="site-name">Hesed Mémoire</div>'+
            '<div class="site-tag">Un espace personnel pour apprendre et se souvenir.</div>'+
          '</div>'+
        '</div>'+
        '<div class="search-box" id="searchIconHost">'+
          '<span class="hesed-header-search-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.3"></circle><path d="m16 16 4.2 4.2"></path></svg></span>'+
          '<input autocomplete="off" id="headerSearchInput" placeholder="Rechercher une mémorisation, une carte ou un cours…" type="search"/>'+
        '</div>'+
        '<button aria-label="Ouvrir Hesed" class="aurore-ia-header-btn" id="auroreIAHeaderBtn" title="Hesed" type="button"><span aria-hidden="true">✦</span><span>Hesed</span></button>'+
        '<div class="auth-zone" id="authZone">'+
          '<button class="hesed-topblock-auth" id="hesedTopblockAuth" type="button" aria-label="Se connecter avec Hesed ID">'+
            '<span class="hesed-topblock-auth-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span>'+
            '<span class="hesed-topblock-auth-copy"><strong>Connexion</strong><small>Accès à votre espace</small></span>'+
          '</button>'+
          '<div class="user-chip" id="userChip" style="display:none;">'+
            '<button class="user-chip-info" id="btnOuvrirProfil" title="Voir mon profil" type="button">'+
              '<span id="userIconHost" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20a7 7 0 0 1 14 0"></path></svg></span>'+
              '<span id="userNom"></span>'+
            '</button>'+
            '<button aria-label="Se déconnecter" class="user-chip-logout" id="btnDeconnexion" title="Se déconnecter" type="button"><span aria-hidden="true" class="user-chip-logout-icon">↪</span><span class="user-chip-logout-label">Déconnexion</span></button>'+
          '</div>'+
        '</div>'+
        '<a class="deposer-btn" id="btnDeposer" href="creer.html"><span id="uploadIconHost" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 16V4m-5 5 5-5 5 5M4 19h16"></path></svg></span> Ajouter du contenu</a>'+
        '<div class="hesed-topblock-mode-slot" id="hesedTopblockModeSlot" aria-label="Mode d’affichage"></div>'+
        '<div class="hesed-topblock-palette-slot" id="hesedTopblockPaletteSlot" aria-label="Palette de couleurs"></div>'+
      '</div>';
    return header;
  }

  function placeHeader(header){
    var main=document.querySelector('main');
    if(main&&main.parentNode){main.parentNode.insertBefore(header,main);return;}
    document.body.insertBefore(header,document.body.firstChild);
  }

  function mount(){
    if(!document.body)return;
    var headers=document.querySelectorAll('#hesedArchivesTopblock');
    var header=headers.length?headers[0]:null;
    if(!header){header=buildMarkup();placeHeader(header);}
    headers.forEach(function(node){if(node!==header)node.remove();});
    header.dataset.sharedReady='1';
    header.dataset.ready='1';

    var modeSlot=header.querySelector('#hesedTopblockModeSlot');
    var paletteSlot=header.querySelector('#hesedTopblockPaletteSlot');
    var legacySource=document.querySelector('.hesed-header-control-source');
    if(legacySource){
      var modeChoices=legacySource.querySelector('.theme-mode-choices');
      var colorWrap=legacySource.querySelector('.color-theme-wrap');
      if(modeChoices&&modeSlot)modeSlot.appendChild(modeChoices);
      if(colorWrap&&paletteSlot)paletteSlot.appendChild(colorWrap);
    }

    function removeLegacyHeaders(){
      document.querySelectorAll('.topbar,.aurore-ia-topbar,.hesed-unified-topbar,#hesedGlobalHeader,[data-hesed-legacy-header]').forEach(function(node){
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

    var loginButton=header.querySelector('#hesedTopblockAuth');
    var userChip=header.querySelector('#userChip');
    var userInfo=header.querySelector('#btnOuvrirProfil');
    var userLogout=header.querySelector('#btnDeconnexion');
    var userNom=header.querySelector('#userNom');
    function syncAuth(value){
      var session=sessionFrom(value),user=session&&session.user;
      var displayName='Mon compte';
      if(user){
        var meta=user.user_metadata||{};
        displayName=meta.full_name||meta.name||meta.preferred_username||(user.email?user.email.split('@')[0]:'Mon compte');
      }
      if(loginButton)loginButton.style.display=user?'none':'inline-flex';
      if(userChip)userChip.style.display=user?'flex':'none';
      if(userNom)userNom.textContent=displayName;
      if(userInfo)userInfo.title=user?'Voir le profil de '+displayName:'Voir mon profil';
      if(userLogout)userLogout.style.display=user?'inline-flex':'none';
    }
    if(loginButton&&!loginButton.dataset.bound){
      loginButton.dataset.bound='1';
      loginButton.addEventListener('click',function(){
        var direct=document.getElementById('memoryAccessAuroreId');
        if(direct){direct.click();return;}
        if(typeof window.auroreShowAccessGate==='function'){window.auroreShowAccessGate();return;}
        var signIn=document.getElementById('appMenuSignIn');
        if(signIn)signIn.click();
      });
    }
    if(userInfo&&!userInfo.dataset.bound){
      userInfo.dataset.bound='1';
      userInfo.addEventListener('click',function(){
        var account=document.getElementById('hesedSidebarAccount');
        if(account){account.click();return;}
        var profile=document.getElementById('appMenuProfile');
        if(profile)profile.click();
      });
    }
    window.addEventListener('aurore:auth-changed',function(e){syncAuth(e&&e.detail?e.detail.session||e.detail:e);});
    (async function(){
      try{
        var auth=window.auroreAuth;
        if(window.auroreAuthReady)auth=await window.auroreAuthReady;
        if(auth&&typeof auth.getSession==='function')syncAuth(await auth.getSession());
        else syncAuth(null);
      }catch(_){syncAuth(null);}
    })();

    var headerSearchInput=header.querySelector('#headerSearchInput');
    var heroInput=document.getElementById('hesedMemorySearchInput');
    var heroForm=document.getElementById('hesedMemorySearch');
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
