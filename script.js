/* ============================================
   NEXEAGENT - ANIMATED UI JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // MODAL COMPONENT
    // Uses CSS animations (triggered via classes)
    // compatible with Framer Motion's spring physics
    // =============================================
    const modalOverlay = document.getElementById('modalOverlay');
    const modalPanel = document.getElementById('modalPanel');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtns = [
        document.getElementById('closeModal'),
        document.getElementById('closeModalFooter')
    ];

    let modalVisible = false;

    function openModal() {
        modalOverlay.style.display = 'flex';
        // Force reflow to restart animation
        void modalPanel.offsetWidth;
        modalPanel.classList.add('animate-in');
        modalVisible = true;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalPanel.classList.remove('animate-in');
        modalPanel.classList.add('animate-out');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            modalPanel.classList.remove('animate-out');
            modalVisible = false;
            document.body.style.overflow = '';
        }, 300);
    }

    openModalBtn.addEventListener('click', openModal);
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalVisible) closeModal();
    });

    // =============================================
    // SIDEBAR COMPONENT
    // =============================================
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarPanel = document.getElementById('sidebarPanel');
    const openSidebarBtn = document.getElementById('openSidebar');
    const closeSidebarBtn = document.getElementById('closeSidebar');
    let sidebarVisible = false;

    function openSidebar() {
        sidebarOverlay.style.display = 'block';
        void sidebarPanel.offsetWidth;
        sidebarPanel.classList.add('animate-in-slide');
        sidebarVisible = true;
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebarPanel.classList.remove('animate-in-slide');
        sidebarPanel.classList.add('animate-out-slide');
        setTimeout(() => {
            sidebarOverlay.style.display = 'none';
            sidebarPanel.classList.remove('animate-out-slide');
            sidebarVisible = false;
            document.body.style.overflow = '';
        }, 300);
    }

    openSidebarBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.querySelector('.sidebar-overlay-bg').addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebarVisible) closeSidebar();
    });

    // Touch swipe for sidebar
    let touchStartX = 0;
    sidebarOverlay.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebarOverlay.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (diff > 50) closeSidebar();
    }, { passive: true });

    // =============================================
    // ACCORDION COMPONENT
    // =============================================
    const accordionData = [
        {
            question: "What is NexeAgent?",
            answer: "NexeAgent is a modern technology platform that empowers businesses with cutting-edge solutions. We combine AI-driven analytics, enterprise-grade security, and scalable architecture to help companies transform their operations."
        },
        {
            question: "How do your animations work?",
            answer: "Our animations are built with Framer Motion principles — spring-based physics for natural movement, GPU-accelerated transforms for 60fps performance, and layout-aware transitions that feel organic and responsive."
        },
        {
            question: "What features are included?",
            answer: "Our platform includes: lightning-fast analytics dashboards, enterprise security protocols, scalable cloud architecture, easy API integrations, advanced machine learning modules, 24/7 dedicated support, and comprehensive documentation."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We employ bank-grade 256-bit encryption, SOC 2 Type II compliance, regular security audits, and zero-knowledge architecture to ensure your data remains private and protected at all times."
        },
        {
            question: "How do I get started?",
            answer: "Getting started is simple! Sign up for a free account, choose your plan, and our onboarding wizard will guide you through setup. Our team is also available for personalized onboarding sessions."
        }
    ];

    const accordionContainer = document.getElementById('accordionContainer');

    accordionData.forEach((item, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        const trigger = document.createElement('button');
        trigger.className = 'accordion-trigger';
        trigger.innerHTML = `
            <span class="accordion-question">${item.question}</span>
            <span class="accordion-icon" id="icon-${index}">
                <i class="fas fa-plus"></i>
            </span>
        `;

        const content = document.createElement('div');
        content.className = 'accordion-content';
        content.innerHTML = `<div class="accordion-answer">${item.answer}</div>`;

        accordionItem.appendChild(trigger);
        accordionItem.appendChild(content);
        accordionContainer.appendChild(accordionItem);

        let isOpen = false;

        trigger.addEventListener('click', () => {
            isOpen = !isOpen;
            const iconEl = document.getElementById(`icon-${index}`);

            if (isOpen) {
                // Close all others first
                document.querySelectorAll('.accordion-item').forEach((otherItem, i) => {
                    if (i !== index) {
                        const otherContent = otherItem.querySelector('.accordion-content');
                        const otherIcon = otherItem.querySelector('.accordion-icon');
                        if (otherContent && otherContent.style.maxHeight && otherContent.style.maxHeight !== '0px') {
                            otherContent.style.maxHeight = '0px';
                            otherContent.style.opacity = '0';
                            otherContent.style.padding = '0 20px';
                            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                        }
                    }
                });

                // Open this one
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                content.style.padding = '0 20px 20px';
                if (iconEl) iconEl.style.transform = 'rotate(45deg)';
                trigger.parentElement.classList.add('active');
            } else {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                content.style.padding = '0 20px';
                if (iconEl) iconEl.style.transform = 'rotate(0deg)';
                trigger.parentElement.classList.remove('active');
            }
        });
    });

    // =============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.demo-area, .accordion-container, .section-header').forEach(el => {
        observer.observe(el);
    });

    // =============================================
    // PARALLAX EFFECT ON HERO
    // =============================================
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroContent && scrolled < 400) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    }, { passive: true });

    // =============================================
    // ACTIVE NAV LINK ON SCROLL
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary-light)';
            }
        });
    });
});

// =============================================
// FRAMER MOTION INTEGRATION (via CDN)
// If Framer Motion Web is available, enhance animations
// =============================================
if (typeof FramerMotion !== 'undefined') {
    const { motion, animate } = FramerMotion;

    // Enhance modal panel with Framer Motion spring
    document.getElementById('openModal')?.addEventListener('click', () => {
        const panel = document.getElementById('modalPanel');
        if (panel && typeof motion === 'function') {
            const el = motion(panel);
            el.set({ opacity: 0, scale: 0.8, y: 40 });
            el.animate({ opacity: 1, scale: 1, y: 0 }, {
                type: 'spring',
                damping: 25,
                stiffness: 300,
                mass: 0.8
            });
        }
    });
}