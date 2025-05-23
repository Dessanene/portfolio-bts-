// Script de transition simple - Correction du flash blanc
document.addEventListener('DOMContentLoaded', function() {
    // Force le fond noir
    document.body.style.backgroundColor = '#121212';
    document.documentElement.style.backgroundColor = '#121212';
    
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
    
    // S'assurer que le fond reste noir
    window.addEventListener('beforeunload', function() {
        document.body.style.backgroundColor = '#121212';
        document.documentElement.style.backgroundColor = '#121212';
    });
});
