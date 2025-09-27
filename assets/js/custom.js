let scroll;
const isHome = document.querySelector("section.is-home");
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initLoaderHome();
  pageTransitionOut();
  wrapAltFont();
  initNavigation();
  initMarquee("#marquee1", 1);
  initMarquee("#marquee2", -1);
  animateIllustration();
  initSwiper();
  initCustomSwiper();
  initMutliFilterSetupMultiMatch();
  initServiceSlider();
  initMagneticEffect();
});

function wrapAltFont() {
  const altElements = document.querySelectorAll([".heading-style-h1", "h1", ".heading-style-h2", "h2", ".nav-link__label"].join(", "));

  altElements.forEach((el) => {
    el.innerHTML = el.textContent.replace(/([CGJSQ123569])/gi, '<span class="alt-font">$1</span>');
  });
}

function initSmoothScroll() {
  scroll = new LocomotiveScroll();
}

function initLoaderHome() {
  let winWidth = window.innerWidth;

  let offset = 10;
  if (winWidth < 1024) {
    offset = 15;
  }
  if (winWidth < 720) {
    offset = 20;
  }
  if (winWidth < 540) {
    offset = 25;
  }

  let offsetTop = "45%";
  if (winWidth < 1024) {
    offsetTop = "60%";
  }

  let offsetPositive = 50 - offset + "%";
  let offsetNegative = 50 + offset + "%";

  if (!isHome) return;

  let tl = gsap.timeline();

  tl.set("html", { cursor: "wait" }, 0);
  tl.set("html", { cursor: "auto" }, 0);
  tl.set("body .nav", { autoAlpha: 0 }, 0);
  tl.set("section:not(.section-hero)", { rotate: 0.001, opacity: 0, y: "1em", filter: "blur(0.25em)", scale: 0.975 }, 0);
  tl.set(".section-hero.is-home", { autoAlpha: 1 }, 0.8);
  tl.set(".section-hero .hero-wrapper figure", { scale: 1, rotate: 0.001 }, 0);
  tl.set(".loading-container .loading-screen", { backgroundColor: "transparent" }, 0);
  tl.set(
    ".section-hero.is-home",
    {
      clipPath: `polygon(${offsetPositive} ${offsetTop}, ${offsetNegative} ${offsetTop}, ${offsetNegative} 100%, ${offsetPositive} 100%)`,
    },
    0
  );
  tl.set(".loading-logo svg", { yPercent: 0, rotate: 0.001 }, 0);

  tl.from(
    ".section-hero.is-home",
    {
      yPercent: 50,
      rotate: 0.001,
      duration: 2,
      ease: "Expo.easeInOut",
    },
    0
  );

  tl.to(
    ".loading-logo",
    {
      top: "35%",
      rotate: 0.001,
      duration: 2,
      ease: "Expo.easeInOut",
    },
    0
  );

  tl.to(
    ".section-hero.is-home",
    {
      duration: 2,
      ease: "Expo.easeInOut",
      clipPath: "polygon(-1% -1%, 101% -1%, 101% 101%, -1% 101%)",
      clearProps: "all",
    },
    1.8
  );

  tl.to(
    ".loading-logo svg",
    {
      yPercent: -100,
      rotate: 0.001,
      duration: 0.9,
      ease: "Expo.easeIn",
    },
    1.8
  );

  tl.to(
    ".loading-logo",
    {
      top: "5%",
      rotate: 0.001,
      duration: 2,
      ease: "Expo.easeInOut",
    },
    1.8
  );

  tl.set(".loading-screen", { autoAlpha: 0 }, 3.8);

  tl.to(
    ".section-hero.is-home .hero-wrapper figure",
    {
      duration: 2,
      ease: "Expo.easeInOut",
      scale: 1,
      rotate: 0.001,
      clearProps: "all",
    },
    1.8
  );

  tl.to(
    ".loading-logo",
    {
      opacity: 0,
      duration: 0.4,
      ease: "Expo.easeInOut",
    },
    2.6
  );

  tl.from(
    ".section-hero.is-home .container",
    {
      duration: 2,
      ease: "Expo.easeOut",
      yPercent: 10,
      clearProps: "all",
    },
    2.6
  );

  tl.from(
    "#hero-heading",
    {
      autoAlpha: 0,
      yPercent: 20,
      ease: "Expo.easeOut",
    },
    3
  );

  tl.to(
    "body .nav",
    {
      duration: 1.4,
      ease: "Expo.easeOut",
      autoAlpha: 1,
      clearProps: "all",
    },
    2.8
  );

  tl.to(
    "section:not(.section-hero)",
    {
      duration: 1.4,
      rotate: 0.001,
      opacity: 1,
      y: "0em",
      ease: "Expo.easeOut",
      stagger: 0.1,
      scale: 1,
    },
    3
  );
  tl.to(
    "section:not(.section-hero)",
    {
      duration: 2,
      ease: "Expo.easeOut",
      clearProps: "all",
      stagger: 0.1,
      filter: "blur(0em)",
      scale: 1,
    },
    3.2
  );

  tl.call(
    () => {
      requestAnimationFrame(() => {
        scroll.stop();
      });
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0.1
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0.2
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0.5
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    1
  );

  tl.call(
    () => {
      requestAnimationFrame(() => {
        scroll.start();
      });
    },
    null,
    2.9
  );
}

// Animation - Page Enter
function pageTransitionOut() {
  let tl = gsap.timeline();

  if (isHome) return;

  tl.call(
    () => {
      requestAnimationFrame(() => {
        scroll.stop();
      });
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0
  );
  tl.set("body .nav", { autoAlpha: 0, yPercent: -100 }, 0);

  tl.set(
    "section:not(.section-hero.is-home) [class^='col-md-'], section:not(.section-hero.is-home) + section, section:not(.section-hero.is-home) .hero-wrapper > *",
    {
      rotate: 0.001,
      opacity: 0,
      y: "1em",
      filter: "blur(0.25em)",
      // scale: 0.975,
    },
    0
  );

  tl.to("body .nav", { duration: 1.4, yPercent: 0, ease: "Expo.easeOut", autoAlpha: 1, clearProps: "all" }, 0.2);

  tl.to(
    "section:not(.section-hero.is-home) [class^='col-md-'], section:not(.section-hero.is-home) + section, section:not(.section-hero.is-home) .hero-wrapper > *",
    {
      duration: 1.4,
      rotate: 0.001,
      opacity: 1,
      y: "0em",
      ease: "Expo.easeOut",
      stagger: 0.1,
      // scale: 1,
    },
    0.4
  );

  tl.to(
    "section:not(.section-hero.is-home) [class^='col-md-'], section:not(.section-hero.is-home) + section, section:not(.section-hero.is-home) .hero-wrapper > *",
    {
      duration: 2,
      ease: "Expo.easeOut",
      clearProps: "all",
      stagger: 0.1,
      filter: "blur(0em)",
      // scale: 1,
    },
    0.6
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0.1
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0.2
  );

  tl.call(
    () => {
      scroll.scrollTo(0, {
        immediate: true,
        force: true,
        lock: true,
        duration: 0.0166,
      });
      window.scrollTo(0, 0);
    },
    null,
    0.4
  );

  tl.call(
    () => {
      requestAnimationFrame(() => {
        scroll.start();
      });
    },
    null,
    0.6
  );
}

function animateIllustration() {
  const svg = document.querySelector("#illustration");
  if (!svg) return;

  const clouds = svg.querySelectorAll("#clouds path");
  const waves = svg.querySelectorAll("#waves path");

  if (!clouds.length && !waves.length) return;

  let tl = gsap.timeline({
    repeat: -1,
    yoyo: true,
  });

  if (clouds.length) {
    tl.from(
      clouds,
      {
        x: () => gsap.utils.random(-30, 30),
        y: () => gsap.utils.random(-10, 10),
        stagger: 0.1,
        duration: 5,
        ease: "sine.inOut",
      },
      0
    );
  }

  if (waves.length) {
    tl.from(
      waves,
      {
        x: () => gsap.utils.random(-10, 10),
        y: () => gsap.utils.random(-8, 8),
        stagger: 0.1,
        duration: 5,
        ease: "sine.inOut",
      },
      0
    );
  }

  return tl;
}

function initNavigation() {
  if (!initNavigation._hasResizeListener) {
    initNavigation._hasResizeListener = true;
    window.addEventListener("resize", debounce(initNavigation, 200));
  }
  const isMobile = window.innerWidth < 768;
  if (isMobile && initNavigation._lastMode !== "mobile") {
    initMobileMenu();
    initNavigation._lastMode = "mobile";
  } else if (!isMobile && initNavigation._lastMode !== "desktop") {
    initDesktopDropdowns();
    initNavigation._lastMode = "desktop";
  }

  ScrollTrigger.create({
    start: "100px top", // When the scroll reaches 100px
    onEnter: () => document.querySelector(".nav").classList.add("is-scrolled"),
    onLeaveBack: () => document.querySelector(".nav").classList.remove("is-scrolled"),
    toggleActions: "play none none reverse",

    markers: false,
  });
}

function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

function initMobileMenu() {
  const btn = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-menu-status]");
  if (!btn || !nav) return;

  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "mobile-navigation");
  nav.setAttribute("id", "mobile-navigation");
  nav.setAttribute("role", "navigation");
  nav.setAttribute("aria-label", "Main navigation");

  if (!btn._mobileClick) {
    btn._mobileClick = true;
    btn.addEventListener("click", () => {
      const open = nav.dataset.menuStatus === "open";
      nav.dataset.menuStatus = open ? "closed" : "open";
      btn.setAttribute("aria-expanded", !open);
    });
  }

  Array.from(document.querySelectorAll("[data-dropdown-toggle]")).forEach((toggle, i) => {
    const dd = toggle.nextElementSibling;
    if (!dd || !dd.classList.contains("nav-dropdown")) return;
    if (toggle._mobileDropdownInit) return;
    toggle._mobileDropdownInit = true;

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-controls", `dropdown-${i}`);

    dd.setAttribute("id", `dropdown-${i}`);
    dd.setAttribute("role", "menu");
    dd.querySelectorAll(".nav-dropdown__link").forEach((link) => link.setAttribute("role", "menuitem"));

    toggle.addEventListener("click", () => {
      const open = toggle.dataset.dropdownToggle === "open";
      Array.from(document.querySelectorAll("[data-dropdown-toggle]")).forEach((other) => {
        if (other !== toggle) {
          other.dataset.dropdownToggle = "closed";
          other.setAttribute("aria-expanded", "false");
          if (other === document.activeElement) other.blur();
        }
      });
      toggle.dataset.dropdownToggle = open ? "closed" : "open";
      toggle.setAttribute("aria-expanded", !open);
      if (open && toggle === document.activeElement) toggle.blur();
    });
  });
}

