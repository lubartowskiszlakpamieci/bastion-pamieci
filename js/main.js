/**
 * BASTION PAMIĘCI – Główny skrypt
 * Nawigacja, animacje, scroll efekty
 */

(function() {
    'use strict';

    // ===================================================
    // NAWIGACJA
    // ===================================================
    function initNavigation() {
        const nav = document.getElementById('mainNav');
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        // Scroll efekt nawigacji
        function handleNavScroll() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleNavScroll, { passive: true });

        // Mobile menu toggle
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                navLinks.classList.toggle('open');
                const isOpen = navLinks.classList.contains('open');
                navToggle.setAttribute('aria-expanded', isOpen);
            });

            // Zamknij menu przy kliknięciu linku
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('open');
                });
            });
        }

        // Aktywne sekcje w nawigacji
        const sections = document.querySelectorAll('section[id]');
        const navAnchors = document.querySelectorAll('.nav-links a');

        function updateActiveNav() {
            const scrollPos = window.scrollY + 80;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navAnchors.forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === `#${id}`) {
                            a.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav, { passive: true });
    }

    // ===================================================
    // ANIMACJA LICZNIKÓW (Hero stats)
    // ===================================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        let hasAnimated = false;

        function animateCounters() {
            if (hasAnimated) return;

            const heroSection = document.getElementById('hero');
            if (!heroSection) return;

            const rect = heroSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                hasAnimated = true;

                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target')) || 0;
                    const duration = 2000;
                    const start = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                        const current = Math.floor(eased * target);
                        counter.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCount);
                });
            }
        }

        window.addEventListener('scroll', animateCounters, { passive: true });
        // Sprawdź przy załadowaniu
        setTimeout(animateCounters, 500);
    }

    // ===================================================
    // ANIMACJE FADE-IN (Intersection Observer)
    // ===================================================
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            fadeElements.forEach(el => observer.observe(el));
        } else {
            // Fallback dla starszych przeglądarek
            fadeElements.forEach(el => el.classList.add('visible'));
        }
    }

    // ===================================================
    // SCROLL TO TOP
    // ===================================================
    function initScrollTop() {
        const scrollBtn = document.getElementById('scrollTop');
        if (!scrollBtn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===================================================
    // EFEKT MASZYNY DO PISANIA (hero quote)
    // ===================================================
    function initTypewriterEffect() {
        const stamp = document.querySelector('.hero-stamp');
        if (!stamp) return;

        // Subtelny blink efekt na stampie
        setInterval(() => {
            stamp.style.opacity = stamp.style.opacity === '0.6' ? '0.85' : '0.6';
        }, 2500);
    }

    // ===================================================
    // GŁADKIE PRZEWIJANIE dla linków kotwicowych
    // ===================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 64; // wysokość nawigacji
                    const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;

                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================================
    // EFEKT PARALLAX dla hero
    // ===================================================
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;

            if (scrollY < heroHeight) {
                const parallaxFactor = scrollY * 0.3;
                hero.querySelector('.hero-content').style.transform = 
                    `translateY(${parallaxFactor}px)`;
                hero.querySelector('.hero-overlay').style.opacity = 
                    0.7 + (scrollY / heroHeight) * 0.3;
            }
        }, { passive: true });
    }

    // ===================================================
    // DODAJ KLASY FADE-IN do sekcji
    // ===================================================
    function addFadeInClasses() {
        // Sekcja Uskok
        document.querySelectorAll('.bio-text, .timeline-item, .quote-box, .death-panel').forEach(el => {
            el.classList.add('fade-in');
        });

        // Sekcja Wiktor
        document.querySelectorAll('.resistance-badge, .wiktor-quote-special').forEach(el => {
            el.classList.add('fade-in');
        });

        // Sekcja porównawcza
        document.querySelectorAll('.comparison-panel, .bib-card').forEach(el => {
            el.classList.add('fade-in');
        });

        // Statystyki hero
        document.querySelectorAll('.stat-item').forEach((el, i) => {
            el.classList.add('fade-in', `fade-in-delay-${i + 1}`);
        });
    }

    // ===================================================
    // EFEKT GLITCH na tytule hero (subtelny)
    // ===================================================
    function initGlitchEffect() {
        const title = document.querySelector('.hero-title-line2');
        if (!title) return;

        // Delikatny glitch co jakiś czas
        setInterval(() => {
            if (Math.random() < 0.3) {
                title.style.textShadow = `
                    ${Math.random() * 4 - 2}px 0 rgba(192, 57, 43, 0.8),
                    ${Math.random() * 4 - 2}px 0 rgba(139, 0, 0, 0.5),
                    2px 2px 8px rgba(0,0,0,0.8)
                `;
                setTimeout(() => {
                    title.style.textShadow = '2px 2px 8px rgba(0,0,0,0.8), 0 0 30px rgba(139, 0, 0, 0.4)';
                }, 150);
            }
        }, 4000);
    }

    // ===================================================
    // KEYBOARD SHORTCUT - szybki dostęp do mapy
    // ===================================================
    function initKeyboard() {
        document.addEventListener('keydown', function(e) {
            // Alt + M = Mapa
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' });
            }
            // Alt + G = Galeria
            if (e.altKey && e.key === 'g') {
                e.preventDefault();
                document.getElementById('galeria')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===================================================
    // PROGRESS BAR CZYTANIA
    // ===================================================
    function initReadingProgress() {
        const bar = document.createElement('div');
        bar.id = 'readingProgress';
        bar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 2px;
            background: linear-gradient(to right, #8b0000, #c0392b, #c9a227);
            z-index: 9999;
            transition: width 0.1s;
            width: 0%;
        `;
        document.body.prepend(bar);

        window.addEventListener('scroll', function() {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / docHeight) * 100;
            bar.style.width = Math.min(scrolled, 100) + '%';
        }, { passive: true });
    }

    // ===================================================
    // INICJALIZACJA GŁÓWNA
    // ===================================================
    function init() {
        addFadeInClasses();
        initNavigation();
        initCounters();
        initScrollAnimations();
        initScrollTop();
        initTypewriterEffect();
        initSmoothScroll();
        initParallax();
        initGlitchEffect();
        initKeyboard();
        initReadingProgress();

        console.log('%cBASTION PAMIĘCI', 'color: #8b0000; font-size: 1.5rem; font-weight: bold;');
        console.log('%cCyfrowe Archiwum Oddziału kpt. Zdzisława Brońskiego „Uskoka"', 'color: #c9a227;');
        console.log('%cPowiat Lubartów · 1944–1953 · 119 żołnierzy', 'color: #8b6914;');
    }

    // Uruchom po załadowaniu DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
