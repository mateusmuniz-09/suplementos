document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".swiper", {
    slidesPerView: 5, // Quantos slides aparecem por
    spaceBetween: 20, // Espaço entre os slides
    loop: true, // Faz o slide girar infinitamente
    autoplay: {
      delay: 6000, // Tempo entre os slides (em milissegundos)
      disableOnInteraction: false, // Continua rodando mesmo após interação do usuário
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      300: { slidesPerView: 2 }, // Até 640px: 1 slide por vez
      768: { slidesPerView: 4 }, // Até 768px: 2 slides por vez
      1024: { slidesPerView: 5 }, // Até 1024px ou mais: 3 slides por vez
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#banner-slider", {
    type: "loop",
    autoplay: true,
    interval: 3000, // Troca o slide a cada 3s
    arrows: true, // Botões de navegação
    pagination: true, // Paginação abaixo do slide
  }).mount();
});

/////////////////////////////////////////////////////////////////////

const abrirMenu = document.getElementById("abrirMenu");
const menuMobile = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay");

abrirMenu.addEventListener("click", () => {
  menuMobile.classList.add("show");
  overlay.classList.add("open");
});
menuMobile.addEventListener("click", () => {
  menuMobile.classList.remove("show");
  overlay.classList.remove("open");
});

overlay.addEventListener("click", () => {
  menuMobile.classList.remove("show");
  overlay.classList.remove("open");
});
