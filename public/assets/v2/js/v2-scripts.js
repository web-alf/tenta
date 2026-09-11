/**
 * V2 Scripts for Orangetrail Homepage in Astro
 * Handles Hero Videos, Swiper Sliders, Reviews Video Cards, and Book-a-call Modals
 */
(function() {
  function initV2() {
    // 1. Hero Video Handling
    const firstVideo = document.getElementById('hero-video');
    const homeHero = document.querySelector('.home-hero');
    const secondVideo = document.getElementById('hero-video-loop');
    const homeHeroImage = document.querySelector('.home-hero__image');

    if (firstVideo && secondVideo) {
      secondVideo.pause();
      firstVideo.controls = false;
      const playPromise = firstVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(function() {
          firstVideo.addEventListener('ended', function() {
            firstVideo.style.display = 'none';
            secondVideo.play();
          });
        }).catch(function(error) {
          console.warn('Hero video autoplay prevented or failed:', error);
          firstVideo.style.display = 'none';
          secondVideo.style.display = 'none';
          if (homeHero) homeHero.style.background = 'none';
          if (homeHeroImage) homeHeroImage.style.zIndex = '1';
        });
      }
    }

    // 2. Hero Title Word Span Splitting
    const titleHeroElement = document.querySelector('.home-hero__title');
    if (titleHeroElement) {
      const paragraphs = titleHeroElement.querySelectorAll('p');
      paragraphs.forEach(paragraph => {
        const words = paragraph.textContent.trim().split(/\s+/).map(word => `<span class="hero-title_item">${word}</span>`).join(' ');
        paragraph.outerHTML = words + '<br>';
      });
      titleHeroElement.style.opacity = '1';
    }

    // 3. Swipers Initialization (requires Swiper library loaded)
    if (typeof Swiper !== 'undefined') {
      // Partnered Sliders
      const slidersPartnered = document.querySelectorAll('.swiper-partnered');
      if (slidersPartnered && slidersPartnered.length) {
        slidersPartnered.forEach((slider, idx) => {
          const numberSlides = slider.querySelectorAll('.swiper-slide').length;
          const loopAdditionalSlides = (numberSlides > 7) ? numberSlides : numberSlides * 4;

          new Swiper(slider, {
            direction: 'horizontal',
            slidesPerView: 'auto',
            loopAdditionalSlides: loopAdditionalSlides,
            centeredSlides: true,
            loop: true,
            speed: 7000,
            allowTouchMove: false,
            autoplay: {
              delay: 1,
              reverseDirection: (idx === 1),
            },
          });
        });
      }

      // Icons Vertical Slider
      const iconsSlider = document.getElementById('swiper-icons-slider');
      if (iconsSlider) {
        const loopAdditionalSlides = iconsSlider.querySelectorAll('.swiper-slide').length;
        new Swiper(iconsSlider, {
          direction: 'vertical',
          slidesPerView: 'auto',
          loopAdditionalSlides: loopAdditionalSlides,
          loop: true,
          speed: 7000,
          allowTouchMove: false,
          autoplay: {
            delay: 1,
            loopAdditionalSlides
          },
        });
      }

      // Reviews People Slider
      const sliderReviews = document.getElementById('swiper-reviews-people');
      if (sliderReviews) {
        new Swiper(sliderReviews, {
          direction: 'horizontal',
          slidesPerView: window.innerWidth > 1024 ? 3 : window.innerWidth > 767 ? 2 : 1,
          loop: false,
          spaceBetween: 20,
          autoHeight: true,
          navigation: {
            nextEl: '.reviews-swiper-button-next',
            prevEl: '.reviews-swiper-button-prev',
          },
        });
        sliderReviews.style.opacity = '1';
      }
    }

    // 4. Custom Video Card Buttons in Reviews
    const arrCardVideo = document.querySelectorAll('.home-reviews__card-video');
    if (arrCardVideo && arrCardVideo.length) {
      arrCardVideo.forEach((card) => {
        const video = card.querySelector('.video-card');
        const button = card.querySelector('.custom-video-button');
        if (!video || !button) return;
        const buttonPause = button.querySelector('.custom-video-button__pause');
        const buttonPlay = button.querySelector('.custom-video-button__play');

        if (buttonPlay) {
          buttonPlay.addEventListener('click', () => {
            video.play();
            if (buttonPause) buttonPause.style.display = 'block';
            buttonPlay.style.display = 'none';
            if (video.requestFullscreen) {
              video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
              video.webkitRequestFullscreen();
            }
            video.style.objectFit = 'contain';
          });
        }

        if (buttonPause) {
          buttonPause.addEventListener('click', () => {
            video.pause();
            if (buttonPlay) buttonPlay.style.display = 'block';
            buttonPause.style.display = 'none';
            video.controls = false;
            video.removeAttribute('controls');
            video.style.objectFit = 'cover';
          });
        }
      });
    }

    // 5. Vanilla Book a Call Modal Handler
    const bookCallModal = document.getElementById('book-call-modal');

    function showBookCallChoices(widget) {
      if (!widget) return;
      widget.querySelectorAll('[data-book-call-view="panel"]').forEach(p => p.hidden = true);
      const choices = widget.querySelector('[data-book-call-view="choices"]');
      if (choices) choices.hidden = false;
    }

    function showBookCallPanel(widget, target) {
      if (!widget) return;
      const choices = widget.querySelector('[data-book-call-view="choices"]');
      if (choices) choices.hidden = true;
      widget.querySelectorAll('[data-book-call-view="panel"]').forEach(p => p.hidden = true);
      const panel = widget.querySelector(`[data-book-call-panel="${target}"]`);
      if (panel) panel.hidden = false;
    }

    function openModal(modal) {
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('book-call-modal-open');
    }

    function closeModal() {
      if (bookCallModal) {
        bookCallModal.classList.remove('is-open');
        bookCallModal.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.remove('book-call-modal-open');
      if (bookCallModal) {
        const w = bookCallModal.querySelector('.book-call-widget');
        if (w) showBookCallChoices(w);
      }
    }

    // Delegated click listeners
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('a[href="#price-quote"], a[href$="#price-quote"], .book-call-btn a, .js-book-call-trigger, .js-book-call-chooser-trigger, [data-book-call-trigger]');
      if (trigger) {
        e.preventDefault();
        if (bookCallModal) {
          const w = bookCallModal.querySelector('.book-call-widget');
          if (w) showBookCallChoices(w);
          openModal(bookCallModal);
        } else {
          const targetEl = document.getElementById('price-quote') || document.getElementById('home-meetings-iframe');
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (e.target.closest('[data-book-call-close]')) {
        closeModal();
        return;
      }

      const targetBtn = e.target.closest('[data-book-call-target]');
      if (targetBtn) {
        const widget = targetBtn.closest('.book-call-widget');
        if (widget) {
          showBookCallPanel(widget, targetBtn.dataset.bookCallTarget);
        }
        return;
      }

      const backBtn = e.target.closest('[data-book-call-back]');
      if (backBtn) {
        const widget = backBtn.closest('.book-call-widget');
        if (widget) {
          showBookCallChoices(widget);
        }
        return;
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initV2);
  } else {
    initV2();
  }
})();
