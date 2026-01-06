/* ============================================
   ROHAN KAPOOR - PORTFOLIO JAVASCRIPT
   Advanced Animations & Interactivity
   ============================================ */

// ===== DOM Elements =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const loaderWrapper = document.querySelector('.loader-wrapper');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillProgress = document.querySelectorAll('.skill-progress');

// ===== Custom Cursor =====
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .about-card, .contact-card, .nav-link');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// ===== Loading Screen =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loaderWrapper.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 1500);
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Active nav link on scroll
    updateActiveNavLink();
    
    // Animate skill bars on scroll
    animateSkillBars();
});

// ===== Mobile Navigation =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Nav Link =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// ===== Typewriter Effect =====
const typewriterTexts = [
    'Software Developer',
    'Android Developer',
    'Full-Stack Developer',
    'Python Developer',
    'Web Developer',
    'Bot Developer',
    'Problem Solver',
    'Tech Enthusiast'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.querySelector('.typewriter');

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter
setTimeout(typeWriter, 1500);

// ===== Hero Stats Counter Animation =====
function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Start hero stats animation after page load
setTimeout(animateHeroStats, 2000);

// ===== Stats Section Counter Animation =====
let statsAnimated = false;

function animateStatsSection() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    const sectionTop = statsSection.offsetTop;
    const scrollY = window.pageYOffset + window.innerHeight;
    
    if (scrollY > sectionTop + 100 && !statsAnimated) {
        statsAnimated = true;
        const counters = document.querySelectorAll('.stats-section .counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2500;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            };
            
            updateCounter();
        });
    }
}

// Add stats animation to scroll event
window.addEventListener('scroll', animateStatsSection);

// ===== Skill Bars Animation =====
let skillsAnimated = false;

function animateSkillBars() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.offsetHeight;
    const scrollY = window.pageYOffset + window.innerHeight;
    
    if (scrollY > sectionTop + 100 && !skillsAnimated) {
        skillsAnimated = true;
        skillProgress.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
}

// ===== Project Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Initialize AOS =====
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// ===== Particles.js Configuration =====
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6c5ce7'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6c5ce7',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ===== Vanilla Tilt for Cards =====
if (window.innerWidth > 768) {
    VanillaTilt.init(document.querySelectorAll('.project-card, .about-card, .skill-item'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2
    });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Form Submission =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:rohankapoor1904@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
});

// ===== Notification System =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#00b894' : '#6c5ce7'};
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInUp 0.5s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(50px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Counter Animation =====
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== Reveal on Scroll =====
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Mouse Trail Effect =====
function createTrail() {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: rgba(108, 92, 231, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.3s ease, opacity 0.5s ease;
    `;
    document.body.appendChild(trail);
    return trail;
}

const trails = [];
const trailCount = 10;

for (let i = 0; i < trailCount; i++) {
    trails.push(createTrail());
}

let mouseX = 0, mouseY = 0;
let trailX = [], trailY = [];

for (let i = 0; i < trailCount; i++) {
    trailX[i] = 0;
    trailY[i] = 0;
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrails() {
    trailX[0] = mouseX;
    trailY[0] = mouseY;
    
    for (let i = 1; i < trailCount; i++) {
        trailX[i] += (trailX[i - 1] - trailX[i]) * 0.3;
        trailY[i] += (trailY[i - 1] - trailY[i]) * 0.3;
        
        trails[i].style.left = trailX[i] + 'px';
        trails[i].style.top = trailY[i] + 'px';
        trails[i].style.opacity = (trailCount - i) / trailCount * 0.5;
        trails[i].style.transform = `scale(${(trailCount - i) / trailCount})`;
    }
    
    requestAnimationFrame(animateTrails);
}

// Start trail animation only on desktop
if (window.innerWidth > 768) {
    animateTrails();
} else {
    trails.forEach(trail => trail.remove());
}

// ===== Easter Egg - Konami Code =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear';
    showNotification('🎉 Easter Egg Activated! You found the secret!', 'success');
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// ===== Console Message =====
console.log(`
%c╔════════════════════════════════════════╗
%c║     ROHAN KAPOOR - PORTFOLIO           ║
%c║     Software Developer                 ║
%c║     Let's build something amazing!     ║
%c╚════════════════════════════════════════╝
`, 
'color: #6c5ce7; font-weight: bold;',
'color: #6c5ce7;',
'color: #00cec9;',
'color: #fd79a8;',
'color: #6c5ce7; font-weight: bold;'
);

console.log('%cInterested in working together? Contact me at rohankapoor1904@gmail.com', 'color: #00cec9; font-size: 14px;');

// ===== Page Visibility API =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! - Rohan Kapoor';
    } else {
        document.title = 'Rohan Kapoor | Software Developer';
    }
});

// ===== Initialize on Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill bars if already in view
    setTimeout(animateSkillBars, 2000);
    
    // Update nav link on load
    updateActiveNavLink();
});