function initDesktopDropdowns() {
  const toggles = Array.from(document.querySelectorAll("[data-dropdown-toggle]"));
  const links = Array.from(document.querySelectorAll(".nav-link:not([data-dropdown-toggle])"));

  toggles.forEach((toggle, i) => {
    const dd = toggle.nextElementSibling;
    if (!dd || !dd.classList.contains("nav-dropdown") || toggle._desktopInit) return;
    toggle._desktopInit = true;

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-controls", `desktop-dropdown-${i}`);

    dd.setAttribute("id", `desktop-dropdown-${i}`);
    dd.setAttribute("role", "menu");
    dd.setAttribute("aria-hidden", "true");
    dd.querySelectorAll(".nav-dropdown__link").forEach((link) => link.setAttribute("role", "menuitem"));

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggles.forEach((other) => {
        if (other !== toggle) {
          other.dataset.dropdownToggle = "closed";
          other.setAttribute("aria-expanded", "false");
          const otherDropdown = other.nextElementSibling;
          if (otherDropdown) otherDropdown.setAttribute("aria-hidden", "true");
        }
      });
      const open = toggle.dataset.dropdownToggle !== "open";
      toggle.dataset.dropdownToggle = "open";
      toggle.setAttribute("aria-expanded", "true");
      dd.setAttribute("aria-hidden", "false");
      if (open) {
        const first = dd.querySelector(".nav-dropdown__link");
        if (first) first.focus();
      }
    });

    toggle.addEventListener("mouseenter", () => {
      const anyOpen = toggles.some((x) => x.dataset.dropdownToggle === "open");
      toggles.forEach((other) => {
        if (other !== toggle) {
          other.dataset.dropdownToggle = "closed";
          other.setAttribute("aria-expanded", "false");
          const otherDropdown = other.nextElementSibling;
          if (otherDropdown) otherDropdown.setAttribute("aria-hidden", "true");
        }
      });
      if (anyOpen) {
        setTimeout(() => {
          toggle.dataset.dropdownToggle = "open";
          toggle.setAttribute("aria-expanded", "true");
          dd.setAttribute("aria-hidden", "false");
        }, 20);
      } else {
        toggle.dataset.dropdownToggle = "open";
        toggle.setAttribute("aria-expanded", "true");
        dd.setAttribute("aria-hidden", "false");
      }
    });

    dd.addEventListener("mouseleave", () => {
      toggle.dataset.dropdownToggle = "closed";
      toggle.setAttribute("aria-expanded", "false");
      dd.setAttribute("aria-hidden", "true");
    });

    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      } else if (e.key === "Escape") {
        toggle.dataset.dropdownToggle = "closed";
        toggle.setAttribute("aria-expanded", "false");
        dd.setAttribute("aria-hidden", "true");
        toggle.focus();
      }
    });

    dd.addEventListener("keydown", (e) => {
      const items = Array.from(dd.querySelectorAll(".nav-dropdown__link"));
      const idx = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        toggle.dataset.dropdownToggle = "closed";
        toggle.setAttribute("aria-expanded", "false");
        dd.setAttribute("aria-hidden", "true");
        toggle.focus();
      } else if (e.key === "Tab" && !dd.contains(e.relatedTarget)) {
        toggle.dataset.dropdownToggle = "closed";
        toggle.setAttribute("aria-expanded", "false");
        dd.setAttribute("aria-hidden", "true");
      }
    });
  });

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      toggles.forEach((toggle) => {
        toggle.dataset.dropdownToggle = "closed";
        toggle.setAttribute("aria-expanded", "false");
        const dd = toggle.nextElementSibling;
        if (dd) dd.setAttribute("aria-hidden", "true");
      });
    });
  });

  document.addEventListener("click", (e) => {
    const inside = toggles.some((toggle) => {
      const dd = toggle.nextElementSibling;
      return toggle.contains(e.target) || (dd && dd.contains(e.target));
    });
    if (!inside) {
      toggles.forEach((toggle) => {
        toggle.dataset.dropdownToggle = "closed";
        toggle.setAttribute("aria-expanded", "false");
        const dd = toggle.nextElementSibling;
        if (dd) dd.setAttribute("aria-hidden", "true");
      });
    }
  });
}

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
    let slidesCount = swiperEl.classList.contains("swiper-three") ? 3.5 : 5.5;

    new Swiper(swiperEl, {
      slidesPerView: slidesCount,
      centeredSlides: true,
      spaceBetween: 20,
      loop: true,
      speed: 800,
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
          slidesPerView: swiperEl.classList.contains("swiper-three") ? 3.5 : 3.5,
        },
        1024: {
          slidesPerView: slidesCount,
        },
      },
    });
  });
}

