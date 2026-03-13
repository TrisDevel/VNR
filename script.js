// Navbar scroll effect
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Back to top button
  const backTop = document.getElementById('backTop');
  if (window.scrollY > 400) {
    backTop.classList.add('visible');
  } else {
    backTop.classList.remove('visible');
  }
});

// Back to top
document.getElementById('backTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll(
  '.stat-card, .strategy-card, .task-card, .victory-card, .lesson-item, .meaning-card, .theater-card, .ct-content, .ct-final-content'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in', 'visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Add fade-in class and observe
fadeElements.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile navbar if open
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});

// Animated number counter for stats
function animateCounter(el, target, duration = 1500) {
  const isDate = target.includes('/');
  if (isDate) return; // skip date strings

  const numMatch = target.match(/[\d,.]+/);
  if (!numMatch) return;

  const numStr = numMatch[0].replace(/[.,]/g, '');
  const num = parseFloat(numStr);
  const prefix = target.replace(numMatch[0], '').trim();

  let start = 0;
  const step = num / (duration / 16);
  const counter = setInterval(() => {
    start += step;
    if (start >= num) {
      start = num;
      clearInterval(counter);
    }
    const display = Number.isInteger(num)
      ? Math.floor(start).toLocaleString('vi-VN')
      : start.toFixed(0);
    el.textContent = display + (prefix || '');
  }, 16);
}

// Trigger counter when stats come into view
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const original = el.textContent.trim();
      animateCounter(el, original);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));
