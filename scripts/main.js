        document.addEventListener('DOMContentLoaded', function () {
            // Mobile menu toggle
            const hamburger = document.querySelector('.hamburger-menu');
            const nav = document.querySelector('nav');
            if (hamburger && nav) {
                hamburger.addEventListener('click', function () {
                    nav.classList.toggle('active');
                    hamburger.classList.toggle('active');
                });
            }

            // Header scroll effect
            const header = document.querySelector('header');
            if (header) {
                window.addEventListener('scroll', function () {
                    if (window.scrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            }
/* 
JS required for submenu toggle on mobile:*/
document.querySelectorAll('.has-submenu > a').forEach(function(parentLink) {
    parentLink.addEventListener('click', function(e) {
        if(window.innerWidth <= 1024) {
            e.preventDefault();
            var parent = parentLink.parentElement;
            parent.classList.toggle('open');
            // Optionally close other open submenus:
            document.querySelectorAll('.has-submenu').forEach(function(item) {
                if(item !== parent) item.classList.remove('open');
            });
        }
    });
});

            // Enquiry Panel Slide Effect
            const enquiryButton = document.getElementById('enquiry-button');
            const enquiryPanel = document.getElementById('enquiry-panel');
            const closePanelBtn = document.getElementById('close-panel');

            if (enquiryPanel) {
                enquiryPanel.style.right = '-100vw';
                enquiryPanel.style.transition = 'right 0.4s cubic-bezier(0.4,0,0.2,1)';
            }

            if (enquiryButton && enquiryPanel) {
                enquiryButton.addEventListener('click', () => {
                    if (enquiryPanel.style.right === '0px' || enquiryPanel.style.right === '0') {
                        enquiryPanel.style.right = '-100vw';
                    } else {
                        enquiryPanel.style.right = '0';
                    }
                });
            }

            if (closePanelBtn && enquiryPanel) {
                closePanelBtn.addEventListener('click', () => {
                    enquiryPanel.style.right = '-100vw';
                });
            }
        });
