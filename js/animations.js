// Floating elements animation enhancement
document.addEventListener('DOMContentLoaded', () => {
    // Add random movement to floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        // Generate random animation duration
        const duration = 15 + Math.random() * 10;
        element.style.animationDuration = `${duration}s`;
        
        // Add random delay
        const delay = Math.random() * 5;
        element.style.animationDelay = `${delay}s`;
    });
    
    // Add hover effect to cards
    const cards = document.querySelectorAll('.featured-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        // Add pulse animation after a delay
        setTimeout(() => {
            button.classList.add('pulse');
        }, 2000);
        
        // Remove pulse on hover
        button.addEventListener('mouseenter', () => {
            button.classList.remove('pulse');
        });
        
        // Restart pulse after mouse leave
        button.addEventListener('mouseleave', () => {
            setTimeout(() => {
                button.classList.add('pulse');
            }, 1000);
        });
    });
    
    // Mouse move parallax effect for hero section
    const hero = document.querySelector('.hero');
    const floatingContainer = document.querySelector('.floating-elements');
    
    if (hero && floatingContainer) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 20 - 10;
            const y = (e.clientY / window.innerHeight) * 20 - 10;
            
            floatingContainer.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Reset position when mouse leaves
        hero.addEventListener('mouseleave', () => {
            floatingContainer.style.transform = 'translate(0, 0)';
        });
    }
    
    // Page transition effect
    const links = document.querySelectorAll('a:not([href^="#"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only apply to internal links
            if (link.href && link.href.includes(window.location.origin)) {
                e.preventDefault();
                
                // Add fade out effect
                document.body.style.opacity = '0.7';
                document.body.style.transition = 'opacity 0.3s ease';
                
                // Navigate after delay
                setTimeout(() => {
                    window.location.href = link.href;
                }, 300);
            }
        });
    });
    
    // Reset opacity on page load
    window.addEventListener('pageshow', () => {
        document.body.style.opacity = '1';
    });
});