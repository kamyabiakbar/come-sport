document.addEventListener('DOMContentLoaded', function() {
    // عناصر منو
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // فعال‌سازی منوی همبرگری
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
        });
    }
    
    // مدیریت منوهای آبشاری
    if (navItems.length > 0) {
        navItems.forEach(item => {
            // فقط برای آیتم‌های دارای منوی آبشاری
            if (item.classList.contains('has-dropdown')) {
                // برای دسکتاپ (هاور)
                item.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 992) {
                        item.classList.add('dropdown-active');
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 992) {
                        item.classList.remove('dropdown-active');
                    }
                });
                
                // برای موبایل (کلیک)
                const navLink = item.querySelector('.nav-link');
                if (navLink) {
                    navLink.addEventListener('click', (e) => {
                        if (window.innerWidth <= 992) {
                            e.preventDefault();
                            item.classList.toggle('dropdown-active');
                            
                            // بستن سایر منوهای باز
                            navItems.forEach(otherItem => {
                                if (otherItem !== item && otherItem.classList.contains('has-dropdown')) {
                                    otherItem.classList.remove('dropdown-active');
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    
    // بستن منوها هنگام کلیک خارج از آنها
    document.addEventListener('click', (e) => {
        // برای دسکتاپ
        if (window.innerWidth > 992) {
            const isNavItem = e.target.closest('.nav-item');
            if (!isNavItem) {
                navItems.forEach(item => {
                    item.classList.remove('dropdown-active');
                });
            }
        }
        
        // برای موبایل
        if (window.innerWidth <= 992) {
            const isMenuClick = e.target.closest('.nav-menu') || e.target.closest('.hamburger');
            if (!isMenuClick && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // بستن همه منوهای آبشاری
                navItems.forEach(item => {
                    item.classList.remove('dropdown-active');
                });
            }
        }
    });
    
    // بستن منو هنگام کلیک روی لینک‌های اصلی
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // اگر لینک اصلی باشد (بدون زیرمنو)
            if (!this.classList.contains('has-dropdown') && window.innerWidth <= 992) {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
});