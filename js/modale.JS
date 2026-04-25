// Données des projets (vous pouvez les remplacer par vos propres données)
const projectsData = {
    1: {
        title: "MonBusiness",
        description: "Application de gestion de stock et de ventes pour petits commerçants. ",
        longDescription: "MonBusiness est né d'un besoin réel sur les marchés africains : aider les petits commerçants à voir leurs bénéfices réels.\n\nL'application calcule automatiquement le prix moyen pondéré malgré les variations de prix d'achat. Elle permet un suivi précis du stock sur smartphone, sans besoin de connexion internet constante.",
        image: "img/projets/MonBusiness.jpg",
        technologies: ["React", "Vite", "localStorage", "CSS"],
        link: "https://samdev-monbusiness.netlify.app/",
        linkText: "Voir le projet"
    },
    2: {
        title: "Tontine Connect",
        description: "Application de gestion de tontine moderne avec suivi des versements et gestion des membres.",
        longDescription: "Cette plateforme digitalise les tontines traditionnelles pour garantir une transparence totale.\n\nElle automatise le suivi des paiements, la détermination des bénéficiaires et la synchronisation en temps réel entre tous les membres. C'est l'outil idéal pour sécuriser l'épargne collective et éviter les conflits.",
        image: "img/projets/Tonti-Connect.jpg",
        technologies: ["React", "Node.js", "Firebase", "CSS"],
        link: "https://samdev-tontine.netlify.app/", 
        linkText: "Voir le projet"
    },
    3: {
        title: "SmartRDV",
        description: "Application web de gestion de prise de rendez-vous avec architecture React/Spring Boot et système multi-rôles.",
        longDescription: "SmartRDV simplifie la prise de rendez-vous entre entreprises et clients. Grâce à un système multi-rôles (Admin, Entreprise, Client), chaque utilisateur dispose d'un tableau de bord personnalisé.\n\nLe projet inclut une authentification sécurisée et un calendrier de réservation dynamique pour une expérience utilisateur fluide.",
        image: "img/projets/SmartRDV.jpg",
        technologies: ["React", "Spring Boot", "MySQL", "XAMPP"],
        link: "#",
        linkText: "En cours de développement"
    }
};

// Récupération des éléments
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close-modal');
const projectCards = document.querySelectorAll('.project-card');

// Mapper les technologies vers des icônes FontAwesome
const techIcons = {
    "React": '<i class="fab fa-react"></i>',
    "Vite": '<i class="fas fa-bolt"></i>',
    "Node.js": '<i class="fab fa-node-js"></i>',
    "Firebase": '<i class="fas fa-fire"></i>',
    "Firebase Auth": '<i class="fas fa-user-shield"></i>',
    "Firebase Realtime Database": '<i class="fas fa-database"></i>',
    "MySQL": '<i class="fas fa-server"></i>',
    "Spring Boot": '<i class="fas fa-leaf"></i>',
    "CSS": '<i class="fab fa-css3-alt"></i>',
    "HTML": '<i class="fab fa-html5"></i>',
    "JavaScript": '<i class="fab fa-js"></i>',
    "XAMPP": '<i class="fas fa-microchip"></i>',
    "localStorage": '<i class="fas fa-hdd"></i>'
};

function getTechIcon(tech) {
    return techIcons[tech] || '<i class="fas fa-code"></i>';
}

// Fonction pour ouvrir le modal avec les données du projet
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    
    if (project) {
        modalContent.innerHTML = `
            <h2 class="modal-project-title">
                <i class="fas fa-project-diagram" style="margin-right: 15px; color: var(--primary-color);"></i>
                ${project.title}
            </h2>
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <div class="modal-section-title">
                <i class="fas fa-info-circle"></i> À propos du projet
            </div>
            <p class="modal-project-description">${project.longDescription || project.description}</p>
            
            <div class="modal-section-title">
                <i class="fas fa-tools"></i> Technologies utilisées
            </div>
            <div class="modal-tech-tags">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">
                        ${getTechIcon(tech)} ${tech}
                    </span>
                `).join('')}
            </div>
            
            <a href="${project.link}" ${project.link !== '#' ? 'target="_blank"' : ''} class="modal-project-link">
                ${project.linkText} <i class="fas fa-external-link-alt" style="margin-left: 8px; font-size: 0.9em;"></i>
            </a>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    }
}

// Ajout des événements de clic sur chaque carte de projet
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

// Fermeture du modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Réactive le défilement
}

// Événement pour fermer avec le bouton X
closeBtn.addEventListener('click', closeModal);

// Fermeture en cliquant en dehors du modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Fermeture avec la touche Echap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});