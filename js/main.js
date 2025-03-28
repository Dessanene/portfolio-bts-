// Animation du menu au défilement - DÉSACTIVÉE POUR AVOIR UNE COULEUR CONSTANTE
// Supprimer le changement de couleur au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('scrolled');
    }
});

// Typing Effect remplacé par texte statique professionnel
const typingElement = document.querySelector('.typing');
if (typingElement) {
    typingElement.textContent = 'Développeur Web';
    typingElement.style.borderRight = 'none'; // Supprime le curseur clignotant
}

// Intersection Observer pour les animations de section
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            if (entry.target.classList.contains('section-transition')) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section-transition');
    sectionObserver.observe(section);
});

// Smooth scroll amélioré
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Ajouter la classe active au lien
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Animation de défilement fluide
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gestion des carrousels
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const container = carousel.querySelector('.carousel-items');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        
        if (!container || !prevButton || !nextButton) return;

        // Fonction pour faire défiler
        const scroll = (direction) => {
            const scrollAmount = container.clientWidth;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        };

        // Écouteurs d'événements pour les boutons
        prevButton.addEventListener('click', () => scroll('left'));
        nextButton.addEventListener('click', () => scroll('right'));
    });
});

// Configuration et initialisation des particules
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#4a6bff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#4a6bff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validation simple
    if (!name || !email || !message) {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    // Ici, vous pouvez ajouter le code pour envoyer le formulaire
    console.log('Formulaire envoyé:', { name, email, message });
    
    // Réinitialisation du formulaire
    contactForm.reset();
    
    // Message de confirmation
    alert('Merci pour votre message ! Je vous répondrai dès que possible.');
}

// Gestion des liens sociaux
document.addEventListener('DOMContentLoaded', () => {
    const linkedinLink = document.querySelector('.social-link.linkedin');
    if (linkedinLink) {
        linkedinLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://www.linkedin.com/in/dessanene-sanhan-ba5174205/', '_blank');
        });
    }
});

// Fonction pour mettre à jour l'horloge
function updateClock() {
    const now = new Date();
    
    // Format de l'heure (HH:MM:SS)
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format de la date (Jour Mois Année)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('fr-FR', options);
    
    // Mise à jour des éléments HTML
    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;
}

// Mettre à jour l'horloge toutes les secondes
setInterval(updateClock, 1000);

// Initialiser l'horloge au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
});
