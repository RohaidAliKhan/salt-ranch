document.addEventListener("DOMContentLoaded", () => {
  initMarquee("#marquee", 1);
  initMarquee("#marquee2", -1);
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
