// Données des projets (vous pouvez les remplacer par vos propres données)
const projectsData = {
    1: {
        title: "Projet 1",
        description: "Description détaillée du projet 1. Ce projet consiste à développer une application web moderne avec des fonctionnalités avancées. L'objectif était de créer une interface utilisateur intuitive et responsive.",
        longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        image: "https://via.placeholder.com/800x400?text=Projet+1",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://example.com/projet1",
        linkText: "Voir le projet"
    },
    2: {
        title: "Projet 2",
        description: "Description détaillée du projet 2. Une application full-stack utilisant React et Node.js pour créer une expérience utilisateur fluide et performante.",
        longDescription: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        image: "https://via.placeholder.com/800x400?text=Projet+2",
        technologies: ["React", "Node.js", "Express", "MongoDB"],
        link: "https://example.com/projet2",
        linkText: "Voir le projet"
    },
    3: {
        title: "Projet 3",
        description: "Description détaillée du projet 3. Un backend robuste développé avec Python et Django, avec une API RESTful et une interface d'administration.",
        longDescription: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
        image: "https://via.placeholder.com/800x400?text=Projet+3",
        technologies: ["Python", "Django", "PostgreSQL", "Docker"],
        link: "https://example.com/projet3",
        linkText: "Voir le projet"
    }
};

// Récupération des éléments
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close-modal');
const projectCards = document.querySelectorAll('.project-card');

// Fonction pour ouvrir le modal avec les données du projet
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    
    if (project) {
        modalContent.innerHTML = `
            <h2 class="modal-project-title">${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <p class="modal-project-description">${project.longDescription || project.description}</p>
            <div class="modal-tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="modal-project-link">${project.linkText}</a>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêche le défilement de la page
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