(function () {
  const locomotiveScroll = new LocomotiveScroll();
})();

document.addEventListener("DOMContentLoaded", () => {
  initMarquee("#marquee", 1);
  initMarquee("#marquee2", -1);
  initSwiper();
  initCustomSwiper();
  initGalleryFilter();

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

function initGalleryFilter() {
  const filterContainer = document.querySelector(".filters");
  const gallery = document.querySelector(".gallery-grid");

  if (!filterContainer || !gallery) return;

  const buttons = filterContainer.querySelectorAll("button");
  const items = gallery.querySelectorAll("figure");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterContainer
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      items.forEach((item) => {
        const categories = item.getAttribute("data-category")?.split(" ") || [];

        if (filter === "all" || categories.includes(filter)) {
          item.style.visibility = "visible";
          item.style.height = "auto";
        } else {
          item.style.visibility = "hidden";
          item.style.height = "0";
        }

        const caption = item.nextElementSibling;
        if (caption && caption.tagName === "P") {
          if (filter === "all" || categories.includes(filter)) {
            caption.style.visibility = "visible";
            caption.style.height = "auto";
          } else {
            caption.style.visibility = "hidden";
            caption.style.height = "0";
          }
        }
      });
    });
  });
}
