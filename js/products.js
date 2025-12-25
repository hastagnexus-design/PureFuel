document.addEventListener("DOMContentLoaded", function () {
  const topTrack = document.querySelector(".products-track-top");
  const productImages = document.querySelectorAll("#products img");

  if (!topTrack) {
    console.warn("Scroll track not found.");
    return;
  }

  // Pause GSAP when modal opens
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("show.bs.modal", () => {
      gsap.globalTimeline.pause();
      document.body.classList.add("modal-open");
    });
    modal.addEventListener("hidden.bs.modal", () => {
      gsap.globalTimeline.resume();
      document.body.classList.remove("modal-open");
    });
  });

  // Fallback for broken images
  productImages.forEach(img => {
    img.onerror = () => {
      console.warn("Image failed to load:", img.src);
      img.src = "img/fallback.jpg";
    };
  });

  // Wait for all images to load
  const waitForImages = Array.from(productImages).map(img =>
    img.complete ? Promise.resolve() : new Promise(res => img.onload = res)
  );

  Promise.all(waitForImages).then(() => {
    if (topTrack.dataset.duped === "1") {
      console.log("Scroll track already duplicated.");
      return;
    }

    // Duplicate content
    topTrack.innerHTML += topTrack.innerHTML;
    topTrack.dataset.duped = "1";

    function startScroll() {
      const halfWidth = topTrack.scrollWidth / 2;
      if (halfWidth === 0) {
        console.error("Scroll width is zero. Check .products-item widths.");
        return;
      }

      gsap.set(topTrack, { x: 0 });

      gsap.to(topTrack, {
        x: -halfWidth,
        duration: 60,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: x => {
            const v = parseFloat(x);
            return (v <= -halfWidth ? v + halfWidth : v) + "px";
          }
        }
      });

      console.log("Scroll started. Half width:", halfWidth);
    }

    startScroll();

    // Restart on resize
    const restartScroll = () => {
      gsap.killTweensOf(topTrack);
      requestAnimationFrame(startScroll);
    };

    window.addEventListener("resize", restartScroll, { passive: true });
    window.addEventListener("orientationchange", restartScroll, { passive: true });
  });
});
