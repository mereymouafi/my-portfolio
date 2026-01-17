// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .side-nav-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = 'var(--light-blue)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = 'var(--accent)';
    });
});

// Particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 5 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particlesContainer.appendChild(particle);
}

// Scroll to Section
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('.large-text, .body-text, .stat-block, .skill-item, .section-number, .section-title, .project-item, .projects-intro h2, .projects-description, .contact-detail').forEach(el => {
    observer.observe(el);
});

// Update active nav on scroll
window.addEventListener('scroll', function() {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const navItems = document.querySelectorAll('.side-nav-item');
    
    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = sectionId;
            }
        }
    });
    
    navItems.forEach((item, index) => {
        item.classList.remove('active');
        if (sections[index] === current) {
            item.classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Stagger animations for skill items
document.querySelectorAll('.skill-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Stagger animations for stat blocks
document.querySelectorAll('.stat-block').forEach((block, index) => {
    block.style.transitionDelay = `${index * 0.15}s`;
});

// Stagger animations for contact details
document.querySelectorAll('.contact-detail').forEach((detail, index) => {
    detail.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect for hero background elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});