// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = 70;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow on scroll
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Form submission handling
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      role: document.getElementById('role').value,
      updates: document.querySelector('input[name="updates"]').checked
    };
    
    // Simulate API call (replace with actual endpoint)
    try {
      // Replace this with your actual API endpoint
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success state
      submitBtn.textContent = '✓ Success! Check your email';
      submitBtn.style.background = '#22c55e';
      
      // Reset form
      signupForm.reset();
      
      // Show success message
      showNotification('Thank you for signing up! Check your email for confirmation.', 'success');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      submitBtn.textContent = 'Error - Try Again';
      submitBtn.style.background = '#ef4444';
      
      showNotification('Something went wrong. Please try again.', 'error');
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#0066FF'};
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Track scroll position for analytics (optional)
let scrollPercentage = 0;
window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.pageYOffset;
  scrollPercentage = Math.round((scrolled / documentHeight) * 100);
  
  // You can send this to your analytics
  // console.log('Scroll percentage:', scrollPercentage);
});

// Intersection Observer for scroll animations (optional enhancement)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.feature-card, .chapter-section, .case-stat-box');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Mobile menu toggle (if needed in future)
function createMobileMenu() {
  const nav = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  
  if (window.innerWidth <= 768) {
    // Add mobile menu functionality here if needed
  }
}

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

console.log('Book website loaded successfully!');