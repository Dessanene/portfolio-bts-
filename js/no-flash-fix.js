// Solution renforcée pour éliminer complètement le flash blanc lors des transitions de page

// Fonction immédiatement exécutée pour appliquer un fond noir avant tout chargement
(function() {
    // Force le fond noir dès le début
    document.documentElement.style.backgroundColor = '#121212';
    
    // Crée un élément style pour forcer le fond noir globalement
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        html, body {
            background-color: #121212 !important;
            transition: none !important;
        }
        .page-transition {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #121212;
            z-index: 9999;
            pointer-events: none;
        }
    `;
    
    // Ajoute l'élément style le plus tôt possible
    document.head.appendChild(style);
})();

// Configuration principale une fois le DOM chargé
document.addEventListener('DOMContentLoaded', function() {
    // Référence aux éléments de transition
    const preloader = document.querySelector('.preloader');
    const pageTransition = document.querySelector('.page-transition');
    
    // Crée un élément de transition s'il n'existe pas
    if (!pageTransition) {
        const transitionDiv = document.createElement('div');
        transitionDiv.className = 'page-transition';
        document.body.appendChild(transitionDiv);
    }
    
    // Cache le préchargeur après le chargement complet
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 300);
            }, 300);
        });
    }
    
    // Force le fond noir en continu
    function forceBlackBackground() {
        document.documentElement.style.backgroundColor = '#121212';
        document.body.style.backgroundColor = '#121212';
    }
    
    // S'exécute toutes les 10ms pour garantir que le fond reste noir
    const intervalId = setInterval(forceBlackBackground, 10);
    
    // Intercepte tous les clics sur les liens pour forcer le fond noir lors des navigations
    document.addEventListener('click', function(e) {
        // Vérifie si l'élément cliqué est un lien ou a un parent qui est un lien
        let target = e.target;
        let isLink = false;
        
        // Remonte l'arbre DOM pour trouver si un parent est un lien
        while (target && target !== document) {
            if (target.tagName && target.tagName.toLowerCase() === 'a') {
                isLink = true;
                break;
            }
            target = target.parentNode;
        }
        
        // Si c'est un lien interne, force le fond noir
        if (isLink && target.getAttribute('href') && 
            !target.getAttribute('href').startsWith('http') && 
            !target.getAttribute('href').startsWith('#') &&
            !target.getAttribute('download') &&
            target.getAttribute('target') !== '_blank') {
            
            forceBlackBackground();
            
            // Force encore le fond noir juste avant la navigation
            setTimeout(forceBlackBackground, 0);
        }
    });
    
    // Force le fond noir avant le déchargement de la page
    window.addEventListener('beforeunload', forceBlackBackground);
    window.addEventListener('unload', forceBlackBackground);
    
    // Applique également lors de la navigation avec les boutons du navigateur
    window.addEventListener('pageshow', forceBlackBackground);
    window.addEventListener('pagehide', forceBlackBackground);
});

// Fonction de secours qui s'exécute même si le DOMContentLoaded a déjà eu lieu
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    document.documentElement.style.backgroundColor = '#121212';
    document.body.style.backgroundColor = '#121212';
}
