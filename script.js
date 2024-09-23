// Parte 1: Troca de palavras (TextPlugin)
gsap.registerPlugin(TextPlugin);

const words = [
    "web developer",
    "front end",
    "back end",
    "design",
    "fullstack"
];

let currentWord = 0;

function changeWord() {
    gsap.to("#job-title", {
        duration: 1.2, // Tempo de animação mais suave
        text: words[currentWord],
        ease: "power2.out", // Suavização mais suave
        onComplete: () => {
            currentWord = (currentWord + 1) % words.length;
            gsap.to("#job-title", {
                duration: 0.6,
                delay: 1,
                onComplete: changeWord
            });
        }
    });
}

changeWord(); // Inicia a animação de troca de palavras

// Parte 2: Rolagem suave usando ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

let isScrolling = false;
const scrollDuration = 1000; // Aumentei a duração para 1000ms para suavidade extra
let startTouchY = 0;

function scrollPage(delta) {
    if (isScrolling) return;

    isScrolling = true;
    const scrollAmount = window.innerHeight;
    const targetScroll = Math.round(window.scrollY + (delta * scrollAmount));

    gsap.to(window, {
        scrollTo: {
            y: targetScroll,
            offsetY: 0
        },
        duration: scrollDuration / 1000, // GSAP usa segundos
        ease: "power2.inOut", // Suavização mais suave (power2.inOut)
        onComplete: () => isScrolling = false
    });

    toggleMenuIcon(targetScroll);
}

function toggleMenuIcon(scrollYPosition) {
    const secondSectionTop = document.querySelector(".section2").offsetTop;
    const header = document.querySelector(".header");
    const menuIcon = document.querySelector(".menu-icon");

    if (scrollYPosition >= secondSectionTop) {
        header.classList.add("hidden");
        menuIcon.classList.add("active");
    } else {
        header.classList.remove("hidden");
        menuIcon.classList.remove("active");
    }
}

// Eventos de rolagem com mouse
window.addEventListener('wheel', function(event) {
    const delta = Math.sign(event.deltaY);
    scrollPage(delta);
});

// Eventos de toque em dispositivos móveis
window.addEventListener('touchstart', function(event) {
    startTouchY = event.touches[0].clientY;
});

window.addEventListener('touchend', function(event) {
    const endTouchY = event.changedTouches[0].clientY;
    const delta = startTouchY - endTouchY;

    if (Math.abs(delta) > 30) {
        scrollPage(Math.sign(delta));
    }
});

// Evento para o botão de voltar ao topo
document.querySelector('#back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    gsap.to(window, {
        scrollTo: {
            y: 0,
            offsetY: 0
        },
        duration: 1.2, // Duração da rolagem suave para o topo
        ease: "power2.inOut" // Suavização mais suave
    });
});
