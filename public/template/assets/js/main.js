/**
 * Pertama Web - Vanilla JavaScript Controller
 * Replaces WordPress & Elementor bloated runtime with lightweight native JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lazyload Backgrounds
  const lazyloadBackgrounds = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
  if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('e-lazyloaded');
          bgObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px 200px 0px' });

    lazyloadBackgrounds.forEach((bg) => bgObserver.observe(bg));
  } else {
    lazyloadBackgrounds.forEach((bg) => bg.classList.add('e-lazyloaded'));
  }

  // 2. Mobile Menu Toggle
  const menuToggles = document.querySelectorAll('.elementor-menu-toggle');
  menuToggles.forEach((toggle) => {
    const navContainer = toggle.parentElement.querySelector('.elementor-nav-menu--dropdown');
    
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isActive = toggle.classList.toggle('elementor-active');
      toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      
      if (navContainer) {
        navContainer.classList.toggle('elementor-active', isActive);
        navContainer.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        if (isActive) {
          navContainer.style.maxHeight = (navContainer.scrollHeight + 50) + 'px';
          navContainer.style.transform = 'scaleY(1)';
        } else {
          navContainer.style.maxHeight = '0px';
          navContainer.style.transform = 'scaleY(0)';
        }
      }
    });

    // Close menu when clicking navigation links
    if (navContainer) {
      const links = navContainer.querySelectorAll('a');
      links.forEach((link) => {
        link.addEventListener('click', () => {
          toggle.classList.remove('elementor-active');
          toggle.setAttribute('aria-expanded', 'false');
          navContainer.classList.remove('elementor-active');
          navContainer.setAttribute('aria-hidden', 'true');
          navContainer.style.maxHeight = '0px';
          navContainer.style.transform = 'scaleY(0)';
        });
      });
    }
  });


  // 3. ElementsKit Accordion FAQ (Default closed, toggle smoothly on click)
  const accordionCards = document.querySelectorAll('.ekit-wid-con .elementskit-card');
  
  // Set all items closed initially
  accordionCards.forEach((card) => {
    card.classList.remove('active');
    const btn = card.querySelector('.ekit-accordion--toggler');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.add('collapsed');
    }
    const col = card.querySelector('.collapse');
    if (col) {
      col.classList.remove('show', 'in');
      col.style.display = 'none';
    }
  });

  // Attach click handler to each card header / toggler
  accordionCards.forEach((card) => {
    const toggler = card.querySelector('.ekit-accordion--toggler') || card.querySelector('.elementskit-card-header');
    if (!toggler) return;

    toggler.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = card.querySelector('.ekit-accordion--toggler');
      const collapse = card.querySelector('.collapse');
      if (!btn || !collapse) return;

      const isCurrentlyOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close other cards within the same accordion container
      const accordion = card.closest('.elementskit-accordion');
      if (accordion) {
        accordion.querySelectorAll('.elementskit-card').forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove('active');
            const otherBtn = otherCard.querySelector('.ekit-accordion--toggler');
            if (otherBtn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherBtn.classList.add('collapsed');
            }
            const otherCol = otherCard.querySelector('.collapse');
            if (otherCol) {
              otherCol.classList.remove('show', 'in');
              otherCol.style.display = 'none';
            }
          }
        });
      }

      // Toggle current card
      if (isCurrentlyOpen) {
        card.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.add('collapsed');
        collapse.classList.remove('show', 'in');
        collapse.style.display = 'none';
      } else {
        card.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.remove('collapsed');
        collapse.classList.add('show', 'in');
        collapse.style.display = 'block';
      }
    });
  });

  // 4. Number Counters Animation
  const counters = document.querySelectorAll('.elementor-counter-number');
  if (counters.length > 0) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-to-value'), 10) || 0;
      const duration = parseInt(el.getAttribute('data-duration'), 10) || 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = Math.floor(ease * target);
        el.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      counters.forEach((c) => counterObserver.observe(c));
    } else {
      counters.forEach((c) => animateCounter(c));
    }
  }

  // 5. Client Logo Carousel (Swiper)
  if (typeof Swiper !== 'undefined') {
    const carouselEl = document.querySelector('.elementor-image-carousel-wrapper.swiper');
    if (carouselEl) {
      new Swiper(carouselEl, {
        slidesPerView: 2.5,
        spaceBetween: 16,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        speed: 600,
        breakpoints: {
          480: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30
          }
        }
      });
    }
  }

  // 6. Video Player Overlay
  const videoWidget = document.querySelector('.elementor-widget-video');
  if (videoWidget) {
    const playBtn = videoWidget.querySelector('.elementor-custom-embed-play');
    const overlay = videoWidget.querySelector('.elementor-custom-embed-image-overlay');
    const videoContainer = videoWidget.querySelector('.elementor-video');

    if (playBtn && overlay && videoContainer) {
      playBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        videoContainer.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/XoZbnZkzpyo?autoplay=1&controls=1&rel=0" 
            title="Video Player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            style="width: 100%; aspect-ratio: 16/9; border-radius: 12px; border: 0;">
          </iframe>
        `;
      });
    }
  }

  // 7. Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const targetId = href.substring(hashIndex + 1);
      if (!targetId || targetId.toLowerCase().startsWith('collapse')) return; // Handled by accordion

      const targetEl = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
