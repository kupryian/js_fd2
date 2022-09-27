//   "use strict";

  window.onhashchange=switchToStateFromURLHash;


  function switchToStateFromURLHash() {
    var URLHash=window.location.hash;


    let pageHTML = '';
    
    switch ( URLHash ) {
      case '#home':
        pageHTML+="<h3>Стартовый экран</h3>";
        break;
      case '#game':
        pageHTML+="<h3>Старт игры</h3>";
        break;
      case '#records':
        pageHTML+="<h3>рекорды</h3>";
        break;
    //   case '#game-page':
    //     pageHTML+=`    <div id="field"></div>`;
    //     break;  
    //   case '#exit-page':
    //     pageHTML+="<h3>Выход</h3>";
    //     break;
    }
    document.getElementById('app').innerHTML=pageHTML;

  }

  function switchToState(newState) {
    location.hash=newState.pagename;
  }

  function switchToStartScreePage() {
    switchToState( { pagename:'home' } );
  }

  function switchToStartPage() {
    switchToState( { pagename:'game' } );
  }

  function switchToSettingsPage() {
    switchToState( { pagename:'records' } );
  }

  switchToStateFromURLHash();
