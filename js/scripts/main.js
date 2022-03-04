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

const allFilters = document.querySelectorAll(".js-nav-games li a");
const tabPane = document.querySelectorAll(".tab-pane-games");

allFilters.forEach((filter, index) => {
  filter.addEventListener("click", (event) => {
    event.preventDefault();

    allFilters.forEach((item) => {
      item.classList.remove("active");
    });

    tabPane.forEach((tab) => {
      tab.classList.remove("active");
    });

    tabPane[index].classList.add("active");
    filter.classList.add("active");
  });
});
