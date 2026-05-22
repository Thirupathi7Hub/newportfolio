// DOM Elements
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');
const currentYear = document.getElementById('currentYear');
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const downloadCVBtn = document.querySelector('.btn-download-cv');
const navLinks = document.querySelectorAll('.nav-menu a');

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const isActive = mobileToggle.classList.contains('active');
    
    // Toggle classes
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navActions.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Update ARIA attributes
    const isExpanded = !isActive;
    mobileToggle.setAttribute('aria-expanded', isExpanded);
    
    // Announce state change for screen readers
    if (isExpanded) {
        announceToScreenReader('Navigation menu opened');
    } else {
        announceToScreenReader('Navigation menu closed');
    }
}

// Close mobile menu
function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navActions.classList.remove('active');
    document.body.classList.remove('no-scroll');
    mobileToggle.setAttribute('aria-expanded', 'false');
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Event Listeners for Mobile Navigation
mobileToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Only close menu if it's open
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Smooth scroll for anchor links
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = e.target.closest('.navbar') || 
                            e.target.closest('.nav-menu') || 
                            e.target.closest('.nav-actions');
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize (if resizing to desktop)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }, 250);
});

// Set current year in footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Download CV Button Functionality
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create CV content
        const cvContent = `
Alex Carter - Frontend Developer & AI Student
============================================

CONTACT INFORMATION
Email: alex@example.com
Phone: +1 (123) 456-7890
Location: San Francisco, CA
Portfolio: alexcarter.dev

SUMMARY
Passionate Frontend Developer and AI Student with 3+ years of experience 
creating innovative web solutions. Specialized in React, JavaScript, and 
AI integration. Seeking opportunities to contribute to cutting-edge projects.

SKILLS
• Frontend: HTML5, CSS3, JavaScript, React, Vue.js, TypeScript
• AI/ML: Python, TensorFlow, Machine Learning, Data Science
• Tools: Git, Docker, AWS, Figma, Adobe Creative Suite
• Soft Skills: Problem Solving, Team Collaboration, Communication

EXPERIENCE
Frontend Developer Intern
TechVision Inc. | 2022 - Present
• Developed responsive web applications using React.js
• Implemented AI-powered features for data visualization
• Collaborated with cross-functional teams on product development

Freelance Web Developer
Self-Employed | 2021 - 2022
• Built websites for various clients across industries
• Created custom UI components and animations
• Optimized websites for performance and SEO

EDUCATION
B.Sc. Computer Science
Stanford University | 2020 - Present
• Specializing in Artificial Intelligence
• Coursework: Machine Learning, Web Development, UI/UX
• GPA: 3.8/4.0

PROJECTS
• Intelligent Analytics Dashboard - React, Python, TensorFlow
• E-commerce Platform - Next.js, Node.js, MongoDB
• AI Image Generator - Python, Flask, OpenAI API

CERTIFICATIONS
• Google Professional Machine Learning Engineer
• Meta Frontend Developer Professional Certificate
• Deep Learning Specialization (deeplearning.ai)
        `;
        
        // Create and trigger download
        const blob = new Blob([cvContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Alex_Carter_CV.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        const originalText = downloadCVBtn.innerHTML;
        downloadCVBtn.innerHTML = '<i class="fas fa-check"></i> CV Downloaded!';
        downloadCVBtn.style.background = '#10b981';
        
        setTimeout(() => {
            downloadCVBtn.innerHTML = originalText;
            downloadCVBtn.style.background = '';
        }, 2000);
    });
}

// Scroll Reveal Animation
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const revealTop = element.getBoundingClientRect().top;
        
        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initialize scroll reveal
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Initialize counters when in view
function initCounters() {
    if (statNumbers.length === 0) return;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, target);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.classList.contains('nav-link')) return; // Skip nav links
    
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling (for contact page)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            successMsg.style.cssText = `
                background: rgba(34, 197, 94, 0.1);
                color: #22c55e;
                padding: 12px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
                border: 1px solid rgba(34, 197, 94, 0.2);
            `;
            
            this.appendChild(successMsg);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
                this.reset();
            }, 5000);
        }, 1500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add page transition effect
    document.body.classList.add('page-transition');
    
    // Initialize counters
    initCounters();
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-glow');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-glow');
        });
    });
    
    // Add parallax effect to floating shapes
    const heroSection = document.querySelector('.hero');
    const floatingShapes = document.querySelector('.floating-shapes');
    
    if (heroSection && floatingShapes) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 30 - 15;
            const y = (e.clientY / window.innerHeight) * 30 - 15;
            
            floatingShapes.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
    
    // Add scroll progress indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrolled > 5) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
});

