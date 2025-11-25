document.addEventListener('DOMContentLoaded', () => {
  try {
    const revealElements = document.querySelectorAll('.reveal-from-left, .reveal-from-right, .reveal-card');
    console.log('IO init — reveal elements:', revealElements.length);

    if (!revealElements.length) {
      console.warn('Aucun élément .reveal-* trouvé. Vérifie que les classes sont bien présentes.');
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
          console.log('revealed:', entry.target);
        }
      });
    }, { 
      threshold: 0.18,
      rootMargin: '0px 0px -10% 0px'
    });

    revealElements.forEach(el => observer.observe(el));

  } catch (err) {
    console.error('Erreur dans le script reveal:', err);
  }
});