function initCustomSwiper() {
  new Swiper(".parallax-swiper", {
    loop: true,
    speed: 800,
    grabCursor: true,
    parallax: true,
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

function initMutliFilterSetupMultiMatch() {
  const transitionDelay = 300;
  const groups = [...document.querySelectorAll("[data-filter-group]")];

  groups.forEach((group) => {
    const targetMatch = (group.getAttribute("data-filter-target-match") || "multi").trim().toLowerCase(); // 'single' | 'multi'
    const nameMatch = (group.getAttribute("data-filter-name-match") || "multi").trim().toLowerCase(); // 'single' | 'multi'

    const buttons = [...group.querySelectorAll("[data-filter-target]")];
    const items = [...group.querySelectorAll("[data-filter-name]")];

    // Collect tokens from children if present
    items.forEach((item) => {
      const collectors = item.querySelectorAll("[data-filter-name-collect]");
      if (!collectors.length) return;
      const seen = new Set(),
        tokens = [];
      collectors.forEach((c) => {
        const v = (c.getAttribute("data-filter-name-collect") || "").trim().toLowerCase();
        if (v && !seen.has(v)) {
          seen.add(v);
          tokens.push(v);
        }
      });
      if (tokens.length) item.setAttribute("data-filter-name", tokens.join(" "));
    });

    // Cache item tokens
    const itemTokens = new Map();
    items.forEach((el) => {
      const raw = (el.getAttribute("data-filter-name") || "").trim().toLowerCase();
      const tokens = raw ? raw.split(/\s+/).filter(Boolean) : [];
      itemTokens.set(el, new Set(tokens));
    });

    const setItemState = (el, on) => {
      const next = on ? "active" : "not-active";
      if (el.getAttribute("data-filter-status") !== next) {
        el.setAttribute("data-filter-status", next);
        el.setAttribute("aria-hidden", on ? "false" : "true");
      }
    };

    const setButtonState = (btn, on) => {
      const next = on ? "active" : "not-active";
      if (btn.getAttribute("data-filter-status") !== next) {
        btn.setAttribute("data-filter-status", next);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      }
    };

    // Active tags model
    let activeTags = targetMatch === "single" ? null : new Set(["all"]);

    const hasRealActive = () => {
      if (targetMatch === "single") return activeTags !== null;
      return activeTags.size > 0 && !activeTags.has("all");
    };

    const resetAll = () => {
      if (targetMatch === "single") {
        activeTags = null;
      } else {
        activeTags.clear();
        activeTags.add("all");
      }
    };

    // Matching logic
    const itemMatches = (el) => {
      if (!hasRealActive()) return true;
      const tokens = itemTokens.get(el);

      if (targetMatch === "single") {
        return tokens.has(activeTags);
      } else {
        const selected = [...activeTags];
        if (nameMatch === "single") {
          // AND logic: must contain all selected
          for (let i = 0; i < selected.length; i++) {
            if (!tokens.has(selected[i])) return false;
          }
          return true;
        } else {
          // OR logic: must contain any selected
          for (let i = 0; i < selected.length; i++) {
            if (tokens.has(selected[i])) return true;
          }
          return false;
        }
      }
    };

    // 🔹 NEW: function to reindex only active items
    function reindexItems(container) {
      const activeItems = [...container.querySelectorAll('.filter-list__item[data-filter-status="active"]')];
      activeItems.forEach((item, i) => {
        // remove old position classes
        item.className = item.className.replace(/\bposition-\d+\b/g, "").trim();
        // add new one
        item.classList.add(`position-${(i % 12) + 1}`);
      });
    }

    const paint = (rawTarget) => {
      const target = (rawTarget || "").trim().toLowerCase();
      if ((target === "all" || target === "reset") && !hasRealActive()) return;

      if (target === "all" || target === "reset") {
        resetAll();
      } else if (targetMatch === "single") {
        activeTags = target;
      } else {
        if (activeTags.has("all")) activeTags.delete("all");
        if (activeTags.has(target)) activeTags.delete(target);
        else activeTags.add(target);
        if (activeTags.size === 0) resetAll();
      }

      // Update items
      items.forEach((el) => {
        if (el._ft) clearTimeout(el._ft);
        const next = itemMatches(el);
        const cur = el.getAttribute("data-filter-status");
        if (cur === "active" && transitionDelay > 0) {
          el.setAttribute("data-filter-status", "transition-out");
          el._ft = setTimeout(() => {
            setItemState(el, next);
            el._ft = null;
            reindexItems(group.querySelector(".filter-list")); // 🔹 reindex after update
          }, transitionDelay);
        } else if (transitionDelay > 0) {
          el._ft = setTimeout(() => {
            setItemState(el, next);
            el._ft = null;
            reindexItems(group.querySelector(".filter-list")); // 🔹 reindex after update
          }, transitionDelay);
        } else {
          setItemState(el, next);
          reindexItems(group.querySelector(".filter-list")); // 🔹 reindex after update
        }
      });

      // Update buttons
      buttons.forEach((btn) => {
        const t = (btn.getAttribute("data-filter-target") || "").trim().toLowerCase();
        let on = false;
        if (t === "all") on = !hasRealActive();
        else if (t === "reset") on = hasRealActive();
        else on = targetMatch === "single" ? activeTags === t : activeTags.has(t);
        setButtonState(btn, on);
      });
    };

    group.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter-target]");
      if (btn && group.contains(btn)) paint(btn.getAttribute("data-filter-target"));
    });

    paint("all"); // initial render
    reindexItems(group.querySelector(".filter-list")); // 🔹 initial index
  });
}

