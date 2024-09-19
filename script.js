// Configura a rolagem suave usando GSAP
gsap.registerPlugin(ScrollToPlugin);

let isScrolling = false;
const scrollDuration = 700; // Duração da rolagem em milissegundos
let startTouchY = 0; // Variável para armazenar a posição inicial do toque

// Função para rolar a página
function scrollPage(delta) {
    if (isScrolling) return; // Ignora se já estiver rolando

    isScrolling = true;
    const scrollAmount = window.innerHeight;
    const targetScroll = Math.round(window.scrollY + (delta * scrollAmount));

    gsap.to(window, {
        scrollTo: {
            y: targetScroll,
            offsetY: 0
        },
        duration: scrollDuration / 1000, // GSAP usa segundos
        ease: "power2.inOut",
        onComplete: () => isScrolling = false // Permite novos eventos de rolagem
    });
}

// Lidar com eventos de rolagem do mouse
window.addEventListener('wheel', function(event) {
    const delta = Math.sign(event.deltaY);
    scrollPage(delta);
});

// Lidar com eventos de toque em dispositivos móveis
window.addEventListener('touchstart', function(event) {
    startTouchY = event.touches[0].clientY; // Armazena a posição inicial do toque
});

window.addEventListener('touchend', function(event) {
    const endTouchY = event.changedTouches[0].clientY; // Pega a posição final do toque
    const delta = startTouchY - endTouchY;

    // Se a diferença for significativa, considerar como um movimento para cima ou para baixo
    if (Math.abs(delta) > 30) {
        scrollPage(Math.sign(delta));
    }
});

a