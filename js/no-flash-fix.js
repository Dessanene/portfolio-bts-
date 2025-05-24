// Solution améliorée pour éviter le flash blanc sans masquer le contenu

// Configuration initiale du fond pour éviter le flash blanc
(function() {
    // Définit la couleur de fond initiale sans bloquer le contenu
    document.documentElement.style.backgroundColor = '#121212';
    
    // Style de base pour les transitions
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        html, body {
            background-color: #121212;
            transition: background-color 0.3s ease;
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
            opacity: 0;
            transition: opacity 0.3s ease;
        }
    `;
    
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
    
    // Gestion des transitions de page
    document.addEventListener('click', function(e) {
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
        
        // Si c'est un lien interne, prépare la transition
        if (isLink && target.getAttribute('href') && 
            !target.getAttribute('href').startsWith('http') && 
            !target.getAttribute('href').startsWith('#') &&
            !target.getAttribute('download') &&
            target.getAttribute('target') !== '_blank') {
            
            // Animation de transition légère
            if (pageTransition) {
                pageTransition.style.opacity = '0.3';
                setTimeout(function() {
                    pageTransition.style.opacity = '0';
                }, 300);
            }
        }
    });
});

// S'assurer que le contenu est visible quand la page est complètement chargée
window.addEventListener('load', function() {
    // Supprimer tout style forcé qui pourrait bloquer l'affichage
    setTimeout(function() {
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
    }, 500);
});
