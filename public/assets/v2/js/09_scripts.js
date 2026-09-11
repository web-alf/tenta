document.addEventListener('DOMContentLoaded', function() {
    const firstVideo = document.getElementById('hero-video');
    const homeHero = document.querySelector('.home-hero');
    const secondVideo = document.getElementById('hero-video-loop');
    const slidersPartnered = document.querySelectorAll('.swiper-partnered');
    const iconsSlider = document.getElementById('swiper-icons-slider');
    const arrCardVideo = document.querySelectorAll('.home-reviews__card-video');
    const homeHeroImage = document.querySelector('.home-hero__image');
    const titleHeroElement = document.querySelector('.home-hero__title');
	const sliderReviews = document.getElementById('swiper-reviews-people');
	
	if(sliderReviews) {
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

    //for video in hero section
    if(firstVideo && secondVideo) {
        secondVideo.pause();
        firstVideo.controls = false;
        firstVideo.play().then(function() {
            firstVideo.addEventListener('ended', function () {
                firstVideo.style.display = "none";
                secondVideo.play()
            });
        }).catch(function(error) {
            console.log('error', error)
            firstVideo.style.display = "none";
            secondVideo.style.display = "none";
            homeHero.style.background = "none";
            homeHeroImage.style.zIndex = "1";
        });
    }
    //
    // for title hero
    if (titleHeroElement) {
        const paragraphs = titleHeroElement.querySelectorAll('p');
        paragraphs.forEach(paragraph => {
            const words = paragraph.textContent.trim().split(/\s+/).map(word => `<span class="hero-title_item">${word}</span>`).join(' ');
            paragraph.outerHTML = words + '<br>';
        });
        titleHeroElement.style.opacity = "1";
    }
    //
    //for sliders partnered
    if(slidersPartnered) {
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
                    reverseDirection: (idx === 1 ) ? false : true,
                },
            });
        });
    }
    //
    //for icons slider
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
    //
    //for custom video button
    if (arrCardVideo) {
        arrCardVideo.forEach((card) => {
            const video = card.querySelector('.video-card');
            const button = card.querySelector('.custom-video-button');
            const buttonPause = button.querySelector('.custom-video-button__pause');
            const buttonPlay = button.querySelector('.custom-video-button__play');

            buttonPlay.addEventListener('click', () => {
                video.play();
                buttonPause.style.display = "block";
                buttonPlay.style.display = "none";
                function openFullscreen(elem) {
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.mozRequestFullScreen) { /* Firefox */
                        elem.mozRequestFullScreen();
                    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                        elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE/Edge */
                        elem.msRequestFullscreen();
                    }
                }
                openFullscreen(video);
                video.style.objectFit = "contain";

            });

            buttonPause.addEventListener('click', () => {
                video.pause();
                buttonPlay.style.display = "block";
                buttonPause.style.display = "none";
                video.controls = false;
                video.removeAttribute('controls');
                video.style.objectFit = "cover";
            });

        })
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".major-platforms.swiper-mode");
    if (section) {
        const swiper = new Swiper(".major-platforms .swiper-container", {
            loop: true,
            spaceBetween: 24,
            slidesPerView: 3,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                enabled: true
            },
            breakpoints: {
                1025: {
                    slidesPerView: 3
                },
                768: {
                    slidesPerView: 2
                },
                0: {
                    centeredSlides: false,
                    slidesPerView: 1.1,
                    spaceBetween: 16
                }
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            on: {
                init: function () {
                    setEqualHeight(".major-platforms .swiper-slide");
                },
                resize: function () {
                    setEqualHeight(".major-platforms .swiper-slide");
                }
            }
        });
        function setEqualHeight(selector) {
            const slides = document.querySelectorAll(selector);
            let maxHeight = 0;
            slides.forEach(slide => slide.style.height = "auto");
            slides.forEach(slide => {
                if (slide.offsetHeight > maxHeight) {
                    maxHeight = slide.offsetHeight;
                }
            });
            slides.forEach(slide => slide.style.height = maxHeight + "px");
        }
    }
    
    const trustedSliderEl = document.querySelector(".trusted-leaders-slider");

if (trustedSliderEl) {
    const trustedSliderEl = document.querySelector(".trusted-leaders-slider");

    function pauseAllVideos(swiper) {
        swiper.slides.forEach(slide => {
            const video = slide.querySelector("video");
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    }

    if (trustedSliderEl) {
        const trustedSwiper = new Swiper(trustedSliderEl, {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
                nextEl: ".trusted-leaders-slider .swiper-button-next",
                prevEl: ".trusted-leaders-slider .swiper-button-prev",
            },
            pagination: {
                el: ".trusted-leaders-slider .swiper-pagination",
                clickable: true,
            },
            on: {
                init(swiper) {
                    setEqualHeight(".trusted-leader-item");
                    pauseAllVideos(swiper);
                },
                slideChangeTransitionStart(swiper) {
                    setEqualHeight(".trusted-leader-item");
                    pauseAllVideos(swiper);
                },
            },
        });
    }


    // Recalculate on resize 
    window.addEventListener("resize", () => {
        setEqualHeight(".trusted-leader-item");
    });

    // Recalculate when videos load
    const videos = trustedSliderEl.querySelectorAll("video");
    videos.forEach(video => {
        video.addEventListener("loadedmetadata", () => {
            setEqualHeight(".trusted-leader-item");
        });
    });
}
});

