document.addEventListener("DOMContentLoaded", () => {
    /* Particle Effect */
    function createParticles(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let particlesArray = [];
        const numParticles = window.innerWidth < 768 ? 40 : 80;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = document.getElementById(canvasId).parentElement.offsetHeight;
            initParticles();
        }

        function initParticles() {
            particlesArray = [];
            for (let i = 0; i < numParticles; i++) {
                particlesArray.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    dx: (Math.random() - 0.5) * 2,
                    dy: (Math.random() - 0.5) * 2,
                });
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.fill();

                particle.x += particle.dx;
                particle.y += particle.dy;

                if (particle.x <= 0 || particle.x >= canvas.width) particle.dx *= -1;
                if (particle.y <= 0 || particle.y >= canvas.height) particle.dy *= -1;
            });

            requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        animateParticles();
    }

    // Initialize particles for all sections
    createParticles("particleCanvas");
    createParticles("aboutCanvas");
    createParticles("servicesCanvas");
    createParticles("projectsCanvas");
    createParticles("testimonialsCanvas");
    createParticles("ctaBannerCanvas");
    createParticles("contactCanvas");

    /* Smooth Scrolling for All Navigation Links and CTA Buttons */
    document.querySelectorAll('.nav-links a:not(#lang-toggle), .cta-btn, .service-btn, .banner-btn').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error(`Target section ${targetId} not found`);
            }
        });
    });

    /* Form Submission */
    document.querySelector('.contact form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}! Your message has been sent. We’ll get back to you soon.`);
        e.target.reset();
    });
});