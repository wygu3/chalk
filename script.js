document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll("section[id]");
    
    // Add an event listener for scroll
    window.addEventListener("scroll", navHighlighter);
    
    function navHighlighter() {
        // Get current scroll position
        let scrollY = window.pageYOffset;
        
        // Loop through sections to get height, top and ID values for each
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Adjust offset as needed
            const sectionId = current.getAttribute("id");
            
            // Check if the current scroll position is within the current section
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // If so, add the 'active' class to the corresponding nav item
                document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.add("active");
            } else {
                // If not, remove the 'active' class
                document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }
    
    // Call the function on page load
    navHighlighter();
}); 