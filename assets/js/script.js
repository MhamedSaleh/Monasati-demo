/* ==========================================
   CUSTOM JAVASCRIPT FOR LANDING PAGE
   Author: منصتي
   Description: All interactive features
   ========================================== */

// ==================== GLOBAL VARIABLES ====================
let currentLang = 'ar'; // Default language is Arabic
let isRTL = true;
let currentTheme = 'light'; // Default theme is light

// ==================== INITIALIZE ON DOM LOAD ====================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper
    initSwiper();
    initTeamSwiper();
    initBlogSwiper();
    initCustomerSwiper();

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Close modals on outside click
    initModalOutsideClick();

    // Prevent form default submissions
    initFormHandlers();

    // Load saved theme from localStorage
    loadSavedTheme();
});

// ==================== SWIPER INSTANCES ====================
let swiperInstances = [];

// ==================== SWIPER INITIALIZATION ====================
function initSwiper() {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        },
    });
    swiperInstances.push(swiper);
}
//...
// ==================== TEAM SWIPER INITIALIZATION ====================
function initTeamSwiper() {
    const swiper = new Swiper(".teamSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
    swiperInstances.push(swiper);
}

// ==================== BLOG SWIPER INITIALIZATION ====================
function initBlogSwiper() {
    const swiper = new Swiper(".blogSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
    swiperInstances.push(swiper);
}

// ==================== CUSTOMER SWIPER INITIALIZATION ====================
function initCustomerSwiper() {
    const swiper = new Swiper(".customerSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
    swiperInstances.push(swiper);
}

// ==================== NAVBAR SCROLL EFFECT ====================
function initNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or if it has onclick
            if (href === '#' || this.hasAttribute('onclick')) {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const bsCollapse = bootstrap.Collapse.getInstance(document.getElementById('navbarNav'));
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ==================== LANGUAGE TOGGLE ====================
function toggleLanguage() {
    isRTL = !isRTL;
    currentLang = isRTL ? 'ar' : 'en';

    const html = document.documentElement;
    const langText = document.getElementById('langText');
    // Update HTML attributes
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

    // Update language toggle button text
    langText.textContent = isRTL ? 'EN' : 'ع';

    // Update Bootstrap RTL/LTR CSS
    updateBootstrapCSS();

    // Update all translatable elements
    updateTranslations();

    // Re-initialize Swipers to fix direction issues
    reinitSwipers();
}

function reinitSwipers() {
    // Destroy existing instances
    swiperInstances.forEach(swiper => {
        if (swiper && !swiper.destroyed) {
            swiper.destroy(true, true);
        }
    });

    // Clear the array
    swiperInstances = [];

    // Re-initialize all swipers
    initSwiper();
    initTeamSwiper();
    initBlogSwiper();
    initCustomerSwiper();
}

function updateBootstrapCSS() {
    const bootstrapLink = document.querySelector('link[href*="bootstrap"]');
    if (bootstrapLink) {
        if (isRTL) {
            bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css';
        } else {
            bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
        }
    }
}

function updateTranslations() {
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else if (element.hasAttribute('data-ar-placeholder') && element.hasAttribute('data-en-placeholder')) {
            element.placeholder = element.getAttribute(`data-${currentLang}-placeholder`);
        } else {
            element.textContent = text;
        }
    });
}

// ==================== PRICING TOGGLE ====================
function togglePricing(period) {
    const buttons = document.querySelectorAll('[data-period]');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    const periodTexts = document.querySelectorAll('.period-text');

    // Update active button
    buttons.forEach(btn => {
        if (btn.getAttribute('data-period') === period) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Toggle prices display
    if (period === 'monthly') {
        monthlyPrices.forEach(el => el.style.display = 'inline');
        yearlyPrices.forEach(el => el.style.display = 'none');
        periodTexts.forEach(el => {
            el.setAttribute('data-ar', 'شهرياً');
            el.setAttribute('data-en', 'month');
            el.textContent = currentLang === 'ar' ? 'شهرياً' : 'month';
        });
    } else {
        monthlyPrices.forEach(el => el.style.display = 'none');
        yearlyPrices.forEach(el => el.style.display = 'inline');
        periodTexts.forEach(el => {
            el.setAttribute('data-ar', 'سنوياً');
            el.setAttribute('data-en', 'year');
            el.textContent = currentLang === 'ar' ? 'سنوياً' : 'year';
        });
    }
}

// ==================== FAQ ACCORDION ====================
function toggleAccordion(button) {
    const item = button.parentElement;
    const content = item.querySelector('.accordion-content-custom');
    const allItems = document.querySelectorAll('.accordion-item-custom');

    // Close all other accordions
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            const otherContent = otherItem.querySelector('.accordion-content-custom');
            const otherButton = otherItem.querySelector('.accordion-button-custom');
            otherContent.style.maxHeight = null;
            otherButton.classList.remove('active');
        }
    });

    // Toggle current accordion
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        button.classList.remove('active');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        button.classList.add('active');
    }
}

// ==================== LOGIN MODAL ====================
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset to login tab
    switchTab('login');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    const modalTitle = document.getElementById('loginModalTitle');

    tabs.forEach(btn => {
        const btnText = btn.textContent.trim();
        if ((tab === 'login' && (btnText.includes('تسجيل الدخول') || btnText.includes('Login'))) ||
            (tab === 'register' && (btnText.includes('تسجيل جديد') || btnText.includes('Register')))) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        modalTitle.textContent = currentLang === 'ar' ? 'تسجيل الدخول' : 'Login';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        modalTitle.textContent = currentLang === 'ar' ? 'تسجيل جديد' : 'Register';
    }
}

