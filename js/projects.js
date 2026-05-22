// Projects Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.masonry-item');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Smooth scroll to top of projects section
            const projectsSection = document.querySelector('.projects-section');
            if (projectsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const sectionPosition = projectsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: sectionPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        projectCards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.classList.add('touched');
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.classList.remove('touched');
                }, 300);
            });
        });
    }
});