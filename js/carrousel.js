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

  // Calculer le décalage (chaque slide fait 100vw)
  const offset = -(slideIndex - 1) * 100;
  carrousel.style.transform = `translateX(${offset}vw)`;

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