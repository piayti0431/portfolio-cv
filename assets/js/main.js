// Restore scroll position after language switch
try {
    var _pllScroll = sessionStorage.getItem('pll_scroll');
    if (_pllScroll) {
        sessionStorage.removeItem('pll_scroll');
        window.scrollTo(0, parseInt(_pllScroll, 10) || 0);
    }
} catch (e) {}

document.addEventListener('DOMContentLoaded', function () {

    // ===== LANGUAGE SWITCHER: preserve scroll position =====
    document.querySelectorAll('.lang-nav-btn').forEach(function (btn) {
        if (!btn.classList.contains('active')) {
            btn.addEventListener('click', function () {
                try { sessionStorage.setItem('pll_scroll', String(Math.round(window.scrollY))); } catch (e) {}
            });
        }
    });

    // ===== NAVBAR: scroll effect & mobile toggle =====
    var header    = document.getElementById('site-header');
    var navToggle = document.getElementById('navToggle');
    var navMenu   = document.getElementById('navMenu');

    window.addEventListener('scroll', function () {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            var open = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open);
        });
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== WORD ROLL =====
    var wordRollEl = document.getElementById('wordRoll');
    var rollTexts  = (typeof portfolioStrings !== 'undefined' && portfolioStrings.wordRoll)
        ? portfolioStrings.wordRoll
        : ['Junior SEO', 'SEO Executive', 'On-page SEO', 'Page Speed SEO'];
    var rollIdx   = 0;
    var rollTimer;

    function updateRoll() {
        if (!wordRollEl) return;
        var items  = wordRollEl.querySelectorAll('.wr-item');
        var center = Math.floor(items.length / 2);
        items.forEach(function (item, pos) {
            var offset = pos - center;
            var tIdx   = ((rollIdx + offset) % rollTexts.length + rollTexts.length) % rollTexts.length;
            item.textContent = rollTexts[tIdx];
            item.className   = 'wr-item' + (offset === 0 ? ' wr-active' : Math.abs(offset) === 1 ? ' wr-near' : '');
        });
    }

    function startWordRoll() {
        rollIdx = 0;
        clearInterval(rollTimer);
        updateRoll();
        rollTimer = setInterval(function () {
            rollIdx = (rollIdx + 1) % rollTexts.length;
            updateRoll();
        }, 2500);
    }

    startWordRoll();

    function getSamePageHash(link) {
        try {
            var url = new URL(link.getAttribute('href'), window.location.href);
            var currentPath = window.location.pathname.replace(/\/$/, '');
            var targetPath = url.pathname.replace(/\/$/, '');
            return url.origin === window.location.origin && currentPath === targetPath ? url.hash : '';
        } catch (e) {
            return '';
        }
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var hash = getSamePageHash(this);
            var target = hash ? document.querySelector(hash) : null;
            if (target) {
                e.preventDefault();
                var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    // ===== ACTIVE NAV LINK on scroll =====
    var sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (sec) {
            var link = Array.prototype.find.call(document.querySelectorAll('.nav-link'), function (navLink) {
                return getSamePageHash(navLink) === '#' + sec.id;
            });
            if (link) {
                var active = scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight;
                if (active) {
                    document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    });

    // ===== FADE-UP ANIMATION =====
    var fadeTargets = document.querySelectorAll('.section-header, .about-grid, .timeline-section, .skills-layout, .projects-grid, .contact-grid, .project-card, .timeline-item');
    fadeTargets.forEach(function (el) { el.classList.add('fade-up'); });

    new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 }).observe
        ? (function () {
            var obs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('visible'); });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-up').forEach(function (el) { obs.observe(el); });
        })()
        : fadeTargets.forEach(function (el) { el.classList.add('visible'); });

    // ===== 3D THEME TOGGLE =====
    var themeToggle = document.getElementById('themeToggle');
    if (localStorage.getItem('portfolio-theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle && themeToggle.classList.add('is-light');
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            var isLight = document.body.classList.toggle('light-mode');
            themeToggle.classList.toggle('is-light', isLight);
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        });
    }

    // ===== CONTACT FORM =====
    var form        = document.getElementById('contactForm');
    var successMsg  = document.getElementById('formSuccess');
    var strSending  = (typeof portfolioStrings !== 'undefined' && portfolioStrings.formSending) ? portfolioStrings.formSending : 'Đang gửi...';
    var strSubmit   = (typeof portfolioStrings !== 'undefined' && portfolioStrings.formSubmit)  ? portfolioStrings.formSubmit  : 'Gửi tin nhắn';
    var contactEmail = (typeof portfolioStrings !== 'undefined' && portfolioStrings.contactEmail)
        ? portfolioStrings.contactEmail
        : 'tinhnghich17@gmail.com';
    var strError = (typeof portfolioStrings !== 'undefined' && portfolioStrings.formError)
        ? portfolioStrings.formError
        : 'Chua gui duoc yeu cau. Vui long thu lai.';
    var useServerSubmit = false;

    if (form && !useServerSubmit) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            var btn = form.querySelector('button[type="submit"]');
            var originalHtml = btn.innerHTML;
            var name = (form.querySelector('[name="name"]') || {}).value || '';
            var email = (form.querySelector('[name="email"]') || {}).value || '';
            var subject = (form.querySelector('[name="subject"]') || {}).value || 'SEO consultation request';
            var message = (form.querySelector('[name="message"]') || {}).value || '';
            var body = [
                'Họ tên: ' + name,
                'Email: ' + email,
                '',
                message
            ].join('\n');

            btn.textContent = strSending;
            btn.disabled    = true;
            setTimeout(function () {
                window.location.href = 'mailto:' + String(form.getAttribute('data-recipient') || contactEmail).trim() +
                    '?subject=' + encodeURIComponent(subject) +
                    '&body=' + encodeURIComponent(body);
                btn.innerHTML = originalHtml || strSubmit;
                btn.disabled = false;
                if (successMsg) {
                    if (typeof portfolioStrings !== 'undefined' && portfolioStrings.formSuccess) {
                        successMsg.textContent = portfolioStrings.formSuccess;
                    }
                    successMsg.style.display = 'block';
                    setTimeout(function () { successMsg.style.display = 'none'; }, 7000);
                }
            }, 300);
        });
    }
});
