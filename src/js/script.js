const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const container = document.querySelector('.container');
const indicatorsContainer = document.querySelector('.indicators');

let currentIndex = 0;
let autoPlayInterval;

// Cria os indicadores dinamicamente
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        updateIndicators();
        startAutoPlay(); // Reinicia a rotação automática
    });
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Atualiza a posição do carrossel
function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Atualiza o estado dos indicadores
function updateIndicators() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Avança para o próximo slide
function nextSlide() {
    currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
    updateIndicators();
}

// Retrocede para o slide anterior
function prevSlide() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
    updateCarousel();
    updateIndicators();
}

// Inicia a rotação automática
function startAutoPlay() {
    stopAutoPlay(); // Garante que apenas um intervalo esteja ativo
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 3000);
}

// Para a rotação automática
function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Configura os eventos dos botões
prevButton.addEventListener('click', () => {
    prevSlide();
    startAutoPlay(); // Reinicia a rotação após interação
});

nextButton.addEventListener('click', () => {
    nextSlide();
    startAutoPlay(); // Reinicia a rotação após interação
});

// Pausa a rotação automática ao passar o mouse sobre o carrossel
container.addEventListener('mouseover', stopAutoPlay);

// Retoma a rotação automática ao remover o mouse do carrossel
container.addEventListener('mouseout', startAutoPlay);

// Atualiza o tamanho do carrossel ao redimensionar a janela
window.addEventListener('resize', updateCarousel);

// Inicia a rotação automática ao carregar a página
startAutoPlay();

// Código para o menu responsivo
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("open");
        });
    }
});