// ==================== CONTACT MODAL ====================
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function submitContactForm(event) {
    event.preventDefault();

    // Get form data (you can process it here)
    const formData = new FormData(event.target);

    // Show success message (you can customize this)
    alert(currentLang === 'ar'
        ? 'شكراً لتواصلك معنا! سنرد عليك في أقرب وقت.'
        : 'Thank you for contacting us! We will respond as soon as possible.');

    // Close modal
    closeContactModal();

    // Reset form
    event.target.reset();

    return false;
}

// ==================== PASSWORD TOGGLE ====================
function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ==================== MODAL OUTSIDE CLICK ====================
function initModalOutsideClick() {
    const modals = document.querySelectorAll('.modal-overlay');

    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                if (modal.id === 'loginModal') {
                    closeLoginModal();
                } else if (modal.id === 'contactModal') {
                    closeContactModal();
                }
            }
        });
    });
}

// ==================== FORM HANDLERS ====================
function initFormHandlers() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            // Here you would normally send data to server
            console.log('Login:', { email, password });

            // Show success message
            alert(currentLang === 'ar'
                ? 'تم تسجيل الدخول بنجاح!'
                : 'Login successful!');

            closeLoginModal();
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;

            // Validate passwords match
            if (password !== confirmPassword) {
                alert(currentLang === 'ar'
                    ? 'كلمات المرور غير متطابقة!'
                    : 'Passwords do not match!');
                return;
            }

            // Here you would normally send data to server
            console.log('Register:', { name, email, password });

            // Show success message
            alert(currentLang === 'ar'
                ? 'تم إنشاء الحساب بنجاح!'
                : 'Account created successfully!');

            closeLoginModal();
        });
    }
}

// ==================== ESCAPE KEY TO CLOSE MODALS ====================
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLoginModal();
        closeContactModal();
    }
});

// ==================== FLOATING ANIMATION (for dashboard icons) ====================
// This is handled by CSS animations, but you can add more complex JS animations here if needed

// ==================== NEWSLETTER FORM ====================
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        if (email) {
            alert(currentLang === 'ar'
                ? 'شكراً لاشتراكك في النشرة البريدية!'
                : 'Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
});

// ==================== SCROLL TO TOP (Optional) ====================
// You can add a scroll-to-top button here if needed
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== LAZY LOADING IMAGES (Optional Enhancement) ====================
// If you want to add lazy loading for better performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c👋 مرحباً بك في منصتي!', 'font-size: 20px; color: #1D4ED8; font-weight: bold;');
console.log('%cWelcome to Our Platform!', 'font-size: 20px; color: #1D4ED8; font-weight: bold;');
console.log('%cDeveloped with ❤️ for ThemeForest', 'font-size: 14px; color: #6b7280;');

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
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

// ==================== BROWSER COMPATIBILITY CHECKS ====================
// Check for modern browser features
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported. Some features may not work.');
}

if (!('CSS' in window && CSS.supports('backdrop-filter', 'blur(10px)'))) {
    console.warn('Backdrop filter not supported. Modal backgrounds may look different.');
}

// ==================== ANALYTICS (Ready for integration) ====================
// You can add Google Analytics, Facebook Pixel, or other tracking here
function trackEvent(category, action, label) {
    // Example: ga('send', 'event', category, action, label);
    console.log('Event tracked:', { category, action, label });
}

// Track button clicks
document.querySelectorAll('.btn-primary-custom').forEach(btn => {
    btn.addEventListener('click', function () {
        trackEvent('Button', 'Click', this.textContent.trim());
    });
});

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation for modals
document.querySelectorAll('.modal-container').forEach(modal => {
    modal.addEventListener('keydown', function (e) {
        // Trap focus within modal
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
});

// ==================== DYNAMIC YEAR IN FOOTER ====================
// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('.copyright').forEach(el => {
        const text = el.textContent;
        // Only update if it contains a year
        if (text.match(/\d{4}/)) {
            el.textContent = text.replace(/\d{4}/, currentYear);
        }
    });
});

// ==================== EXPORT FUNCTIONS (if using modules) ====================
// If you're using ES6 modules, you can export these functions
// export { toggleLanguage, openLoginModal, closeLoginModal, openContactModal, closeContactModal };

// ==================== THEME TOGGLE ====================
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';

    const html = document.documentElement;

    // Update HTML attributes
    html.setAttribute('data-theme', currentTheme);

    // Save theme to localStorage
    saveTheme();

    // Log theme change
    console.log('Theme switched to:', currentTheme);
}

function saveTheme() {
    localStorage.setItem('theme', currentTheme);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        const html = document.documentElement;
        html.setAttribute('data-theme', currentTheme);
    }
}

// ==================== TEAM SWIPER INITIALIZATION ====================
function initTeamSwiper() {
    new Swiper(".teamSwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });
}

// ==================== blog SWIPER INITIALIZATION ====================
function initBlogSwiper() {
    new Swiper(".blogSwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1.5,
                spaceBetween: 30,
                centeredSlides: false,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            },
        },
    });
}
// ==================== customer SWIPER INITIALIZATION ====================
function initCustomerSwiper() {
    new Swiper(".customerSwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1.5,
                spaceBetween: 30,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            },
        },
    });
}