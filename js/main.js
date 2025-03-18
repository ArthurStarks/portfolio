// Gestion de la navigation et du footer
let lastScroll = 0;
let lastScrollTop = 0;
const nav = document.querySelector('.nav');
const footer = document.querySelector('.footer');
const footerScroll = document.querySelector('.footer-scroll');

// Fonction pour gérer l'affichage/masquage de la navigation et du footer
function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Gestion de la navigation
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }
    
    // Gestion du footer
    if (currentScroll + window.innerHeight >= document.documentElement.scrollHeight - 100) {
        footer.classList.add('hidden');
    } else {
        footer.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
}

// Écouteur d'événement pour le scroll
window.addEventListener('scroll', handleScroll);

// Gestion de l'overlay des projets
const items = document.querySelectorAll('.item');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('#close-btn');
const projectName = document.querySelector('#project-name');
const projectCategory = document.querySelector('#project-category');
const projectDesc = document.querySelector('#project-desc');
const projectLink = document.querySelector('#project-link');
const projectImg = document.querySelector('#project-img');

// Données des projets
const projects = {
    '@ArthurStarks': {
        category: 'Design Web',
        description: 'Portfolio personnel et professionnel.',
        link: 'https://arthurstarks.com',
        image: 'images/arthur_site.png'
    }
};

// Fonction pour ouvrir l'overlay
function openOverlay(projectName) {
    const project = projects[projectName];
    if (project) {
        projectName.textContent = projectName;
        projectCategory.textContent = project.category;
        projectDesc.textContent = project.description;
        projectLink.href = project.link;
        projectImg.src = project.image;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fonction pour fermer l'overlay
function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Écouteurs d'événements pour les projets
items.forEach(item => {
    item.addEventListener('click', () => {
        const name = item.querySelector('.item-name').textContent.trim();
        openOverlay(name);
    });
});

// Écouteur d'événement pour le bouton de fermeture
closeBtn.addEventListener('click', closeOverlay);

// Fermer l'overlay en cliquant en dehors
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeOverlay();
    }
});

// Animation GSAP pour les éléments de la page
gsap.from('.item', {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Animation GSAP pour l'overlay
gsap.from('.overlay-header', {
    duration: 0.6,
    y: -50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.2
});

gsap.from('.project-details', {
    duration: 0.6,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.4
});

gsap.from('#project-img', {
    duration: 0.8,
    scale: 0.95,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6
});

// Animation de défilement fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation des éléments au défilement
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.gallery-item, .info-card').forEach(el => {
    observer.observe(el);
});

// Curseur personnalisé
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Animation du curseur sur les éléments interactifs
const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .info-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Fonction pour gérer la visibilité du footer lors du défilement
function handleFooterVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Afficher le footer si on est en bas de la page
    if (scrollTop + windowHeight >= documentHeight - 100) {
        footer.classList.remove('hidden');
    } else {
        // Cacher le footer si on défile vers le bas
        if (scrollTop > lastScrollTop) {
            footer.classList.add('hidden');
        } else {
            // Afficher le footer si on défile vers le haut
            footer.classList.remove('hidden');
        }
    }

    lastScrollTop = scrollTop;
}

// Fonction pour faire défiler vers le haut avec animation GSAP
function scrollToTop() {
    gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: "power2.inOut"
    });
}

// Animation des éléments au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.gallery-item, .info-card');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            gsap.to(el, {
                duration: 1,
                opacity: 1,
                y: 0,
                ease: "power2.out"
            });
        }
    });
};

// Animation du titre avec GSAP
gsap.from('.brazzaville-content h2', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power3.out",
    delay: 0.5
});

// Animation de la description
gsap.from('.brazzaville-description', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power3.out",
    delay: 1
});

// Animation des cartes d'information
gsap.from('.info-card', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    delay: 1.5
});

// Animation des images de la galerie
gsap.from('.gallery-item', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    delay: 2
});

// Animation du footer
gsap.from('.footer', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: "power3.out",
    delay: 2.5
});

// Animation des capitales dans le footer
const capitals = document.querySelectorAll('.capital');
capitals.forEach((capital, index) => {
    gsap.from(capital, {
        duration: 0.5,
        x: 100,
        opacity: 0,
        ease: "power2.out",
        delay: 3 + (index * 0.2)
    });
});

// Écouteurs d'événements
window.addEventListener('scroll', () => {
    handleFooterVisibility();
    animateOnScroll();
});

footerScroll.addEventListener('click', scrollToTop);

// Initialisation
handleFooterVisibility();
animateOnScroll();

// Animation de parallaxe pour les images
document.addEventListener('mousemove', (e) => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    galleryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;

        const angleX = (mouseY - itemY) / 30;
        const angleY = (mouseX - itemX) / 30;

        gsap.to(item, {
            duration: 0.5,
            rotateX: -angleX,
            rotateY: angleY,
            ease: "power2.out"
        });
    });
}); 