function initServiceSlider() {
  const sliders = document.querySelectorAll(".service-slider");
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    if (slider.classList.contains("swiper-initialized")) return;

    const wrapper = slider.closest(".service-slider-wrapper") || document;
    const nextBtn = wrapper.querySelector(".service-next");
    const prevBtn = wrapper.querySelector(".service-prev");

    new Swiper(slider, {
      slidesPerView: 2.5,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: nextBtn || ".service-next",
        prevEl: prevBtn || ".service-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        992: { slidesPerView: 2.5 },
      },
    });
  });
}

function initMagneticEffect() {
  const magnets = document.querySelectorAll("[data-magnetic-strength]");
  if (window.innerWidth <= 991) return;

  // Helper to kill tweens and reset an element.
  const resetEl = (el, immediate) => {
    if (!el) return;
    gsap.killTweensOf(el);
    (immediate ? gsap.set : gsap.to)(el, {
      x: "0em",
      y: "0em",
      rotate: "0deg",
      clearProps: "all",
      ...(!immediate && { ease: "elastic.out(1, 0.3)", duration: 1.6 }),
    });
  };

  const resetOnEnter = (e) => {
    const m = e.currentTarget;
    resetEl(m, true);
    resetEl(m.querySelector("[data-magnetic-inner-target]"), true);
  };

  const moveMagnet = (e) => {
    const m = e.currentTarget,
      b = m.getBoundingClientRect(),
      strength = parseFloat(m.getAttribute("data-magnetic-strength")) || 25,
      inner = m.querySelector("[data-magnetic-inner-target]"),
      innerStrength = parseFloat(m.getAttribute("data-magnetic-strength-inner")) || strength,
      offsetX = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (strength / 16),
      offsetY = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (strength / 16);

    gsap.to(m, { x: offsetX + "em", y: offsetY + "em", rotate: "0.001deg", ease: "power4.out", duration: 1.6 });

    if (inner) {
      const innerOffsetX = ((e.clientX - b.left) / m.offsetWidth - 0.5) * (innerStrength / 16),
        innerOffsetY = ((e.clientY - b.top) / m.offsetHeight - 0.5) * (innerStrength / 16);
      gsap.to(inner, { x: innerOffsetX + "em", y: innerOffsetY + "em", rotate: "0.001deg", ease: "power4.out", duration: 2 });
    }
  };

  const resetMagnet = (e) => {
    const m = e.currentTarget,
      inner = m.querySelector("[data-magnetic-inner-target]");
    gsap.to(m, { x: "0em", y: "0em", ease: "elastic.out(1, 0.3)", duration: 1.6, clearProps: "all" });
    if (inner) {
      gsap.to(inner, { x: "0em", y: "0em", ease: "elastic.out(1, 0.3)", duration: 2, clearProps: "all" });
    }
  };

  magnets.forEach((m) => {
    m.addEventListener("mouseenter", resetOnEnter);
    m.addEventListener("mousemove", moveMagnet);
    m.addEventListener("mouseleave", resetMagnet);
  });
}
