const cards = document.querySelectorAll('.promo-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('sr-show');
      observer.unobserve(entry.target); // reveal once, stop recalculating
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));