// Touch device detection and optimizations
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific optimizations
    const buttons = document.querySelectorAll('.btn, .nav-menu a, .service-card');
    buttons.forEach(button => {
        button.style.cursor = 'pointer';
    });
}

// Performance optimizations
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Header show/hide on scroll for mobile
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

// Add screen reader only class
if (!document.querySelector('.sr-only')) {
    const style = document.createElement('style');
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
}// Add to your main.js file
function optimizeForMobile() {
    // Detect if mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation intensity on mobile
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            shape.style.animationDuration = '20s';
        });
        
        // Optimize code window for mobile
        const codeWindow = document.querySelector('.code-window');
        if (codeWindow) {
            codeWindow.style.fontSize = '0.8rem';
        }
        
        // Ensure hero section is properly sized
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.minHeight = 'calc(100vh - 80px)';
        }
    }
}

// Call on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Handle mobile orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(optimizeForMobile, 100);
});

// Prevent zoom on double-tap for iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ======================
// MOBILE NAVIGATION FUNCTIONS
// ======================

function initNavigation() {
    // Mobile Navigation Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a, .download-cv').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            const isClickInsideNav = e.target.closest('.navbar');
            const isClickOnToggle = e.target.closest('.mobile-toggle');
            const isClickOnCVBtn = e.target.closest('.download-cv');
            
            // Don't close if clicking on CV button (it's inside nav-actions)
            if (!isClickInsideNav && !isClickOnToggle && !isClickOnCVBtn && 
                (navMenu.classList.contains('active') || navActions.classList.contains('active'))) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (navMenu.classList.contains('active') || navActions.classList.contains('active'))) {
            closeMobileMenu();
        }
    });
    
    // Prevent body scroll when menu is open
    function preventBodyScroll(e) {
        if (navMenu.classList.contains('active') || navActions.classList.contains('active')) {
            e.preventDefault();
        }
    }
    
    // Add touchmove prevention for mobile
    document.addEventListener('touchmove', preventBodyScroll, { passive: false });
}

function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navActions.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Add/remove event listener for body scroll
    if (navMenu.classList.contains('active')) {
        document.addEventListener('scroll', preventScroll, { passive: false });
    } else {
        document.removeEventListener('scroll', preventScroll);
    }
}

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navActions.classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('scroll', preventScroll);
}

function handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

// ======================
// DOWNLOAD CV FUNCTIONALITY
// ======================

function initDownloadCV() {
    const downloadCvBtn = document.querySelector('.download-cv');
    
    if (!downloadCvBtn) return;
    
    downloadCvBtn.addEventListener('click', function(e) {
        // Check if file exists
        const href = this.getAttribute('href');
        
        if (!href || href === '#' || href === '') {
            e.preventDefault();
            
            // Add loading animation
            this.classList.add('loading');
            const originalIcon = this.querySelector('i').className;
            this.querySelector('i').className = 'fas fa-spinner fa-spin';
            
            // Simulate download process
            setTimeout(() => {
                this.classList.remove('loading');
                this.querySelector('i').className = originalIcon;
                
                // Create and download CV
                createAndDownloadCV();
            }, 1500);
        }
        
        // Close mobile menu after download
        if (window.innerWidth <= 768) {
            setTimeout(closeMobileMenu, 1000);
        }
    });
    
    // Add visual feedback on mobile
    downloadCvBtn.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    });
    
    downloadCvBtn.addEventListener('touchend', function() {
        this.style.transform = '';
    });
}

// ======================
// INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCurrentYear();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initDownloadCV();
    initScrollIndicator();
    initFormHandling();
    initPageTransitions();
    initHoverEffects();
    initParallax();
});