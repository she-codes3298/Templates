// Resume Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
            this.style.transition = 'background-color 0.2s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Add click-to-copy functionality for contact information
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.style.cursor = 'pointer';
        contactInfo.title = 'Click to copy contact information';
        
        contactInfo.addEventListener('click', function() {
            const text = this.textContent.trim();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showNotification('Contact information copied to clipboard!');
                }).catch(() => {
                    fallbackCopyText(text);
                });
            } else {
                fallbackCopyText(text);
            }
        });
    }

    // Add expandable functionality for long bullet points
    const longBullets = document.querySelectorAll('.entry-details li');
    longBullets.forEach(bullet => {
        if (bullet.textContent.length > 150) {
            const originalText = bullet.textContent;
            const shortText = originalText.substring(0, 120) + '...';
            
            bullet.innerHTML = `
                <span class="short-text">${shortText}</span>
                <span class="full-text" style="display: none;">${originalText}</span>
                <button class="expand-btn" style="background: none; border: none; color: #0066cc; cursor: pointer; font-size: inherit; margin-left: 5px;">[Show more]</button>
            `;
            
            const expandBtn = bullet.querySelector('.expand-btn');
            const shortSpan = bullet.querySelector('.short-text');
            const fullSpan = bullet.querySelector('.full-text');
            
            expandBtn.addEventListener('click', function() {
                if (fullSpan.style.display === 'none') {
                    shortSpan.style.display = 'none';
                    fullSpan.style.display = 'inline';
                    this.textContent = '[Show less]';
                } else {
                    shortSpan.style.display = 'inline';
                    fullSpan.style.display = 'none';
                    this.textContent = '[Show more]';
                }
            });
        }
    });

    // Add print functionality
    const printBtn = createPrintButton();
    document.body.appendChild(printBtn);

    // Add theme toggle (optional enhancement)
    const themeToggle = createThemeToggle();
    document.body.appendChild(themeToggle);
});

// Utility function for fallback text copying
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Contact information copied to clipboard!');
    } catch (err) {
        showNotification('Failed to copy text');
    }
    
    document.body.removeChild(textArea);
}

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 12pt;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}


    
