// ============================================
// CONFIGURATION EMAILJS POUR LA SECTION CONTACT
// ============================================

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. INITIALISATION D'EMAILJS
    // ============================
    // Ta clé publique EmailJS
    emailjs.init("N8gblyAyIB2xvPVIM");
    
    // 2. RÉCUPÉRATION DES ÉLÉMENTS
    // ============================
    // On cherche les différents formulaires possibles (Contact ou Services/Devis)
    const contactForm = document.getElementById('contactForm');
    const quoteForm = document.getElementById('quoteForm');
    
    // On crée une liste des formulaires à gérer
    const formsToHandle = [];
    if (contactForm) formsToHandle.push(contactForm);
    if (quoteForm) formsToHandle.push(quoteForm);
    
    if (formsToHandle.length === 0) {
        return;
    }
    
    // 3. CONFIGURATION DES IDENTIFIANTS EMAILJS
    // ============================
    const serviceID = 'service_kuhmqfw';   // Ton Service ID
    const templateID = 'template_t802wlb';  // Ton Template ID
    
    // 4. GESTION DE LA SOUMISSION POUR CHAQUE FORMULAIRE
    // ============================
    formsToHandle.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Empêcher le rechargement de la page
            e.preventDefault();
            
            // Récupérer le bouton de soumission
            const btn = this.querySelector('.submit-btn') || this.querySelector('button[type="submit"]');
            
            // Récupérer le message de succès spécifique à cette page
            const successMessage = document.getElementById('successMessage') || document.getElementById('formSuccess');
            
            // Sauvegarder le texte original du bouton
            const originalBtnText = btn.innerHTML;
            
            const lang = localStorage.getItem('portfolio-lang') || 'fr';
            const dict = window.translations ? window.translations[lang] : null;
            
            // Désactiver le bouton et afficher l'animation de chargement
            btn.disabled = true;
            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${dict ? (dict['form-sending'] || 'Envoi...') : 'Envoi...'}`;
            
            // Validation d'email
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !isValidEmail(emailInput.value)) {
                alert(dict ? (dict['form-error-email'] || 'Email invalide') : 'Email invalide');
                btn.disabled = false;
                btn.innerHTML = originalBtnText;
                return;
            }
            
            // 5. ENVOI DU FORMULAIRE AVEC EMAILJS
            // ============================
            emailjs.sendForm(serviceID, templateID, this)
                .then(function(response) {
                    // SUCCÈS
                    console.log('✅ Succès!', response);
                    
                    // Changer le bouton pour indiquer le succès
                    btn.innerHTML = `<i class="fas fa-check-circle"></i> ${dict ? (dict['form-success'] || 'Envoyé !') : 'Envoyé !'}`;
                    btn.style.background = 'linear-gradient(145deg, #28a745, #20c997)';
                    
                    // Réinitialiser le formulaire
                    form.reset();
                    
                    // Afficher le message de succès
                    if (successMessage) {
                        successMessage.style.display = 'flex';
                    } else {
                        showTemporarySuccessMessage(form);
                    }
                    
                    // Remettre le bouton à son état normal après 3 secondes
                    setTimeout(function() {
                        btn.innerHTML = originalBtnText;
                        btn.style.background = '';
                        btn.disabled = false;
                        
                        if (successMessage) {
                            successMessage.style.display = 'none';
                        }
                    }, 3000);
                })
                .catch(function(error) {
                    // ERREUR
                    console.error('❌ Erreur:', error);
                    alert("Erreur lors de l'envoi. Veuillez vérifier votre connexion.");
                    
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                });
        });
    });
    
    // 6. FONCTIONS UTILITAIRES
    // ============================
    
    // Fonction de validation d'email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fonction pour afficher un message de succès temporaire
    function showTemporarySuccessMessage(form) {
        const lang = localStorage.getItem('portfolio-lang') || 'fr';
        const dict = window.translations ? window.translations[lang] : null;
        const msg = dict ? (dict['form-success-full'] || 'Message envoyé avec succès !') : 'Message envoyé avec succès !';

        const successDiv = document.createElement('div');
        successDiv.className = 'temporary-success';
        successDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            background: linear-gradient(145deg, #28a745, #20c997);
            color: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.5s;
            font-weight: 500;
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 1.5em;"></i>
            <span>${msg}</span>
        `;
        
        form.parentNode.insertBefore(successDiv, form.nextSibling);
        
        setTimeout(function() {
            successDiv.style.animation = 'fadeOut 0.5s';
            setTimeout(function() {
                successDiv.remove();
            }, 500);
        }, 3000);
    }
    
    // Fonction pour afficher un message d'erreur temporaire
    function showTemporaryErrorMessage(form, message) {
        const lang = localStorage.getItem('portfolio-lang') || 'fr';
        const dict = window.translations ? window.translations[lang] : null;
        const errorMsg = message || (dict ? (dict['form-error-generic'] || 'Erreur') : 'Erreur');

        const errorDiv = document.createElement('div');
        errorDiv.className = 'temporary-error';
        errorDiv.style.cssText = `
            margin-top: 20px;
            padding: 15px;
            background: linear-gradient(145deg, #dc3545, #c82333);
            color: white;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.5s;
            font-weight: 500;
        `;
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle" style="font-size: 1.5em;"></i>
            <span>${errorMsg}</span>
        `;
        
        form.parentNode.insertBefore(errorDiv, form.nextSibling);
        
        setTimeout(function() {
            errorDiv.style.animation = 'fadeOut 0.5s';
            setTimeout(function() {
                errorDiv.remove();
            }, 500);
        }, 5000);
    }
    
    // 7. ANIMATIONS POUR LES CHAMPS DU FORMULAIRE
    // ============================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Animation au focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 5px 15px rgba(102,126,234,0.2)';
        });
        
        // Animation à la perte du focus
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Vérifier si l'input a déjà une valeur au chargement
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // 8. AJOUT DES ANIMATIONS CSS (si elles n'existent pas déjà)
    // ============================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-20px);
                opacity: 0;
            }
        }
        
        .form-group.focused label {
            color: #667eea;
            font-weight: 600;
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
});