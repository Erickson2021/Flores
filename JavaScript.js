// ----------------------
// Animación inicial y carta
// ----------------------
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('not-loaded');

  // Mostrar ramo al terminar la intro
  setTimeout(() => {
    const ramo = document.querySelector('.ramo');
    if (ramo) ramo.classList.add('ramo--visible');
  }, 2500);

  // Carta (modal)
  const openBtn = document.getElementById('openCarta');
  const overlay = document.getElementById('overlay');

  const openCarta  = () => overlay.classList.add('is-open');
  const closeCarta = () => overlay.classList.remove('is-open');

  openBtn?.addEventListener('click', openCarta);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('#closeCarta')) closeCarta();
  });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCarta(); });

  // ----------------------
  // Música + controles
  // ----------------------
  const audio   = document.getElementById('bgMusic');
  const btnPlay = document.getElementById('btnPlay'); // Escuchar
  const btnMute = document.getElementById('btnMute'); // Apagar

  if (audio) {
    audio.volume = 0.6; // volumen deseado

    // Intento inmediato (muted autoplay permitido en móvil)
    const tryPlay = () => audio.play().catch(() => {});
    tryPlay();

    const updateUI = () => {
      if (audio.muted || audio.paused) {
        btnPlay?.classList.add('is-active');
        btnMute?.classList.remove('is-active');
      } else {
        btnPlay?.classList.remove('is-active');
        btnMute?.classList.add('is-active');
      }
    };

    // Acciones de los botones
    btnPlay?.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.muted = false;
      audio.play().catch(() => {});
      updateUI();
    });

    btnMute?.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.muted = true;
      audio.pause();
      updateUI();
    });

    // Desbloquear audio en el primer gesto (tap/scroll/tecla)
    const unlock = () => {
      audio.muted = false;
      audio.play().catch(() => {});
      updateUI();
      removeUnlock();
    };
    const removeUnlock = () => {
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('touchstart', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('wheel', unlock, { passive: true });
    };
    document.addEventListener('pointerdown', unlock, { once:true });
    document.addEventListener('touchstart', unlock, { once:true, passive:true });
    document.addEventListener('keydown', unlock, { once:true });
    document.addEventListener('wheel', unlock, { once:true, passive:true });

    // Estado inicial UI
    updateUI();
  }
});
