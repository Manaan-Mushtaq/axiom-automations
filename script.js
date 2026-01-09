// ============ CONTACT SALES FUNCTION ============
function contactSales(plan) {
  const message = plan === 'Demo Request' 
    ? 'Hi Axiom team, I\'d like to schedule a free demo to see how we can save on operational costs.\n\nPlease contact me at your earliest convenience.'
    : `Hi Axiom team, I\'m interested in the ${plan}. Could you please contact me with more details, pricing, and information about implementation?\n\nThank you.`;
  
  const email = 'contact@axiomautomations.com';
  const subject = `${plan} - Axiom Automations Inquiry`;
  
  // Trigger scroll animation
  animateButtonClick(event);
  
  // Open email client
  setTimeout(() => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }, 300);
}

// ============ SCROLL TO SECTION ============
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  });
});

// ============ BUTTON CLICK ANIMATION ============
function animateButtonClick(e) {
  if (e && e.target) {
    const btn = e.target;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ============ OBSERVE ALL ANIMATED ELEMENTS ============
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.service-card, .why-card, .pricing-card, .result-card, .pill, .step'
  ).forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// ============ NAVBAR SCROLL EFFECT ============
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.style.background = 'rgba(10, 13, 26, 0.98)';
    navbar.style.borderBottomColor = 'rgba(45, 156, 235, 0.2)';
    navbar.style.boxShadow = '0 10px 40px rgba(45, 156, 235, 0.1)';
  } else {
    navbar.style.background = 'rgba(10, 13, 26, 0.9)';
    navbar.style.borderBottomColor = 'rgba(45, 156, 235, 0.1)';
    navbar.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

// ============ DYNAMIC PRICING HIGHLIGHT ============
document.addEventListener('DOMContentLoaded', () => {
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      pricingCards.forEach(c => {
        c.style.opacity = '0.7';
        c.style.transform = 'scale(0.95)';
      });
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
    
    card.addEventListener('mouseleave', function() {
      pricingCards.forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'scale(1)';
      });
    });
  });
});

// ============ SERVICE CARD HOVER EFFECTS ============
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const icon = card.querySelector('.service-icon-circle');
    
    card.addEventListener('mouseenter', function() {
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(10deg)';
      }
      this.style.transform = 'translateY(-6px)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
      this.style.transform = 'translateY(0)';
    });
  });
});

// ============ COUNTER ANIMATION FOR STATS ============
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const isDecimal = target % 1 !== 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = isDecimal ? target.toFixed(1) : target;
      clearInterval(timer);
    } else {
      element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }
  }, 16);
}

// ============ OBSERVE AND ANIMATE STATS ============
document.addEventListener('DOMContentLoaded', () => {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statElement = entry.target.querySelector('.result-number');
        if (statElement) {
          const text = statElement.textContent.trim();
          const number = parseFloat(text.replace(/[^\d.]/g, ''));
          
          if (!isNaN(number)) {
            animateCounter(statElement, number);
          }
        }
        
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.result-card').forEach(card => {
    statObserver.observe(card);
  });
});

// ============ FORM VALIDATION ============
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
  // Escape key closes any open modals
  if (e.key === 'Escape') {
    console.log('Escape key pressed');
  }
  
  // Home key scrolls to top
  if (e.key === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // End key scrolls to bottom
  if (e.key === 'End') {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
});

// ============ TRACK USER INTERACTIONS ============
document.addEventListener('DOMContentLoaded', () => {
  // Track button clicks
  document.querySelectorAll('.btn, .service-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      animateButtonClick(e);
      const action = this.textContent.trim();
      console.log(`✓ User clicked: ${action}`);
    });
  });
  
  // Track section views
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionName = entry.target.id || entry.target.className;
        console.log(`✓ User viewed: ${sectionName}`);
      }
    });
  }, { threshold: 0.25 });
  
  sections.forEach(section => sectionObserver.observe(section));
});

// ============ PERFORMANCE OPTIMIZATION ============
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedScroll = debounce(function() {
  // Handle scroll events with debouncing
}, 100);

window.addEventListener('scroll', debouncedScroll, { passive: true });

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
  console.log('✓ Axiom Automations website fully loaded');
  document.body.style.opacity = '1';
  
  // Trigger entrance animations
  const elements = document.querySelectorAll('[class*="animated"]');
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.style.animation = 'fadeInUp 0.6s ease forwards';
    }, index * 100);
  });
});

// ============ ACCESSIBILITY ENHANCEMENTS ============
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn, .service-btn, .pricing-btn');
  buttons.forEach((btn, index) => {
    if (!btn.getAttribute('aria-label')) {
      btn.setAttribute('aria-label', btn.textContent.trim());
    }
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
  });
  
  // Add keyboard support for buttons
  buttons.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

// ============ RIPPLE ANIMATION STYLE ============
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// ============ RESPONSIVE IMAGE HANDLING ============
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

if (isMobile()) {
  console.log('✓ Mobile device detected - optimized experience loaded');
}

// ============ SESSION TRACKING ============
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('axiom_visited', 'true');
  sessionStorage.setItem('axiom_last_visit', new Date().toISOString());
});

// ============ ERROR HANDLING ============
window.addEventListener('error', (event) => {
  console.error('⚠ An error occurred:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('⚠ Unhandled promise rejection:', event.reason);
});

// ============ CONSOLE MESSAGES ============
console.log('%c┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓', 'color: #1d9ceb; font-weight: bold;');
console.log('%c┃  AXIOM AUTOMATIONS  ┃', 'color: #1d9ceb; font-weight: bold;');
console.log('%c┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛', 'color: #1d9ceb; font-weight: bold;');
console.log('%cAI Automation Services for Businesses', 'color: #a8a8a8; font-size: 12px;');
console.log('%cWebsite: https://axiomautomations.com', 'color: #a8a8a8; font-size: 12px;');
console.log('%cEmail: contact@axiomautomations.com', 'color: #a8a8a8; font-size: 12px;');
console.log('%c\n✓ All systems operational', 'color: #10b981; font-weight: bold;');
function toggleDarkMode() {
  document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'none' : 'invert(1)';
}
