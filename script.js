document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareBtn');
    const themeBtn = document.getElementById('themeBtn');
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');

    const setTheme = (theme) => {
        const root = document.documentElement;
        if (theme === 'light') {
            root.classList.add('light-theme');
            themeBtn.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.remove('light-theme');
            themeBtn.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        }
    };

    const activeTheme = localStorage.getItem('theme') || 'dark';
    setTheme(activeTheme);

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        setTheme(current === 'light' ? 'dark' : 'light');
    });

    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'SHREYA MOTOR DRIVING TRAINING SCHOOL',
            text: 'I found SHREYA MOTOR Driving School in Kalaburagi—highly recommended!',
            url: window.location.href
        };
        if (navigator.share) {
            try { await navigator.share(shareData); }
            catch (err) { console.warn('Share canceled', err); }
        } else {
            window.prompt('Copy this link to share:', shareData.url);
        }
    });

    mobileToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        mobileToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close mobile menu on viewport expand, keep it hidden on desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('open')) {
            nav.classList.remove('open');
            mobileToggle.setAttribute('aria-label', 'Open menu');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            if (nav.classList.contains('open')) nav.classList.remove('open');
        });
    });
});