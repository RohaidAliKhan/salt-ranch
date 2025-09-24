(function () {
  const locomotiveScroll = new LocomotiveScroll();
})();

document.addEventListener("DOMContentLoaded", () => {
  initMarquee("#marquee", 1);
  initMarquee("#marquee2", -1);
  initSwiper();
  initCustomSwiper();

  const altElements = document.querySelectorAll([
    ".heading-style-h1",
    "h1",
    ".heading-style-h2",
    "h2",
    ".navbar ul li a",
  ]);

  altElements.forEach((el) => {
    el.innerHTML = el.textContent.replace(
      /([CGJSQ123569])/gi,
      '<span class="alt-font">$1</span>'
    );
  });
});

function initMarquee(selector, speed = 1) {
  const marquee = document.querySelector(selector);
  if (!marquee) return;

  const inner = marquee.querySelector(".marquee-inner");
  if (!inner) return;

  inner.innerHTML += inner.innerHTML;

  let position = 0;
  const halfWidth = inner.scrollWidth / 2;

  function animate() {
    position -= speed;

    if (speed > 0 && position <= -halfWidth) {
      position = 0;
    } else if (speed < 0 && position >= 0) {
      position = -halfWidth;
    }

    inner.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

function initSwiper() {
  document.querySelectorAll(".mySwiper").forEach(function (swiperEl) {
    let slidesCount = swiperEl.classList.contains("swiper-three") ? 3 : 5;

    new Swiper(swiperEl, {
      slidesPerView: slidesCount,
      centeredSlides: true,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
      breakpoints: {
        0: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: swiperEl.classList.contains("swiper-three") ? 3 : 3.5,
        },
        1024: {
          slidesPerView: slidesCount,
        },
      },
    });
  });
}

function initCustomSwiper() {
  new Swiper(".custom-swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });
}
