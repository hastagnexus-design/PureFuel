// Product page script

//  Freezing the scrolll while open model popup
document.addEventListener("DOMContentLoaded", function () {
  // Listen for Bootstrap modal events
  const modals = document.querySelectorAll(".modal");

  modals.forEach(modal => {
    modal.addEventListener("show.bs.modal", () => {
      // Pause all GSAP animations when modal opens
      gsap.globalTimeline.pause();
      document.body.classList.add("modal-open"); 
    });

    modal.addEventListener("hidden.bs.modal", () => {
      // Resume GSAP animations when modal closes
      gsap.globalTimeline.resume();
      document.body.classList.remove("modal-open");
    });
  });
});

// Scrolling Left to right and righr to left product cards

document.addEventListener("DOMContentLoaded", async function () {
  const topTrack = document.querySelector(".products-track-left, .products-track-top");
  const bottomTrack = document.querySelector(".products-track-right, .products-track-bottom");
  if (!topTrack || !bottomTrack) return;

  const imgs = Array.from(document.querySelectorAll("#products img"));
  await Promise.all(
    imgs.map(img => img.complete ? Promise.resolve()
      : new Promise(res => img.addEventListener("load", res, { once: true })))
  );

  // Duplicate each track’s content for seamless loop
  if (!topTrack.dataset.duped) {
    topTrack.innerHTML += topTrack.innerHTML;
    topTrack.dataset.duped = "1";
  }
  if (!bottomTrack.dataset.duped) {
    bottomTrack.innerHTML += bottomTrack.innerHTML;
    bottomTrack.dataset.duped = "1";
  }

  function start() {
    const topHalf = topTrack.scrollWidth / 2;
    const bottomHalf = bottomTrack.scrollWidth / 2;

    gsap.set(topTrack,    { x: 0 });
    gsap.set(bottomTrack, { x: 0 });

    // TOP: right → left 
    gsap.to(topTrack, {
      x: -topHalf,
      duration: 60,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const v = parseFloat(x);
          return (v <= -topHalf ? v + topHalf : v) + "px";
        }
      }
    });

    // BOTTOM: left → right 
    gsap.to(bottomTrack, {
      x: "+=" + bottomHalf,
      duration: 60,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const v = parseFloat(x);
          return (v > 0 ? v - bottomHalf : v) + "px";
        }
      }
    });
  }

  requestAnimationFrame(start);

  function restart() {
    gsap.globalTimeline.clear();
    requestAnimationFrame(start);
  }
  window.addEventListener("resize", restart, { passive: true });
  window.addEventListener("orientationchange", restart, { passive: true });
});
