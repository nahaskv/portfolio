const menu = document.querySelector('.menu');
const nav = document.querySelector('#navLinks');
const navBar = document.querySelector('.nav');

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
    if (menu) menu.textContent = '☰';
  });
});

const updateNav = () => {
  navBar?.classList.toggle('scrolled', window.scrollY > 18);
};

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('#navLinks a')];

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${entry.target.id}`
      );
    });
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});
