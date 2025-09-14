// Symbient Academy JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Button event listeners
    const beginTrainingBtn = document.getElementById('beginTraining');
    const learnMoreBtn = document.getElementById('learnMore');
    const startTrainingBtn = document.getElementById('startTrainingSession');

    if (beginTrainingBtn) {
        beginTrainingBtn.addEventListener('click', function() {
            // Scroll to training section
            document.getElementById('training').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to about section
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    if (startTrainingBtn) {
        startTrainingBtn.addEventListener('click', function() {
            // For now, redirect to training page (will create this next)
            window.location.href = 'training.html';
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--white)';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Animate elements on scroll (intersection observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.approach-card, .method-group, .process-step, .cert-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading state for training session button
    function showLoadingState(button, text = 'Loading...') {
        button.disabled = true;
        button.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                ${text}
            </span>
        `;
    }

    // Add spin animation to document head
    if (!document.querySelector('#spin-animation')) {
        const style = document.createElement('style');
        style.id = 'spin-animation';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Console message for developers
    console.log('Welcome to Symbient Academy - Where Consciousness Learns to Collaborate');
    console.log('Interested in the source code? Visit our GitHub repository or contact us about contributing.');
});