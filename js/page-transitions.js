// Gestion des transitions de page et du préchargeur
document.addEventListener('DOMContentLoaded', function() {
    // Préchargeur
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            // Afficher le contenu avec animation
            document.querySelectorAll('.content-fade').forEach(element => {
                element.classList.add('visible');
            });
        }, 500);
    }

    // Intercepter les clics sur les liens pour ajouter la transition
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        
        // Vérifier si c'est un lien valide, interne et pas un lien d'ancrage
        if (link && 
            link.href && 
            link.href.startsWith(window.location.origin) && 
            !link.href.includes('#') && 
            !link.getAttribute('target')) {
            
            e.preventDefault();
            const targetHref = link.href;
            
            // Activer la transition
            const pageTransition = document.querySelector('.page-transition');
            if (pageTransition) {
                pageTransition.classList.add('active');
                
                // Naviguer vers la page après une courte transition
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 300);
            } else {
                // Si l'élément de transition n'existe pas, naviguer directement
                window.location.href = targetHref;
            }
        }
    });
});
