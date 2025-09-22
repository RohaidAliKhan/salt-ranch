document.addEventListener("DOMContentLoaded", () => {
  initMarquee("#marquee", 1);
  initMarquee("#marquee2", -1);

  const altElements = document.querySelectorAll([".heading-style-h1", "h1", ".heading-style-h2", "h2", ".navbar ul li a"]);

  altElements.forEach((el) => {
    el.innerHTML = el.textContent.replace(/([CGJSQ123569])/gi, '<span class="alt-font">$1</span>');
  });
});

function initMarquee(selector, speed = 1) {
  const marquee = document.querySelector(selector);
  const inner = marquee.querySelector(".marquee-inner");

  let position = 0;
  function animate() {
    position -= speed;
    if (Math.abs(position) >= inner.firstElementChild.offsetWidth + 32) {
      // ek item nikal kar end me daal do taake infinite lage
      inner.appendChild(inner.firstElementChild);
      position = 0;
    }
    inner.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}
