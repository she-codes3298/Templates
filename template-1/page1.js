// Page 1 JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page 1 functionality
    initializePage1();
});

function initializePage1() {
    // Add smooth scrolling for any internal links
    addSmoothScrolling();
    
    // Add interactive effects for links
    enhanceLinks();
    
    // Add print functionality
    addPrintSupport();
    
    // Add accessibility features
    addAccessibilityFeatures();
}

function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function enhanceLinks() {
    const links = document.querySelectorAll('.link');
    
    links.forEach(link => {
        // Add hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click feedback
        link.addEventListener('click', function(e) {
            // Since these are placeholder links, prevent default and show feedback
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showLinkFeedback(this);
            }
        });
    });
}

function showLinkFeedback(element) {
    const originalText = element.textContent;
    element.style.color = '#28a745';
    element.textContent = '✓ Link clicked';
    
    setTimeout(() => {
        element.style.color = '';
        element.textContent = originalText;
    }, 1500);
}

function addPrintSupport() {
    // Add keyboard shortcut for printing (Ctrl+P)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
    
    // Optimize for print
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

function addAccessibilityFeatures() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #0066cc';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels for better screen reader support
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const title = section.querySelector('.section-title');
        if (title) {
            section.setAttribute('aria-labelledby', `section-${index}`);
            title.id = `section-${index}`;
        }
    });
}

// Utility function to format text content
function formatText() {
    // Handle special characters and formatting
    const superscripts = document.querySelectorAll('.superscript');
    superscripts.forEach(sup => {
        sup.setAttribute('aria-label', `superscript ${sup.textContent}`);
    });
}

// Initialize text formatting on load
formatText();

// Add animation for page load
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
