document.addEventListener("DOMContentLoaded", function() {
    // Animation delays
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') !== '#') {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.navbar').offsetHeight,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        }
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + document.querySelector('.navbar').offsetHeight;
        const navHeight = document.querySelector('.navbar').offsetHeight;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 30;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    
    // Profile animation
    const profileFrame = document.querySelector('.profile-frame');
    if (profileFrame) {
        let rotation = 0;
        const rotateAnimation = () => {
            rotation += 0.5;
            profileFrame.querySelector('.frame-animation').style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(rotateAnimation);
        };
        rotateAnimation();
    }
    
    // Dark/Light mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    themeToggle.addEventListener('click', function() {
        let theme = 'light';
        if (document.documentElement.getAttribute('data-theme') !== 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            theme = 'dark';
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    });
});