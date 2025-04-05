// DOM Elements
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const navLinks = document.querySelector('.nav-links');
const bookingForm = document.getElementById('bookingForm');
const submitBtn = document.querySelector('.submit-btn');
const currentYear = document.getElementById('currentYear');

// Mobile Menu Toggle
function toggleMenu() {
  navLinks.classList.toggle('active');
  const isExpanded = navLinks.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
  
  // Toggle body scroll when menu is open
  document.body.style.overflow = isExpanded ? 'hidden' : 'auto';
}

// Event Listeners
hamburger.addEventListener('click', toggleMenu);
closeIcon.addEventListener('click', toggleMenu);

// Close menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission
bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  submitBtn.classList.add('loading');
  
  // Simulate API call
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showAlert('Booking request submitted successfully! We will contact you soon.', 'success');
    
    // Reset form
    bookingForm.reset();
  } catch (error) {
    showAlert('Failed to submit booking. Please try again.', 'error');
  } finally {
    // Hide loading state
    submitBtn.classList.remove('loading');
  }
});

// Show alert message
function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert ${type}`;
  alertDiv.textContent = message;
  
  // Insert alert before the form
  bookingForm.parentNode.insertBefore(alertDiv, bookingForm);
  
  // Remove alert after 5 seconds
  setTimeout(() => {
    alertDiv.classList.add('fade-out');
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

// Service buttons click handler
document.querySelectorAll('.service-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const service = e.target.dataset.service;
    // Scroll to booking form and auto-select the service
    document.querySelector('#booking').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('package').value = service;
  });
});

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections with animation class
document.querySelectorAll('.services, .testimonials, .booking').forEach(section => {
  observer.observe(section);
});