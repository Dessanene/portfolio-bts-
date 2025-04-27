// Script principal pour le portfolio professionnel

document.addEventListener('DOMContentLoaded', function() {
    // Force refresh for cache-busting (added for immediate update)
    const forceRefresh = () => {
        // Add timestamp to all stylesheets to prevent caching
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const url = new URL(link.href);
            url.searchParams.set('v', Date.now());
            link.href = url.toString();
        });
        
        // Add timestamp to all images to prevent caching
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.includes('data:')) {
                const url = new URL(img.src);
                url.searchParams.set('v', Date.now());
                img.src = url.toString();
            }
        });
        
        // Apply visibility to application cards specifically
        document.querySelectorAll('.application-card').forEach(card => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
            card.style.display = 'block';
        });
    };
    
    // Run force refresh immediately
    forceRefresh();
    
    // Animation smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ajout de la classe active dans la navigation lors du scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation pour les cartes lors du chargement
    const cards = document.querySelectorAll('.card, .application-card');
    
    function checkCards() {
        const triggerBottom = window.innerHeight * 0.8;
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if(cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialisation des animations
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkCards);
    checkCards(); // Vérification initiale
});
