// ============================================
// SCRIPT.JS - Complete JavaScript
// John Kiharu Portfolio
// ============================================

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==================== LOADING SCREEN ====================
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 1500);
    });

    // ==================== MOUSE GLOW & TRAIL ====================
    const mouseGlow = document.getElementById('mouse-glow');
    const mouseTrail = document.getElementById('mouse-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (mouseGlow) {
            mouseGlow.style.left = mouseX + 'px';
            mouseGlow.style.top = mouseY + 'px';
        }
    });

    // Smooth trail following
    function updateTrail() {
        if (mouseTrail) {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            mouseTrail.style.left = trailX + 'px';
            mouseTrail.style.top = trailY + 'px';
        }
        requestAnimationFrame(updateTrail);
    }
    updateTrail();

    // ==================== NAVIGATION ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // Sticky navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        lastScroll = currentScroll;
    });

    // Mobile navigation toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== TYPEWRITER EFFECT ====================
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const phrases = [
            'John Kiharu',
            'a Web Developer',
            'a Graphics Designer',
            'a Forex Trader',
            'a Creative Problem Solver',
            'a Digital Craftsman'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                // Deleting text
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                // Typing text
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 80;
            }

            // If word is complete
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause before deleting
            }

            // If word is fully deleted
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pause before typing next
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start the typewriter
        setTimeout(typeWriter, 1000);
    }

    // ==================== ANIMATED COUNTERS ====================
    const counters = document.querySelectorAll('.stat-number, .achievement-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target || isNaN(target)) return;
            
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * target);
                
                if (target <= 20) {
                    counter.textContent = current;
                } else {
                    counter.textContent = current + '+';
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target <= 20) {
                        counter.textContent = target;
                    } else {
                        counter.textContent = target + '+';
                    }
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
        
        countersAnimated = true;
    }

    // ==================== SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.reveal, .service-card, .portfolio-item, .testimonial-card, .achievement-item, .tech-item, .stat-item, .about-image, .about-content');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight - 100;
    }

    function handleScrollReveal() {
        let hasVisibleCounters = false;
        
        revealElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
                
                // Check if this element contains counters
                if (el.querySelector('.stat-number') || el.querySelector('.achievement-number')) {
                    hasVisibleCounters = true;
                }
            }
        });
        
        // Animate counters when they come into view
        if (hasVisibleCounters && !countersAnimated) {
            const statsSection = document.querySelector('.hero-stats, .achievements');
            if (statsSection && isElementInViewport(statsSection)) {
                animateCounters();
            }
        }
    }

    // Initial check
    setTimeout(handleScrollReveal, 100);

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            handleScrollReveal();
            scrollTimeout = null;
        }, 100);
    });

    // ==================== PARTICLES SYSTEM ====================
    const particlesCanvas = document.getElementById('particles-canvas');
    if (particlesCanvas) {
        const ctx = particlesCanvas.getContext('2d');
        let particles = [];
        let particleCount = 80;

        function resizeCanvas() {
            const container = particlesCanvas.parentElement;
            particlesCanvas.width = container.offsetWidth;
            particlesCanvas.height = container.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * particlesCanvas.width;
                this.y = Math.random() * particlesCanvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > particlesCanvas.width) {
                    this.speedX *= -1;
                }
                if (this.y < 0 || this.y > particlesCanvas.height) {
                    this.speedY *= -1;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Draw connections between nearby particles
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            drawConnections();

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ==================== LIVE CHARACTER ANIMATION ====================
    const characterCanvas = document.getElementById('character-canvas');
    if (characterCanvas) {
        const ctxChar = characterCanvas.getContext('2d');

        function resizeCharacterCanvas() {
            const container = characterCanvas.parentElement;
            const rect = container.getBoundingClientRect();
            characterCanvas.width = rect.width || 400;
            characterCanvas.height = rect.height || 400;
        }

        resizeCharacterCanvas();
        window.addEventListener('resize', resizeCharacterCanvas);

        // Character animation state
        let characterTime = 0;
        const characterParts = [];

        // Create character parts
        class CharacterPart {
            constructor(x, y, size, color, type) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.type = type;
                this.angle = 0;
                this.targetX = x;
                this.targetY = y;
                this.phase = Math.random() * Math.PI * 2;
                this.baseSize = size;
            }

            update(time) {
                const w = characterCanvas.width;
                const h = characterCanvas.height;
                const centerX = w / 2;
                const centerY = h / 2;
                const scale = Math.min(w, h) / 400;

                // Gentle floating animation
                const floatX = Math.sin(time * 0.5 + this.phase) * 5 * scale;
                const floatY = Math.cos(time * 0.7 + this.phase) * 5 * scale;
                
                // Breathing animation for size
                const breathe = Math.sin(time * 0.8 + this.phase) * 0.05 + 1;
                
                // Position relative to center
                const baseX = centerX + this.x * scale;
                const baseY = centerY + this.y * scale;
                
                this.targetX = baseX + floatX;
                this.targetY = baseY + floatY;
                this.size = this.baseSize * scale * breathe;
                
                // Smooth interpolation
                this.x += (this.targetX - this.x) * 0.05;
                this.y += (this.targetY - this.y) * 0.05;
            }

            draw(ctx) {
                ctx.save();
                
                // Glow effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 2
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
                ctx.fill();

                // Main shape
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 20;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                ctx.restore();
            }
        }

        // Initialize character parts (figure)
        function initCharacter() {
            const w = characterCanvas.width;
            const h = characterCanvas.height;
            const centerX = w / 2;
            const centerY = h / 2;
            const scale = Math.min(w, h) / 400;

            // Head
            characterParts.push(new CharacterPart(
                0, -80 * scale, 30 * scale,
                'rgba(0, 229, 255, 0.9)', 'head'
            ));

            // Body
            characterParts.push(new CharacterPart(
                0, -20 * scale, 35 * scale,
                'rgba(15, 98, 254, 0.8)', 'body'
            ));

            // Left arm
            characterParts.push(new CharacterPart(
                -50 * scale, -30 * scale, 12 * scale,
                'rgba(0, 229, 255, 0.7)', 'arm'
            ));

            // Right arm
            characterParts.push(new CharacterPart(
                50 * scale, -30 * scale, 12 * scale,
                'rgba(0, 229, 255, 0.7)', 'arm'
            ));

            // Left leg
            characterParts.push(new CharacterPart(
                -20 * scale, 40 * scale, 15 * scale,
                'rgba(15, 98, 254, 0.7)', 'leg'
            ));

            // Right leg
            characterParts.push(new CharacterPart(
                20 * scale, 40 * scale, 15 * scale,
                'rgba(15, 98, 254, 0.7)', 'leg'
            ));

            // Eye left
            characterParts.push(new CharacterPart(
                -12 * scale, -90 * scale, 4 * scale,
                '#FFFFFF', 'eye'
            ));

            // Eye right
            characterParts.push(new CharacterPart(
                12 * scale, -90 * scale, 4 * scale,
                '#FFFFFF', 'eye'
            ));

            // Pupil left
            characterParts.push(new CharacterPart(
                -10 * scale, -90 * scale, 2 * scale,
                '#00E5FF', 'pupil'
            ));

            // Pupil right
            characterParts.push(new CharacterPart(
                14 * scale, -90 * scale, 2 * scale,
                '#00E5FF', 'pupil'
            ));

            // Smile
            characterParts.push(new CharacterPart(
                0, -75 * scale, 8 * scale,
                'rgba(0, 229, 255, 0.6)', 'smile'
            ));

            // Orbiting code elements
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 70 * scale;
                characterParts.push(new CharacterPart(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius - 20 * scale,
                    3 * scale,
                    `hsla(${200 + i * 20}, 100%, 70%, 0.6)`,
                    'orbital'
                ));
            }
        }

        initCharacter();

        function animateCharacter(timestamp) {
            const time = timestamp / 1000;
            characterTime = time;

            // Clear canvas
            ctxChar.clearRect(0, 0, characterCanvas.width, characterCanvas.height);

            // Background holographic effect
            const gradient = ctxChar.createRadialGradient(
                characterCanvas.width / 2,
                characterCanvas.height / 2,
                0,
                characterCanvas.width / 2,
                characterCanvas.height / 2,
                characterCanvas.width / 2
            );
            gradient.addColorStop(0, 'rgba(0, 229, 255, 0.05)');
            gradient.addColorStop(1, 'transparent');
            ctxChar.fillStyle = gradient;
            ctxChar.fillRect(0, 0, characterCanvas.width, characterCanvas.height);

            // Update and draw parts
            characterParts.forEach(part => {
                part.update(time);
                part.draw(ctxChar);
            });

            // Draw connection lines for orbital elements
            const orbitals = characterParts.filter(p => p.type === 'orbital');
            if (orbitals.length > 1) {
                for (let i = 0; i < orbitals.length; i++) {
                    for (let j = i + 1; j < orbitals.length; j++) {
                        const dx = orbitals[i].x - orbitals[j].x;
                        const dy = orbitals[i].y - orbitals[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            const opacity = (1 - distance / 100) * 0.15;
                            ctxChar.beginPath();
                            ctxChar.moveTo(orbitals[i].x, orbitals[i].y);
                            ctxChar.lineTo(orbitals[j].x, orbitals[j].y);
                            ctxChar.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
                            ctxChar.lineWidth = 0.5;
                            ctxChar.stroke();
                        }
                    }
                }
            }

            requestAnimationFrame(animateCharacter);
        }

        // Start character animation
        if (characterParts.length > 0) {
            requestAnimationFrame(animateCharacter);
        }
    }

    // ==================== FLOATING OBJECTS PARALLAX ====================
    const floatingObjects = document.querySelectorAll('.float-obj');

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        floatingObjects.forEach(obj => {
            const speed = parseFloat(obj.getAttribute('data-speed')) || 2;
            const depth = parseFloat(obj.getAttribute('data-depth')) || 0.2;
            
            const moveX = x * depth * 20 * speed / 4;
            const moveY = y * depth * 20 * speed / 4;
            
            obj.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== NEWSLETTER FORM ====================
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            const email = input.value.trim();
            
            if (email) {
                // Show success message
                const originalText = input.placeholder;
                input.placeholder = 'Subscribed! 🎉';
                input.disabled = true;
                
                const button = this.querySelector('button');
                button.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    input.placeholder = originalText;
                    input.value = '';
                    input.disabled = false;
                    button.innerHTML = '<i class="fas fa-paper-plane"></i>';
                }, 3000);
            }
        });
    }

    // ==================== DYNAMIC YEAR IN FOOTER ====================
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile nav
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navToggle.click();
        }
    });

    // ==================== PERFORMANCE OPTIMIZATION ====================
    // Reduce animations on low-end devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.float-obj, .gradient-orb, .particles-canvas, .character-canvas').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }

    // ==================== CONSOLE WELCOME ====================
    console.log('%c John Kiharu Portfolio ', 'background: linear-gradient(135deg, #0F62FE, #00E5FF); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Designed & Developed by John Kiharu ', 'color: #00E5FF; font-size: 14px;');
    console.log('%c Check out the source code on GitHub! ', 'color: #8899AA; font-size: 12px;');

    // ==================== PAGE TRANSITIONS ====================
    // Add fade-in animation to page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // ==================== PREVENT DEFAULT BEHAVIORS ====================
    // Prevent image dragging
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    console.log('🚀 John Kiharu Portfolio initialized successfully!');
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
    // You can add error reporting here if needed
});

