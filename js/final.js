AOS.init({
    duration: 1000,
    once: true
});

// 1. DATA: Define the content for the 3 slides
const slides = [
    {
        subtitle: "Blend No. 1",
        fruit: "MANGO",
        titlePart1: "Indian",
        titlePart3: "Delight",
        desc: "100% Organic, Cold-pressed, and packed with nature's raw energy.",
        color: "#FF9800", // Orange
        img: "img/juice1.png", // Ensure this image exists
        miniIcon: "img/fruit1.png" // Optional small icon
    },
    {
        subtitle: "Blend No. 2",
        fruit: "BERRY",
        titlePart1: "Wild",
        titlePart3: "Blast",
        desc: "Rich in antioxidants with a perfect mix of strawberries and blueberries.",
        color: "#E91E63", // Pink/Red
        img: "img/juice3.png", // Ensure this image exists
        miniIcon: "img/item3.jpg"
    },
    {
        subtitle: "Blend No. 3",
        fruit: "GREEN",
        titlePart1: "Super",
        titlePart3: "Detox",
        desc: "Cucumber, Spinach, and Green Apple for the ultimate body cleanse.",
        color: "#4CAF50", // Green
        img: "img/juice1.png", // Using juice1 again as placeholder, replace with actual green juice image
        miniIcon: "img/item2.jpg"
    }
];

let currentIndex = 0;

// Select DOM Elements
const bottleImg = document.getElementById('hero-bottle-img');
const splashImg = document.getElementById('hero-splash');

const textSubtitle = document.getElementById('hero-subtitle');
const textTitle = document.getElementById('hero-title');
const textFruit = document.getElementById('hero-fruit');
const textDesc = document.getElementById('hero-desc');
const miniIcon = document.getElementById('hero-mini-icon');

function changeSlide() {
    // Increment Index
    currentIndex = (currentIndex + 1) % slides.length;
    const slide = slides[currentIndex];

    // --- STEP 1: EXIT ANIMATION ---

    // 1. Animate Bottle Out
    bottleImg.style.animation = 'none'; // Stop floating
    bottleImg.classList.remove('bottle-active', 'bottle-enter');
    bottleImg.classList.add('bottle-exit');

    // 2. Animate Text Out
    textTitle.classList.add('text-exit');
    textDesc.classList.add('text-exit');
    textSubtitle.classList.add('text-exit');

    // --- STEP 2: CHANGE CONTENT (Wait for exit to finish) ---
    setTimeout(() => {
        // Update Text
        textSubtitle.innerText = slide.subtitle;
        textFruit.innerText = slide.fruit;
        textFruit.style.color = slide.color;
        textDesc.innerText = slide.desc;

        // Rebuild the H1 HTML safely to keep structure
        textTitle.innerHTML = `${slide.titlePart1}<br><span id="hero-fruit" style="color:${slide.color}">${slide.fruit}</span><br>${slide.titlePart3}`;

        // Update Images
        bottleImg.src = slide.img;
        if (slide.miniIcon) miniIcon.src = slide.miniIcon;

        // --- STEP 3: ENTER ANIMATION ---

        // Remove Exit Classes
        bottleImg.classList.remove('bottle-exit');
        textTitle.classList.remove('text-exit');
        textDesc.classList.remove('text-exit');
        textSubtitle.classList.remove('text-exit');

        // Add Enter Classes (Trigger Reflow)
        void bottleImg.offsetWidth; // Force Reflow

        bottleImg.classList.add('bottle-enter');

        // Add Text Enter Animations
        textTitle.classList.add('text-enter');
        textDesc.classList.add('text-enter');

        // Wait for Entry Animation to finish, then re-enable Float
        setTimeout(() => {
            bottleImg.classList.remove('bottle-enter');
            bottleImg.classList.add('bottle-active');
            // bottleImg.style.animation = 'float 4s ease-in-out infinite'; // Restart float

            // Cleanup Text classes
            textTitle.classList.remove('text-enter');
            textDesc.classList.remove('text-enter');
        }, 800); // Matches CSS transition time

    }, 500); // Wait 500ms (half a second) for the exit animation
}

// Run the animation every 4.5 seconds
setInterval(changeSlide, 4500);


// Initialize ScrollReveal

// Initialize ScrollReveal
const sr = ScrollReveal({
    duration: 1000,
    reset: true, // This allows the animation to repeat every time you scroll back
    distance: '0px', // We use 0px because your CSS handles the movement
});

