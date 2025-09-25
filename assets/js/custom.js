(function () {
  const locomotiveScroll = new LocomotiveScroll();
})();

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  // initMarquee("#marquee", 1);
  // initMarquee("#marquee2", -1);
  initSwiper();
  initCustomSwiper();
  initMutliFilterSetupMultiMatch();
  initServiceSlider();

  const altElements = document.querySelectorAll([
    ".heading-style-h1",
    "h1",
    ".heading-style-h2",
    "h2",
  ]);

  altElements.forEach((el) => {
    el.innerHTML = el.textContent.replace(
      /([CGJSQ123569])/gi,
      '<span class="alt-font">$1</span>'
    );
  });
});

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

  Array.from(document.querySelectorAll("[data-dropdown-toggle]")).forEach(
    (toggle, i) => {
      const dd = toggle.nextElementSibling;
      if (!dd || !dd.classList.contains("nav-dropdown")) return;
      if (toggle._mobileDropdownInit) return;
      toggle._mobileDropdownInit = true;

      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-haspopup", "true");
      toggle.setAttribute("aria-controls", `dropdown-${i}`);

      dd.setAttribute("id", `dropdown-${i}`);
      dd.setAttribute("role", "menu");
      dd.querySelectorAll(".nav-dropdown__link").forEach((link) =>
        link.setAttribute("role", "menuitem")
      );

      toggle.addEventListener("click", () => {
        const open = toggle.dataset.dropdownToggle === "open";
        Array.from(document.querySelectorAll("[data-dropdown-toggle]")).forEach(
          (other) => {
            if (other !== toggle) {
              other.dataset.dropdownToggle = "closed";
              other.setAttribute("aria-expanded", "false");
              if (other === document.activeElement) other.blur();
            }
          }
        );
        toggle.dataset.dropdownToggle = open ? "closed" : "open";
        toggle.setAttribute("aria-expanded", !open);
        if (open && toggle === document.activeElement) toggle.blur();
      });
    }
  );
}

function initDesktopDropdowns() {
  const toggles = Array.from(
    document.querySelectorAll("[data-dropdown-toggle]")
  );
  const links = Array.from(
    document.querySelectorAll(".nav-link:not([data-dropdown-toggle])")
  );

  toggles.forEach((toggle, i) => {
    const dd = toggle.nextElementSibling;
    if (!dd || !dd.classList.contains("nav-dropdown") || toggle._desktopInit)
      return;
    toggle._desktopInit = true;

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-controls", `desktop-dropdown-${i}`);

    dd.setAttribute("id", `desktop-dropdown-${i}`);
    dd.setAttribute("role", "menu");
    dd.setAttribute("aria-hidden", "true");
    dd.querySelectorAll(".nav-dropdown__link").forEach((link) =>
      link.setAttribute("role", "menuitem")
    );

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

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
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
    let slidesCount = swiperEl.classList.contains("swiper-three") ? 3.5 : 5.5;

    new Swiper(swiperEl, {
      slidesPerView: slidesCount,
      centeredSlides: true,
      spaceBetween: 20,
      loop: true,
      speed: 1000,
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
          slidesPerView: swiperEl.classList.contains("swiper-three")
            ? 3.5
            : 3.5,
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
    speed: 1000,
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
    const targetMatch = (
      group.getAttribute("data-filter-target-match") || "multi"
    )
      .trim()
      .toLowerCase(); // 'single' | 'multi'
    const nameMatch = (group.getAttribute("data-filter-name-match") || "multi")
      .trim()
      .toLowerCase(); // 'single' | 'multi'

    const buttons = [...group.querySelectorAll("[data-filter-target]")];
    const items = [...group.querySelectorAll("[data-filter-name]")];

    // Collect tokens from children if present
    items.forEach((item) => {
      const collectors = item.querySelectorAll("[data-filter-name-collect]");
      if (!collectors.length) return;
      const seen = new Set(),
        tokens = [];
      collectors.forEach((c) => {
        const v = (c.getAttribute("data-filter-name-collect") || "")
          .trim()
          .toLowerCase();
        if (v && !seen.has(v)) {
          seen.add(v);
          tokens.push(v);
        }
      });
      if (tokens.length)
        item.setAttribute("data-filter-name", tokens.join(" "));
    });

    // Cache item tokens
    const itemTokens = new Map();
    items.forEach((el) => {
      const raw = (el.getAttribute("data-filter-name") || "")
        .trim()
        .toLowerCase();
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
      const activeItems = [
        ...container.querySelectorAll(
          '.filter-list__item[data-filter-status="active"]'
        ),
      ];
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
        const t = (btn.getAttribute("data-filter-target") || "")
          .trim()
          .toLowerCase();
        let on = false;
        if (t === "all") on = !hasRealActive();
        else if (t === "reset") on = hasRealActive();
        else
          on = targetMatch === "single" ? activeTags === t : activeTags.has(t);
        setButtonState(btn, on);
      });
    };

    group.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter-target]");
      if (btn && group.contains(btn))
        paint(btn.getAttribute("data-filter-target"));
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
