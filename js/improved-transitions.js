// Script amélioré pour les transitions entre pages - Élimine les flashs blancs

document.addEventListener('DOMContentLoaded', function() {
    // Configuration des variables de couleur de fond
    const bgColor = '#121212'; // Même couleur que le thème sombre
    
    // Préchargement: Cacher le préchargeur après le chargement complet
    const preloader = document.querySelector('.preloader');
    const pageTransition = document.querySelector('.page-transition');
    
    // S'assurer que le préchargeur est masqué correctement
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }
    
    // Gestion des transitions entre pages
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;
    
    // Appliquer le fond sombre uniquement lors des transitions
    function applyBackgroundColor() {
        // Uniquement lors des transitions de page, pas en permanence
        document.body.classList.add('transitioning');
    }
    
    // Gérer les clics sur les liens internes
    const internalLinks = document.querySelectorAll('a[href^="index"], a[href^="profil"], a[href^="competences"], a[href^="veille"], a[href^="stages"], a[href^="situations"], a[href^="certifications"], a[href^="attestations"], a[href^="epreuve"], a[href^="dashboard"], a[href^="./"], a[href^="../"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Ne pas traiter les liens externes ou les liens qui ouvrent dans un nouvel onglet
            if (link.target === '_blank' || link.getAttribute('download') || link.getAttribute('href').startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            const destination = this.getAttribute('href');
            
            // Animation de sortie
            if (pageTransition) {
                pageTransition.style.transform = 'translateX(0%)';
                
                setTimeout(function() {
                    // Force le fond noir pendant la transition
                    document.body.style.backgroundColor = bgColor;
                    document.documentElement.style.backgroundColor = bgColor;
                    
                    // Navigation vers la nouvelle page
                    window.location.href = destination;
                }, 400);
            } else {
                // Fallback si l'élément de transition n'existe pas
                window.location.href = destination;
            }
        });
    });
    
    // Animation d'entrée
    if (pageTransition) {
        window.addEventListener('pageshow', function(e) {
            // Si la page est chargée depuis le cache (navigation retour/avant)
            if (e.persisted) {
                document.body.style.backgroundColor = bgColor;
                document.documentElement.style.backgroundColor = bgColor;
                
                pageTransition.style.transform = 'translateX(0%)';
                setTimeout(function() {
                    pageTransition.style.transform = 'translateX(100%)';
                }, 10);
            } else {
                // Navigation normale
                setTimeout(function() {
                    pageTransition.style.transform = 'translateX(100%)';
                }, 10);
            }
        });
    }
    
    // S'assurer que le fond reste sombre pendant tout le cycle de vie de la page
    window.addEventListener('beforeunload', function() {
        document.body.style.backgroundColor = bgColor;
        document.documentElement.style.backgroundColor = bgColor;
    });
});
