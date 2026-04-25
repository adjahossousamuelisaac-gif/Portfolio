document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionnel : arrêter d'observer une fois révélé
                // observer.unobserve(entry.target);
            } else {
                // Optionnel : retirer la classe si on veut que l'animation se rejoue
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.15 // Déclenche quand 15% de l'élément est visible
    });

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

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
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
});
