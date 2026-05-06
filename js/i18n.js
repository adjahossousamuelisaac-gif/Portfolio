document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;

    // Load saved language or default to 'fr'
    let currentLang = localStorage.getItem('portfolio-lang') || 'fr';
    
    // Update button text to show the OTHER language (e.g., if we are in 'fr', show 'EN' button)
    langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    
    // Initial translation
    translatePage(currentLang);

    // Toggle event
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('portfolio-lang', currentLang);
        langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
        translatePage(currentLang);
    });
});

window.translatePage = function(lang) {
    if (!window.translations || !window.translations[lang]) return;

    const dict = window.translations[lang];
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            // Check if element is an input placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                el.innerHTML = dict[key];
            }
        }
    });

    // Translate Project Cards descriptions inline
    const langObj = window.projectsData;
    if (langObj) {
        document.querySelectorAll('.project-card').forEach(card => {
            const projectId = card.getAttribute('data-project');
            if (projectId && langObj[projectId]) {
                const proj = langObj[projectId][lang];
                if (proj) {
                    const titleEl = card.querySelector('h3');
                    if (titleEl) titleEl.innerHTML = proj.title;

                    const pEl = card.querySelector('p');
                    if (pEl) {
                        pEl.innerHTML = `<strong>${dict['modal-description'] || 'Description'}</strong><br>${proj.description}`;
                    }
                }
            }
        });
    }

    // Also dispatch an event so other scripts (like modale.js) can re-render if needed
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}
