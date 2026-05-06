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
    // --- EFFETS WOW ---

    // 1. Boutons Magnétiques
    const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-primary, .btn-secondary');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 2. Glow Follow (Cartes de projets)
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.project-card, .service-card, .stat-item');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3. Parallax Blobs
    let request = null;
    document.addEventListener('mousemove', (e) => {
        if (request) cancelAnimationFrame(request);
        
        request = requestAnimationFrame(() => {
            const blobs = document.querySelectorAll('.blob');
            const x = (e.clientX - window.innerWidth / 2) * 0.03;
            const y = (e.clientY - window.innerHeight / 2) * 0.03;
            
            blobs.forEach((blob, index) => {
                const factor = (index + 1) * 0.4;
                blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    });

    // 4. Curseur Personnalisé
    const cursor = document.querySelector('.custom-cursor');
    const cursorOutline = document.querySelector('.custom-cursor-outline');
    
    if (cursor && cursorOutline) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            cursorOutline.animate({
                left: `${e.clientX - 20}px`,
                top: `${e.clientY - 20}px`
            }, { duration: 500, fill: "forwards" });
        });

        const interactables = document.querySelectorAll('a, button, .project-card, .service-card, .stat-item, .lang-toggle-btn');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('link-hover');
                cursorOutline.classList.add('link-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('link-hover');
                cursorOutline.classList.remove('link-hover');
            });
        });
    }
});
