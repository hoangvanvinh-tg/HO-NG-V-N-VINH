const themeToggle = document.getElementById('themeToggle');
const projectCards = document.querySelectorAll('.project-card');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalRole = document.getElementById('modalRole');
const modalImage = document.querySelector('.modal-image');

const savedTheme = localStorage.getItem('portfolioTheme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('portfolioTheme', mode);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

sections.forEach((section) => {
  revealObserver.observe(section);
});

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const title = card.dataset.title;
    const description = card.dataset.description;
    const role = card.dataset.role;
    const image = card.dataset.image;

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalRole.textContent = `Role: ${role}`;
    modalImage.style.backgroundImage = `url('${image}')`;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  });
});

const closeModal = () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
};

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});
