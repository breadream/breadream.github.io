const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const emailLink = document.querySelector('#email-link');
const projectCarousel = document.querySelector('.project-carousel');
const projectControls = document.querySelectorAll('[data-project-direction]');

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

if (projectCarousel && projectControls.length) {
  const getProjectStep = () => {
    const card = projectCarousel.querySelector('.card');
    const gap = Number.parseFloat(window.getComputedStyle(projectCarousel).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : projectCarousel.clientWidth;
  };

  projectControls.forEach((control) => {
    control.addEventListener('click', () => {
      const direction = Number(control.dataset.projectDirection);
      const maxScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;

      if (direction > 0 && projectCarousel.scrollLeft >= maxScroll - 2) {
        projectCarousel.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      if (direction < 0 && projectCarousel.scrollLeft <= 2) {
        projectCarousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
        return;
      }

      projectCarousel.scrollBy({ left: getProjectStep() * direction, behavior: 'smooth' });
    });
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
