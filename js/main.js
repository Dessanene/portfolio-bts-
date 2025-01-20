// Animation du menu au défilement
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
});

// Typing Effect
const typingElement = document.querySelector('.typing');
const phrases = [
    'Développeur Web',
    'Administrateur Systèmes',
    'Passionné de Cybersécurité',
    'Étudiant en BTS SIO'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 200;
    } else {
        typingDelay = isDeleting ? 50 : 100;
    }

    setTimeout(type, typingDelay);
}

// Start typing effect
setTimeout(type, typingDelay);

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

// Mise à jour du lien actif pendant le défilement
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
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
            value: '#ff0000'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff0000',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
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
        }
    },
    retina_detect: true
});

// Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const formData = {
            nom: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };

        // Ici, vous pourrez ajouter la logique d'envoi du formulaire
        console.log('Formulaire soumis :', formData);
        
        // Réinitialisation du formulaire
        this.reset();
        alert('Message envoyé ! (simulation)');
    });
}

// Gestion des carrousels
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(container => {
        const carousel = container.querySelector('.skills-carousel');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');
        const cardWidth = 300 + 16; // Largeur de la carte + gap

        // Fonction pour faire défiler
        const scroll = (direction) => {
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        };

        // Écouteurs d'événements pour les boutons
        prevButton.addEventListener('click', () => scroll('left'));
        nextButton.addEventListener('click', () => scroll('right'));

        // Navigation au clavier
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') scroll('left');
            if (e.key === 'ArrowRight') scroll('right');
        });

        // Navigation tactile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) scroll('right');
            if (touchEndX - touchStartX > 50) scroll('left');
        });
    });
});

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
