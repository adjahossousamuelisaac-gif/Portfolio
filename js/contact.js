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
    const contactForm = document.getElementById('contactForm');
    
    // Vérifier si le formulaire existe sur la page
    if (!contactForm) {
        console.error('Formulaire de contact non trouvé ! Vérifie que id="contactForm" existe');
        return;
    }
    
    const submitBtn = document.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    
    // 3. CONFIGURATION DES IDENTIFIANTS EMAILJS
    // ============================
    const serviceID = 'service_kuhmqfw';   // Ton Service ID
    const templateID = 'template_t802wlb';  // Ton Template ID
    
    // 4. GESTION DE LA SOUMISSION DU FORMULAIRE
    // ============================
    contactForm.addEventListener('submit', function(e) {
        // Empêcher le rechargement de la page
        e.preventDefault();
        
        // Récupérer le bouton de soumission (au cas où il n'a pas été trouvé plus tôt)
        const btn = submitBtn || this.querySelector('.submit-btn');
        
        // Sauvegarder le texte original du bouton
        const originalBtnText = btn.innerHTML;
        
        // Désactiver le bouton et afficher l'animation de chargement
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        // Récupérer les valeurs du formulaire
        const formData = {
            name: document.getElementById('name')?.value || '',
            title: document.getElementById('title')?.value || '',
            from_email: document.getElementById('email')?.value || '',
            message: document.getElementById('message')?.value || ''
        };
        
        // Validation supplémentaire (optionnelle)
        if (!formData.name || !formData.from_email || !formData.message) {
            alert('Veuillez remplir tous les champs obligatoires');
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
            return;
        }
        
        // Validation d'email
        if (!isValidEmail(formData.from_email)) {
            alert('Veuillez entrer une adresse email valide');
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
            return;
        }
        
        // Afficher dans la console pour le débogage
        console.log('Envoi du formulaire...', formData);
        console.log('Service ID:', serviceID);
        console.log('Template ID:', templateID);
        
        // 5. ENVOI DU FORMULAIRE AVEC EMAILJS
        // ============================
        emailjs.sendForm(serviceID, templateID, this)
            .then(function(response) {
                // SUCCÈS
                console.log('✅ Succès!', response);
                console.log('Message envoyé à: adjahossousamuelisaac@gmail.com');
                
                // Changer le bouton pour indiquer le succès
                btn.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé !';
                btn.style.background = 'linear-gradient(145deg, #28a745, #20c997)';
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Afficher le message de succès
                if (successMessage) {
                    successMessage.style.display = 'flex';
                    
                    // Animation de scroll vers le message de succès
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    // Créer un message de succès temporaire s'il n'existe pas
                    showTemporarySuccessMessage(contactForm);
                }
                
                // Remettre le bouton à son état normal après 3 secondes
                setTimeout(function() {
                    btn.innerHTML = originalBtnText;
                    btn.style.background = ''; // Revenir au style original
                    btn.disabled = false;
                    
                    if (successMessage) {
                        successMessage.style.display = 'none';
                    }
                }, 3000);
            })
            .catch(function(error) {
                // ERREUR
                console.error('❌ Erreur détaillée:', error);
                
                // Message d'erreur plus explicite
                let errorMessage = "Erreur lors de l'envoi. ";
                
                if (error.status === 0) {
                    errorMessage += "Problème de connexion Internet.";
                } else if (error.status === 401 || error.status === 403) {
                    errorMessage += "Problème d'authentification EmailJS. Vérifie ta clé publique.";
                } else if (error.status === 404) {
                    errorMessage += "Service ou template non trouvé. Vérifie tes IDs.";
                } else if (error.text) {
                    errorMessage += error.text;
                } else {
                    errorMessage += "Vérifie ta configuration EmailJS.";
                }
                
                alert(errorMessage);
                
                // Remettre le bouton à son état normal
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                
                // Afficher un message d'erreur temporaire dans le formulaire
                showTemporaryErrorMessage(contactForm, errorMessage);
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
            <span>Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.</span>
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
            <span>${message}</span>
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