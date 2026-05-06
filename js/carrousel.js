let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let slides = document.getElementsByClassName("carrousel-item");
  let dots = document.getElementsByClassName("dot");
  let carrousel = document.querySelector(".carrousel");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Calculer le décalage basé sur la largeur réelle de la première slide
  const slideWidth = slides[0].offsetWidth;
  const offset = -(slideIndex - 1) * slideWidth;
  carrousel.style.transform = `translateX(${offset}px)`;

  // Mettre à jour l'état actif des slides pour l'animation d'opacité/scale
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex - 1].classList.add("active");

  // Mettre à jour les indicateurs (dots)
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  dots[slideIndex - 1].classList.add("active");
}

// Auto-play (optionnel)
setInterval(() => {
  changeSlide(1);
}, 15000);

// Gérer le redimensionnement pour recalculer la position
window.addEventListener('resize', () => {
  showSlides(slideIndex);
});