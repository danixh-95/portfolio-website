/**
 * Danish Arshad - Software Engineer Portfolio
 * Main JavaScript File — v2.0 (Gray Palette + Light/Dark Mode)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Theme Toggle ----
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  
  // Load saved preference or respect OS preference
  const savedTheme = localStorage.getItem('da-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else {
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('da-theme', next);
  });

  // ---- Preloader ----
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 500);
  });

  // ---- Custom Cursor ----
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursor-trail');
  
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursorTrail.style.left = `${clientX}px`;
      cursorTrail.style.top = `${clientY}px`;
    });
    
    const clickables = document.querySelectorAll('a, button, .project-card, .filter-btn');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursor.style.background = 'transparent';
        cursor.style.border = '1px solid var(--accent)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = 'var(--accent)';
        cursor.style.border = 'none';
      });
    });
  }

  // ---- Scroll Progress Bar ----
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = `${scrollPercent}%`;
  });

  // ---- Navbar & Mobile Menu ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !isExpanded);
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // ---- Active Nav Highlighting ----
  const sections = document.querySelectorAll('section');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${currentId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

  sections.forEach(sec => navObserver.observe(sec));

  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Skill Bar Animations ----
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = `${width}%`;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ---- Project Filtering ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        card.classList.remove('show');
        card.classList.add('hide');

        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.classList.remove('hide');
          void card.offsetWidth;
          card.classList.add('show');
        }
      });
    });
  });

  // ---- Set Current Year ----
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Counter Animation ----
  const statNumbers = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-count'), 10);
        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(ease * endValue);
          target.textContent = current + (endValue >= 10 ? '+' : '');
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            target.textContent = endValue + (endValue >= 10 ? '+' : '');
          }
        };

        requestAnimationFrame(updateCount);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0 });

  statNumbers.forEach(num => countObserver.observe(num));

  // ---- Background Video Visibility Handler ----
  const bgVideo = document.getElementById('bg-video');
  if (bgVideo) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        bgVideo.pause();
      } else {
        bgVideo.play().catch(err => console.log("Video play interrupted:", err));
      }
    });
  }

  // ---- Contact Form Handler ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Helper function to show a custom glassmorphic toast
    const showToast = (title, messageText, isError = false) => {
      const toast = document.createElement('div');
      toast.className = `glass-card form-toast ${isError ? 'toast-error' : ''}`;
      toast.innerHTML = `
        <div class="toast-icon">${isError ? '⚠️' : '✨'}</div>
        <div class="toast-content">
          <h4>${title}</h4>
          <p>${messageText}</p>
        </div>
      `;
      
      // Append toast styling dynamically
      if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
          .form-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px 24px;
            max-width: 380px;
            border-left: 4px solid var(--accent) !important;
            animation: toast-slide-in 0.5s var(--ease-spring) forwards;
            background: var(--nav-scrolled-bg);
          }
          .form-toast.toast-error {
            border-left-color: #ff5f56 !important;
          }
          .toast-icon {
            font-size: 24px;
          }
          .toast-content h4 {
            font-size: 15px;
            font-weight: 600;
            color: var(--text-1);
            margin-bottom: 2px;
          }
          .toast-content p {
            font-size: 13px;
            color: var(--text-2);
            line-height: 1.4;
            margin: 0;
          }
          @keyframes toast-slide-in {
            from { transform: translateX(120%) translateY(0); opacity: 0; }
            to { transform: translateX(0) translateY(0); opacity: 1; }
          }
          @keyframes toast-fade-out {
            from { transform: translateX(0) scale(1); opacity: 1; }
            to { transform: translateX(40px) scale(0.9); opacity: 0; }
          }
          @media (max-width: 480px) {
            .form-toast {
              bottom: 20px;
              right: 20px;
              left: 20px;
              max-width: calc(100% - 40px);
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(toast);
      
      // Remove toast after 5 seconds
      setTimeout(() => {
        toast.style.animation = 'toast-fade-out 0.4s var(--ease-expo) forwards';
        setTimeout(() => {
          toast.remove();
        }, 400);
      }, 5000);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      if (!name || !email || !message) return;
      
      // Disable form submit button during loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitBtnText = submitBtn.querySelector('span');
      const originalText = submitBtnText.textContent;
      submitBtn.disabled = true;
      submitBtnText.textContent = "Sending...";
      
      // Send message via FormSubmit.co AJAX
      fetch("https://formsubmit.co/ajax/danishofficial950@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        return response.json();
      })
      .then(data => {
        // Success
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
        showToast("Message Sent!", `Thank you, ${name}. Your message has been sent successfully.`);
        contactForm.reset();
      })
      .catch(error => {
        // Error
        submitBtn.disabled = false;
        submitBtnText.textContent = originalText;
        console.error('Error:', error);
        showToast("Error!", "Something went wrong. Please try again.", true);
      });
    });
  }

  // ---- Portfolio Tab Switcher ----
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const portfolioPanes = document.querySelectorAll('.portfolio-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.getAttribute('data-tab');
      
      // Deactivate all buttons & panes
      tabButtons.forEach(b => b.classList.remove('active'));
      portfolioPanes.forEach(pane => pane.classList.remove('active'));
      
      // Activate target button & pane
      btn.classList.add('active');
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add('active');
        
        // Immediately reveal animation elements inside active pane
        const reveals = targetPane.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        reveals.forEach(el => el.classList.add('visible'));
      }
    });
  });

  // ---- Back to Top ----
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

