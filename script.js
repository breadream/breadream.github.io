const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const emailLink = document.querySelector('#email-link');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

if (emailLink) {
  emailLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'mailto:brad.dh.lim@gmail.com';
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const targetId = link.getAttribute('href')?.slice(1);
        link.classList.toggle('active', targetId === entry.target.id);
      });
    });
  },
  {
    threshold: 0.35,
    rootMargin: '-20% 0px -50% 0px'
  }
);

sections.forEach((section) => navObserver.observe(section));

const year = document.querySelector('#year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}
