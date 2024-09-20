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
          duration: 1, // Tempo de animação
          text: words[currentWord], // Texto atual
          ease: "none", // Suavização
          onComplete: () => {
              currentWord = (currentWord + 1) % words.length; // Muda para a próxima palavra
              gsap.to("#job-title", {
                  duration: 0.5, // Tempo antes da próxima troca
                  delay: 1, // Espera 1 segundo antes de começar a trocar de novo
                  onComplete: changeWord // Chama a função recursivamente
              });
          }
      });
  }

  changeWord(); // Inicia a animação de troca de palavras

  // Parte 2: Rolagem suave usando ScrollToPlugin
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