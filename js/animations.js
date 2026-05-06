const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.15 
});

window.refreshAnimations = function() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    window.refreshAnimations();

    // Effet de frappe (Typewriter)
    const typeElements = document.querySelectorAll('.typewriter');
    typeElements.forEach(el => {
        const text = el.innerText;
        el.innerText = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                el.innerText += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        };
        
        // Démarrer quand visible
        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        });
        observer.observe(el);
    });

    // Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu ul li a');

    if (mobileMenu && navMenu) {
        const header = document.querySelector('header');
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            header.classList.toggle('menu-open');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                header.classList.remove('menu-open');
                const icon = mobileMenu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
});
