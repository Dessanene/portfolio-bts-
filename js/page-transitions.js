// Script de transition modifié pour résoudre le problème d'écran noir sur Render
document.addEventListener('DOMContentLoaded', function() {
    // Suppression du forçage du fond noir pour le déploiement sur Render
    // document.body.style.backgroundColor = '#121212';
    // document.documentElement.style.backgroundColor = '#121212';
    
    // Préchargeur: Masquer après le chargement complet
    const preloader = document.querySelector('.preloader');
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
    
    // Désactivation du forçage du fond noir lors du déchargement de la page
    // window.addEventListener('beforeunload', function() {
    //     document.body.style.backgroundColor = '#121212';
    //     document.documentElement.style.backgroundColor = '#121212';
    // });
});
