// Custom Cursor

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







const navItems = document.querySelectorAll('.side-nav-item');
        const sideNav = document.querySelector('.side-nav');
        
        let lastScrollTop = 0;
        let scrollTimeout;
        
        // Show/hide nav on scroll and mouse movement
        function showNav() {
            sideNav.classList.add('visible');
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Hide after 3 seconds of inactivity
            scrollTimeout = setTimeout(() => {
                sideNav.classList.remove('visible');
            }, 3000);
        }
        
        // Show nav on scroll
        window.addEventListener('scroll', () => {
            showNav();
            lastScrollTop = window.pageYOffset;
        });
        
        // Show nav on mouse movement near top
        document.addEventListener('mousemove', (e) => {
            if (e.clientY < 100) {
                showNav();
            }
        });
        
        // Show nav on touch
        document.addEventListener('touchstart', () => {
            showNav();
        });
        
        // Keep nav visible when hovering over it
        sideNav.addEventListener('mouseenter', () => {
            clearTimeout(scrollTimeout);
            sideNav.classList.add('visible');
        });
        
        sideNav.addEventListener('mouseleave', () => {
            scrollTimeout = setTimeout(() => {
                sideNav.classList.remove('visible');
            }, 2000);
        });

        // Click handler
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                const section = document.getElementById(this.dataset.section);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                document.querySelector('.nav-links').classList.remove('active');
            });
        });

        // Active on scroll
        window.addEventListener('scroll', () => {
            const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
            
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
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === current) {
                    item.classList.add('active');
                }
            });
        });

        // Toggle mobile menu
        function toggleMobileMenu() {
            document.querySelector('.nav-links').classList.toggle('active');
        }

        // Close on outside click
        document.addEventListener('click', (e) => {
            const nav = document.querySelector('.side-nav');
            if (!nav.contains(e.target)) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
        
        // Show nav initially for 3 seconds
        showNav();











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