document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    // Throttle function to limit how often the scroll handler runs
    function throttle(callback, delay) {
        let previousCall = new Date().getTime();
        return function() {
            const time = new Date().getTime();
            if ((time - previousCall) >= delay) {
                previousCall = time;
                callback.apply(null, arguments);
            }
        };
    }
    
    // Function to update active link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200; // Added buffer for better detection
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to the corresponding nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Add smooth scrolling to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Scroll to the section
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update active class
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Replace the throttle implementation with this
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Set active link on page load
    updateActiveLink();

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksMobile = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksMobile.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const linksMobile = document.querySelectorAll('.nav-links a');
        linksMobile.forEach(link => {
            link.addEventListener('click', function() {
                navLinksMobile.classList.remove('active');
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinksMobile.classList.remove('active');
        }
    });

    // Check if device is mobile for video optimization
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               (navigator.userAgent.match(/Android/i) || 
                navigator.userAgent.match(/webOS/i) || 
                navigator.userAgent.match(/iPhone/i) || 
                navigator.userAgent.match(/iPad/i) || 
                navigator.userAgent.match(/iPod/i) || 
                navigator.userAgent.match(/BlackBerry/i) || 
                navigator.userAgent.match(/Windows Phone/i));
    }

    const heroVideo = document.getElementById('hero-video');
    const heroSection = document.querySelector('.hero');
    
    if (isMobileDevice() && heroVideo) {
        // Replace video with static image on mobile
        heroVideo.style.display = 'none';
        heroSection.style.backgroundImage = 'url("assets/hero-mobile-bg.jpg")';
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
}); 