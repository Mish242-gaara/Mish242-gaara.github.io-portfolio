document.addEventListener('DOMContentLoaded', function() {
    // Gestion du téléchargement de la photo de profil
    const profilePhoto = document.getElementById('profile-photo');
    const imagePlaceholder = document.getElementById('image-placeholder');
    const profileImageContainer = document.querySelector('.profile-image-container');
    
    if (imagePlaceholder) {
        imagePlaceholder.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        profilePhoto.src = event.target.result;
                        profileImageContainer.classList.add('has-image');
                        
                        // Sauvegarder l'image dans le localStorage
                        localStorage.setItem('profilePhoto', event.target.result);
                    };
                    
                    reader.readAsDataURL(file);
                }
            };
            
            input.click();
        });
    }
    
    // Vérifier s'il y a une photo sauvegardée dans le localStorage
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto && profilePhoto) {
        profilePhoto.src = savedPhoto;
        profileImageContainer.classList.add('has-image');
    }
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Here you would typically send the form data to a server
            // For now, we'll just show an alert
            alert(`Merci pour votre message, ${name} ! Je vous répondrai dès que possible à l'adresse ${email}.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Scroll reveal animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 1000,
        reset: false
    });
    
    // Animate elements on scroll
    scrollReveal.reveal('.skill-card, .project-card, .timeline-item, .contact-form, .contact-info', {
        interval: 200
    });
    
    // Add animation delay to timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll for elements with the 'animate-on-scroll' class
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
animateOnScroll();