// ==================== SERVICE WORKER (Optional) ====================
// Uncomment to add PWA support
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered successfully');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed:', err);
            });
    });
}
*/

// ==================== INTERSECTION OBSERVER (Fallback) ====================
// Fallback for older browsers that don't support Intersection Observer
if (!('IntersectionObserver' in window)) {
    // Fallback: trigger all reveals and counters immediately
    document.querySelectorAll('.reveal, .service-card, .portfolio-item, .testimonial-card, .achievement-item, .tech-item, .stat-item, .about-image, .about-content').forEach(el => {
        el.classList.add('active');
    });
    // Trigger counters
    setTimeout(() => {
        const counters = document.querySelectorAll('.stat-number, .achievement-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (target) {
                if (target <= 20) {
                    counter.textContent = target;
                } else {
                    counter.textContent = target + '+';
                }
            }
        });
    }, 1000);
}






// ==================== FAQ ACCORDION ====================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Set initial state
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) {
                            otherQuestion.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
});












// ==================== PORTFOLIO FILTERS ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const noResults = document.querySelector('.portfolio-no-results');

if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            // Filter cards
            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Add animation
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                    card.style.animation = '';
                }
            });
            
            // Show/hide no results message
            if (noResults) {
                if (visibleCount === 0) {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            }
        });
    });
}







// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('.form-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual API call)
        setTimeout(() => {
            // Hide form
            const formElements = this.querySelectorAll('.form-group, .form-submit');
            formElements.forEach(el => el.style.display = 'none');
            
            // Show success message
            const successDiv = this.querySelector('.form-success');
            if (successDiv) {
                successDiv.style.display = 'block';
            }
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log data (remove in production)
            console.log('Form Data:', data);
        }, 2000);
    });
}

// ==================== SMOOTH SCROLL TO CONTACT FORM ====================
document.querySelectorAll('a[href="#contact-form"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector('#contact-form');
        if (target) {
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focus on first input
            const firstInput = target.querySelector('.form-input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 800);
            }
        }
    });
});






// ==================== CONTACT FORM - FORMSUBMIT.CO ====================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Get the form action URL
        const formAction = contactForm.getAttribute('action');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.form-submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = new FormData(this);
            
            // Send to FormSubmit.co
            fetch(formAction, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Hide form fields
                    const formGroups = contactForm.querySelectorAll('.form-group');
                    formGroups.forEach(el => el.style.display = 'none');
                    
                    // Hide submit button
                    submitBtn.style.display = 'none';
                    
                    // Show success message
                    const successDiv = contactForm.querySelector('.form-success');
                    if (successDiv) {
                        successDiv.style.display = 'block';
                    }
                    
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact me directly via email.');
                
                // Reset button
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            });
        });
    }
});












// ==================== MOBILE PERFORMANCE OPTIMIZATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Reduce particle count on mobile
    if (isMobile || isTouch) {
        const canvas = document.getElementById('particles-canvas');
        if (canvas) {
            // Reduce particles via CSS
            canvas.style.opacity = '0.5';
        }
    }
    
    // Disable parallax on mobile
    if (isMobile) {
        const floatingObjects = document.querySelectorAll('.float-obj');
        floatingObjects.forEach(obj => {
            obj.style.transform = 'none';
            obj.style.transition = 'none';
        });
    }
    
    // Add touch feedback for buttons
    if (isTouch) {
        document.querySelectorAll('.btn, .filter-btn, .nav-toggle').forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });
    }
    
    // Close mobile nav on resize to desktop
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            navToggle.click();
        }
    });
});

// ==================== LAZY LOAD IMAGES ====================
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images for better performance
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});