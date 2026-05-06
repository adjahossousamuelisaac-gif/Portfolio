// Les données des projets se trouvent maintenant dans js/projects.js

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
    const lang = localStorage.getItem('portfolio-lang') || 'fr';
    const projectRaw = window.projectsData[projectId];
    const dict = window.translations ? window.translations[lang] : null;
    
    if (projectRaw) {
        const project = { ...projectRaw, ...projectRaw[lang] };
        
        const problemLabel = dict ? dict['modal-problem'] : 'Le Problème';
        const solutionLabel = dict ? dict['modal-solution'] : 'La Solution';
        const resultLabel = dict ? dict['modal-result'] : 'Le Résultat';
        const techLabel = dict ? dict['modal-technologies'] : 'Technologies';

        modalContent.innerHTML = `
            <h2 class="modal-project-title">
                <i class="fas fa-project-diagram" style="margin-right: 15px; color: var(--primary-color);"></i>
                ${project.title}
            </h2>
            
            <div class="modal-grid-2">
                <!-- Colonne Principale: Image + Description -->
                <div class="modal-main-col">
                    <div class="modal-image-container">
                        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                    </div>
                    
                    <div class="modal-description-area">
                        <div class="modal-section-box">
                            <div class="modal-section-title">
                                <i class="fas fa-exclamation-triangle"></i> ${problemLabel}
                            </div>
                            <p class="modal-project-description">${project.problem || project.description}</p>
                        </div>
                        
                        <div class="modal-section-box">
                            <div class="modal-section-title">
                                <i class="fas fa-lightbulb"></i> ${solutionLabel}
                            </div>
                            <p class="modal-project-description">${project.solution || project.description}</p>
                        </div>
                        
                        <div class="modal-section-box">
                            <div class="modal-section-title">
                                <i class="fas fa-chart-line"></i> ${resultLabel}
                            </div>
                            <p class="modal-project-description">${project.result || project.description}</p>
                        </div>
                    </div>
                </div>
                
                <!-- Colonne Latérale: Tech & Lien -->
                <div class="modal-side-col">
                    <div class="modal-info-card">
                        <h4><i class="fas fa-tools"></i> ${techLabel}</h4>
                        <div class="modal-tech-tags">
                            ${project.technologies.map(tech => `
                                <span class="tech-tag">
                                    ${getTechIcon(tech)} ${tech}
                                </span>
                            `).join('')}
                        </div>
                        
                        <div style="margin-top: 30px;">
                            <a href="${project.link}" ${project.link !== '#' ? 'target="_blank"' : ''} class="modal-project-link">
                                ${project.linkText} <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
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