// Target the promo cards
sr.reveal('.promo-card', {
    interval: 200, // The wave effect (one by one)

    // When the card enters the screen:
    beforeReveal: function (el) {
        el.classList.add('sr-show');
    },

    // When the card leaves the screen (because reset: true is on):
    beforeReset: function (el) {
        el.classList.remove('sr-show');
    }
});


document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Generic Observer Function
    const createScrollObserver = (selector, activeClasses, thresholdValue) => {
        const elements = document.querySelectorAll(selector);
        
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add all classes provided (handles strings or arrays)
                    if (Array.isArray(activeClasses)) {
                        activeClasses.forEach(cls => entry.target.classList.add(cls));
                    } else {
                        entry.target.classList.add(activeClasses);
                    }
                } else {
                    // Remove classes when scrolling away to allow re-animation
                    if (Array.isArray(activeClasses)) {
                        activeClasses.forEach(cls => entry.target.classList.remove(cls));
                    } else {
                        entry.target.classList.remove(activeClasses);
                    }
                }
            });
        }, { threshold: thresholdValue });

        elements.forEach(el => observer.observe(el));
    };

    // 2. Initialize Observers for your specific sections
    
    // For the Menu Section
    createScrollObserver(".menu-section", "is-visible", 0.1);

    // For the Delivery Page (Combined 'is-animated' and 'reveal-now')
    createScrollObserver(".delivery-page", ["is-animated", "reveal-now"], 0.2);

});

document.addEventListener("DOMContentLoaded", function () {
    
    // --- PART 1: Section Reveal Logic (Intersection Observers) ---
    const createScrollObserver = (selector, activeClasses, thresholdValue) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (Array.isArray(activeClasses)) {
                        activeClasses.forEach(cls => entry.target.classList.add(cls));
                    } else {
                        entry.target.classList.add(activeClasses);
                    }
                } else {
                    if (Array.isArray(activeClasses)) {
                        activeClasses.forEach(cls => entry.target.classList.remove(cls));
                    } else {
                        entry.target.classList.remove(activeClasses);
                    }
                }
            });
        }, { threshold: thresholdValue });

        elements.forEach(el => observer.observe(el));
    };

});


document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.products-track-top');
    const wrapper = document.querySelector('.infinite-wrapper');

    if (wrapper && track) {
        wrapper.addEventListener('mouseenter', () => {
            // This finds any GSAP animation running on the track and pauses it
            const animations = gsap.getTweensOf(track);
            animations.forEach(a => a.pause());
        });

        wrapper.addEventListener('mouseleave', () => {
            // This tells the animation to continue running
            const animations = gsap.getTweensOf(track);
            animations.forEach(a => a.play());
        });
    }
});


const heroData = [
  {
    subtitle: "Blend No. 1",
    fruit: "MANGO",
    titleTop: "Indian",
    titleBottom: "Delight",
    desc: "100% Organic, Cold-pressed, and packed with nature's raw energy.",
    bottle: "img/juice1.png",
    miniIcon: "img/fruit1.png",
    bgClass: "bg-1"
  },
  {
    subtitle: "Blend No. 2",
    fruit: "BERRY",
    titleTop: "Wild",
    titleBottom: "Blast",
    desc: "Rich in antioxidants with a perfect mix of strawberries and blueberries.",
    bottle: "img/juice2.png",
    miniIcon: "img/fruit2.png",
    bgClass: "bg-2"
  },
  {
    subtitle: "Blend No. 3",
    fruit: "GREEN",
    titleTop: "Pure",
    titleBottom: "Vital",
    desc: "Plant-powered nutrition with apple, kiwi, and spinach.",
    bottle: "img/juice3.png",
    miniIcon: "img/fruit3.png",
    bgClass: "bg-3"
  }
];

let current = 0;

const heroBg = document.getElementById("heroBg");
const subtitle = document.getElementById("hero-subtitle");
const fruit = document.getElementById("hero-fruit");
const title = document.getElementById("hero-title");
const desc = document.getElementById("hero-desc");
// const bottleImg = document.getElementById("hero-bottle-img");
// const miniIcon = document.getElementById("hero-mini-icon");

function changeHero() {
  const data = heroData[current];

  subtitle.textContent = data.subtitle;
  fruit.textContent = data.fruit;
  title.innerHTML = `
    ${data.titleTop}<br>
    <span style="color:var(--secondary)">${data.fruit}</span><br>
    ${data.titleBottom}
  `;
  desc.textContent = data.desc;
  bottleImg.src = data.bottle;
  miniIcon.src = data.miniIcon;

  heroBg.className = `hero-bg ${data.bgClass}`;

  current = (current + 1) % heroData.length;
}

/* Initial load */
changeHero();

/* Auto change */
setInterval(changeHero, 3000);


