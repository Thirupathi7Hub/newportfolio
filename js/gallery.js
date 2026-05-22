// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    const galleryModal = document.getElementById('galleryModal');
    const modalClose = document.getElementById('modalClose');
    
    // Gallery Data
    const galleryData = [
        {
            image: 'poster/Burger Shop.png',
            title: 'Burger Shop',
            category: 'Poster Design',
            description: 'A complete branding package for a gourmet burger restaurant. Includes logo design, menu layout, packaging, and promotional materials. The design emphasizes a rustic yet modern aesthetic to appeal to food enthusiasts.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Canva'
        },
        {
            image: 'poster/Diwali poster.png',
            title: 'Diwali Poster',
            category: 'Poster Design',
            description: 'A modern and clean poster design for the Diwali festival. Incorporates traditional elements with a contemporary layout to celebrate the festival of lights.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Canva'
        },
        {
            image: 'netflix.png',
            title: 'Netflix UI',
            category: 'UI/UX Design',
            description: 'Redesign of the Netflix user interface focusing on enhancing user experience and visual appeal. The design introduces a more intuitive navigation system, personalized content recommendations, and a sleek, modern aesthetic.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Figma'
        },
        {
            image: 'poster/gym.png',
            title: 'Gym Poster',
            category: 'Poster Design',
            description: 'Promotional poster for a gym featuring bold typography and dynamic imagery. The design aims to inspire fitness and wellness, incorporating vibrant colors and motivational messaging.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Canva'
        },
        {
            image: 'poster/Hotel App Poster.png',
            title: 'Hotel App Poster',
            category: 'Poster Design',
            description: 'User interface design for a modern hotel booking application. Focuses on creating a seamless user experience with intuitive navigation, rich visuals, and easy access to essential features.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Canva'
        },
        {
            image: 'youtube.png',
            title: 'YouTube Design',
            category: 'UI/UX Design',
            description: 'Redesign of the YouTube platform to enhance user engagement and content discovery. The design features a cleaner layout, improved video recommendations, and a more personalized user experience.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Figma'
        },
        {
            image: 'poster/jewelry.png',
            title: 'Jewelry Poster',
            category: 'Poster Design',
            description: 'Promotional poster for a jewelry brand showcasing elegant designs and craftsmanship. The layout emphasizes the beauty of the jewelry pieces with a sophisticated color palette and typography.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Canva'
        },{
            image: 'poster/Saloon Shop Poster.png',
            title: 'Saloon Shop Poster',
            category: 'Poster Design',
            description: 'Promotional poster for a local saloon showcasing hair and beauty services. The design features vibrant colors and stylish typography to attract customers.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Figma, Adobe XD, Illustrator'
        },{
            image: 'poster/watch.png',
            title: 'Watch Poster',
            category: 'Poster Design',
            description: 'Promotional poster for a watch brand highlighting the elegance and functionality of the timepieces. The design features a sophisticated color palette and stylish typography to attract potential customers.',
            client: 'Personal Project',
            year: '2025',
            tools: 'Canva'
        }
                
    ];
    
    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.classList.add('active');
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.remove('active');
                    }, 300);
                }
            });
        });
    });
    
    // Modal functionality
    function openModal(index) {
        const item = galleryData[index];
        
        // Update modal content
        document.getElementById('modalImage').src = item.image;
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalCategory').textContent = item.category;
        document.getElementById('modalDescription').textContent = item.description;
        document.getElementById('modalClient').textContent = item.client;
        document.getElementById('modalYear').textContent = item.year;
        document.getElementById('modalTools').textContent = item.tools;
        
        // Show modal
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners for modal
    viewDetailsBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => openModal(index));
    });
    
    modalClose.addEventListener('click', closeModal);
    
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        galleryItems.forEach(item => {
            let touchStartX = 0;
            let touchStartY = 0;
            
            item.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
                item.classList.add('touched');
            });
            
            item.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                
                // If it's a tap (not a swipe)
                if (Math.abs(touchEndX - touchStartX) < 10 && 
                    Math.abs(touchEndY - touchStartY) < 10) {
                    item.click();
                }
                
                setTimeout(() => {
                    item.classList.remove('touched');
                }, 300);
            });
        });
    }
});