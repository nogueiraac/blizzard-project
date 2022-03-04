var slideThumb = new Swiper(".slide-thumb", {
  slidesPerView: 5,
  direction: "vertical",
  spaceBetween: 20,
  watchSlidesProgress: true,
});

var slideHero = new Swiper(".main-slide", {
  effect: "fade",
  thumbs: {
    swiper: slideThumb,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});
