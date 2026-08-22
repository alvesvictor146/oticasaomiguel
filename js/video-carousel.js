document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.videoSwiper', {
    loop: true,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: false,
    },
    speed: 1200,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 30
      }
    }
  });

  // Initialize Premium Brands Swiper
  const premiumSwiper = new Swiper('.premiumSwiper', {
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1500,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.premium-pagination',
      clickable: true,
    },
    loop: true,
  });
});
