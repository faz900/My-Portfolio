/* ────────────────────────────────────────
   FAZNA FURKHAN PORTFOLIO — script.js
──────────────────────────────────────── */

/* ── 1. THEME TOGGLE ── */
const themeBtn = document.getElementById('themeBtn');
const themeLabel = document.getElementById('theme-label');
const html = document.documentElement;

// Initialise: default is dark (set in HTML attribute)
function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
    localStorage.setItem('pf-theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('pf-theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});


/* ── 2. SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // unobserve after revealing so it stays visible
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* ── 3. ACTIVE NAV LINK HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activateLink = (id) => {
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + id;
        link.style.color = isActive ? 'var(--accent2)' : '';
        link.style.fontWeight = isActive ? '600' : '';
    });
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateLink(entry.target.getAttribute('id'));
        }
    });
}, {
    threshold: 0.4
});

sections.forEach(sec => sectionObserver.observe(sec));


/* ── 4. SMOOTH SCROLL FOR NAV LINKS ── */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});


/* ── 5. CONTACT FORM SUBMIT ── */
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('.submit-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate send (replace with real fetch/emailjs in production)
    setTimeout(() => {
        successMsg.style.display = 'block';
        btn.textContent = 'Send Message 🚀';
        btn.disabled = false;
        contactForm.reset();

        // Hide message after 5s
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    }, 1200);
});


/* ── 6. NAV SCROLL SHADOW ── */
const navEl = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navEl.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        navEl.style.boxShadow = 'none';
    }
}, { passive: true });


/* ── 7. CTA BUTTON RIPPLE EFFECT ── */
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Only apply to non-link round buttons (resume & contact anchor scroll)
        const ripple = document.createElement('span');
        ripple.style.cssText = `
      position:absolute; border-radius:50%;
      background:rgba(255,255,255,0.35);
      width:60px; height:60px;
      transform:scale(0); animation:ripple 0.5s linear;
      pointer-events:none;
    `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
});

// Inject ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);