// Configura a rolagem suave usando GSAP
let isScrolling = false;
const scrollDuration = 800; // Duração da rolagem em milissegundos

window.addEventListener('wheel', function(event) {
    if (isScrolling) return; // Ignora se já estiver rolando

    isScrolling = true;
    const delta = Math.sign(event.deltaY);
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
});
