// Carrossel de Imagens
const slides = document.querySelector(".slides");
const slideElements = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  const offset = -index * 100;
  slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slideElements.length;
  showSlide(currentIndex);
}

showSlide(currentIndex);

setInterval(nextSlide, 3000);


