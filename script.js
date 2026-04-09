/* ═══════════════════════════════════════════════════════════════
   RAVEN WALLET — Website Interactive Logic
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── NAV SCROLL EFFECT ──────────────────────────────────────
    const nav = document.getElementById('nav');
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ── MOBILE NAV TOGGLE ──────────────────────────────────────
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // ── STATS COUNTER ANIMATION ────────────────────────────────
    const counters = document.querySelectorAll('[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCounter(el, target);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(el, target) {
        const duration = 2000;
        const startTime = performance.now();
        const start = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(update);
    }

    // ── SCROLL REVEAL ANIMATION ────────────────────────────────
    const revealElements = document.querySelectorAll(
        '.bento-card, .chain-card, .step-card, .testimonial-card, .stat-item, .section-header, .rewards-split, .cta-content'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── STAGGERED REVEAL FOR GRID ITEMS ────────────────────────
    const gridContainers = document.querySelectorAll('.bento-grid, .chain-grid, .testimonials-grid, .stats-grid');
    gridContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.08}s`;
        });
    });

    // ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── PARALLAX EFFECT FOR HERO GLOWS ─────────────────────────
    const heroGlows = document.querySelectorAll('.hero-glow');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        heroGlows.forEach((glow, index) => {
            const factor = (index + 1) * 15;
            glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    }, { passive: true });

    // ── FLOATING CHAIN ORBS ENHANCED ANIMATION ─────────────────
    const floatingChains = document.querySelectorAll('.floating-chain');
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function updateFloatingChains() {
        floatingChains.forEach((chain, index) => {
            const rect = chain.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = (mouseX - centerX) * 0.02 * (index % 2 === 0 ? 1 : -1);
            const dy = (mouseY - centerY) * 0.02 * (index % 2 === 0 ? -1 : 1);
            chain.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        requestAnimationFrame(updateFloatingChains);
    }
    updateFloatingChains();

    // ── REWARD BAR ANIMATION ───────────────────────────────────
    const rewardFills = document.querySelectorAll('.reward-fill, .rvnx-fill');
    const rewardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'width 1.8s cubic-bezier(0.16, 1, 0.3, 1)';
                rewardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    rewardFills.forEach(fill => rewardObserver.observe(fill));

    // ── ACTIVE NAV LINK HIGHLIGHT ──────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = 'var(--primary)';
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

});
