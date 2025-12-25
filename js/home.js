document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================
    // 1. HERO SECTION (HOME) ANIMATIONS
    // =========================================
    
    const heroSection = {
        data: [
            {
                id: 1,
                img: "img/juice1.png", // Mango
                blend: "BLEND NO. 1",
                name: "MANGO",
                sub: "Indian Delight",
                color: "#fffaeb", // Soft Yellow
                accent: "#ffc107",
                fruits: ["img/fruit1.png", "img/fruit2.png", "img/fruit3.png"]
            },
            {
                id: 2,
                img: "img/juice2.png", // Apple/Red
                blend: "BLEND NO. 2",
                name: "APPLE",
                sub: "Crisp Red",
                color: "#fff0f0", // Soft Red
                accent: "#dc3545",
                fruits: ["img/fruit2.png", "img/fruit3.png", "img/fruit1.png"]
            },
            {
                id: 3,
                img: "img/juice3.png", // Kiwi/Green
                blend: "BLEND NO. 3",
                name: "KIWI",
                sub: "Green Punch",
                color: "#f0fff4", // Soft Green
                accent: "#198754",
                fruits: ["img/fruit3.png", "img/fruit1.png", "img/fruit2.png"]
            }
        ],
        elements: {
            bg: document.querySelector(".home-page"),
            bottle: document.querySelector(".bottle"),
            blendText: document.querySelector(".text-box h3"),
            titleText: document.querySelector(".text-box h1"),
            fruitIcons: document.querySelectorAll(".fruits img"),
            learnBtn: document.querySelector(".learn-btn")
        },
        currentIndex: 0,
        isAnimating: false,
        timer: null
    };

    function animateHero(index) {
        if (heroSection.isAnimating) return;
        heroSection.isAnimating = true;

        const data = heroSection.data[index];
        const timeline = gsap.timeline({
            onComplete: () => {
                heroSection.isAnimating = false;
            }
        });

        // 1. OUT Animation (Old Elements)
        // timeline
        //     .to(heroSection.elements.bottle, { y: 50, opacity: 0, duration: 0.5, ease: "power2.in" })
        //     .to(heroSection.elements.titleText, { x: -50, opacity: 0, duration: 0.4 }, "<")
        //     .to(heroSection.elements.blendText, { opacity: 0, duration: 0.3 }, "<")
        //     .to(heroSection.elements.fruitIcons, { scale: 0, stagger: 0.1, duration: 0.3 }, "<");

        // 2. CHANGE Content (While Invisible)
        timeline.call(() => {
            // Background Color
            gsap.to(heroSection.elements.bg, { backgroundColor: data.color, duration: 1 });
            
            // Text & Image Updates
            heroSection.elements.bottle.src = data.img;
            heroSection.elements.blendText.textContent = data.blend;
            // Using innerHTML to keep styling for the main word
            heroSection.elements.titleText.innerHTML = `${data.sub} <br><span style="color:${data.accent}">${data.name}</span>`;
            
            // Update Fruit Icons
            heroSection.elements.fruitIcons.forEach((img, i) => {
                img.src = data.fruits[i];
            });
            
            // Button Color
            if(heroSection.elements.learnBtn) {
                heroSection.elements.learnBtn.style.backgroundColor = data.accent;
                heroSection.elements.learnBtn.style.borderColor = data.accent;
                heroSection.elements.learnBtn.style.color = "#fff";
            }
        });

        // 3. IN Animation (New Elements)
    //     timeline
    //         .to(heroSection.elements.bottle, { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" })
    //         .to(heroSection.elements.blendText, { opacity: 1, duration: 0.5 }, "-=0.6")
    //         .fromTo(heroSection.elements.titleText, 
    //             { x: 50, opacity: 0 }, 
    //             { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.6")
    //         .to(heroSection.elements.fruitIcons, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.6");
    }

    // Auto-play Logic
    function nextSlide() {
        heroSection.currentIndex = (heroSection.currentIndex + 1) % heroSection.data.length;
        animateHero(heroSection.currentIndex);
    }

    // Start Timer
    heroSection.timer = setInterval(nextSlide, 4000);

    // Pause on Hover
    const homeContainer = document.querySelector(".home-page");
    if (homeContainer) {
        homeContainer.addEventListener("mouseenter", () => clearInterval(heroSection.timer));
        homeContainer.addEventListener("mouseleave", () => heroSection.timer = setInterval(nextSlide, 4000));
    }


    // =========================================
    // 2. PRODUCTS SECTION (DYNAMIC DATA)
    // =========================================

    // Centralized Data - MUCH easier to manage than 15 HTML modals
    const productsData = [
        {
            id: "product-liverlight",
            title: "Liver Light",
            ingredients: "Keelanelli + Lemon",
            price: "100",
            tagline: "Cleanse your liver, fuel your day.",
            benefits: ["Natural liver detox", "Regulates blood sugar", "Clears skin"],
            desc: "This Liver Light drink is made with Keelanelli and Lemon, ideal for detox and boosting liver health.",
            img: "img/juicebootle.jpg"
        },
        {
            id: "product-vitaminbomb",
            title: "Vitamin Bomb",
            ingredients: "Nellikai + Honey",
            price: "100",
            tagline: "The King of Vitamin C in every sip.",
            benefits: ["Boosts immunity", "Slows aging", "Strengthens hair & skin"],
            desc: "Rich in Vitamin C and immunity boosters.",
            img: "img/juicebootle.jpg"
        },
        {
            id: "product-slimfuel",
            title: "Slim Fuel",
            ingredients: "Banana Stem + Lemon",
            price: "120",
            tagline: "Flush toxins, cut the bloat.",
            benefits: ["Kidney stone prevention", "Natural diuretic", "Weight loss support"],
            desc: "Ideal for detox, kidney health, and weight management.",
            img: "img/juicebootle.jpg"
        },
        // ... Add all other products here following the pattern
        // This makes your code scalable. If you add a new juice, just add one object here.
    ];

    // Function to handle "Read More" clicks
    // Note: You need to add a generic modal in your HTML (see instructions below)
    const setupProductModals = () => {
        const productButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
        const modalTitle = document.querySelector('#genericProductModal .modal-title');
        const modalBodyImg = document.querySelector('#genericProductModal .modal-body img');
        const modalDesc = document.querySelector('#genericProductModal .modal-description');
        const modalPrice = document.querySelector('#genericProductModal .modal-price');
        const modalList = document.querySelector('#genericProductModal .modal-benefits');
        
        // This is a fallback in case you haven't updated HTML yet
        if (!modalTitle) return;

        productButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Get the parent card class to identify product
                // We assume the button is inside a div with a specific class or we use data attributes
                // Ideally, add data-id="product-liverlight" to your buttons in HTML
                
                // For now, let's try to find the product based on the button's context
                // You should update HTML to: <button data-id="product-liverlight" ... >
                
                // *For demonstration, I will assume the button has a data-id attribute*
                // If not, we map based on the card class.
                
                let productId = this.getAttribute('data-id'); 
                
                // Fallback: try to find it from parent class if data-id is missing
                if(!productId) {
                    const parent = this.closest('.products-item');
                    if(parent) {
                        // Extract class name (e.g., product-liverlight)
                        const classes = parent.className.split(' ');
                        productId = classes.find(c => c.startsWith('product-'));
                    }
                }

                const product = productsData.find(p => p.id === productId);

                if (product) {
                    modalTitle.innerHTML = `${product.title} <span class="text-muted fs-6">(${product.ingredients})</span>`;
                    modalBodyImg.src = product.img;
                    modalDesc.innerHTML = `<p><strong>Tagline:</strong> <em>"${product.tagline}"</em></p><p>${product.desc}</p>`;
                    modalPrice.innerHTML = `Price: ₹${product.price}`;
                    
                    // Generate list
                    let listHtml = "";
                    product.benefits.forEach(b => listHtml += `<li><i class="fas fa-check text-success me-2"></i>${b}</li>`);
                    modalList.innerHTML = listHtml;
                }
            });
        });
    };

    // Initialize Product Logic
    setupProductModals();


    // =========================================
    // 3. MENU FILTERING (Fast Movers)
    // =========================================
    
    // Add simple filter buttons dynamically if they don't exist
    const menuSection = document.querySelector('.menu-section .container');
    if(menuSection && !document.querySelector('.filter-buttons')) {
        const filterDiv = document.createElement('div');
        filterDiv.className = 'text-center mb-4 filter-buttons';
        filterDiv.innerHTML = `
            <button class="btn btn-outline-success active m-1" data-filter="all">All</button>
            <button class="btn btn-outline-success m-1" data-filter="juice">Juices</button>
            <button class="btn btn-outline-success m-1" data-filter="smoothie">Smoothies</button>
        `;
        menuSection.insertBefore(filterDiv, menuSection.children[1]); // Insert after title
        
        // Add categories to your HTML items manually or via JS
        // Logic:
        const items = document.querySelectorAll('.item-card');
        const btns = document.querySelectorAll('.filter-buttons button');
        
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Active class toggle
                btns.forEach(b => b.classList.remove('active', 'btn-success'));
                btns.forEach(b => b.classList.add('btn-outline-success'));
                e.target.classList.remove('btn-outline-success');
                e.target.classList.add('btn-success', 'active');
                
                const filter = e.target.getAttribute('data-filter');
                
                items.forEach(item => {
                    const title = item.querySelector('h5').innerText.toLowerCase();
                    const parentCol = item.closest('.col-md-4');
                    
                    // Simple text-based filtering for demo
                    if(filter === 'all') {
                        parentCol.style.display = 'block';
                        gsap.to(parentCol, {scale: 1, opacity: 1, duration: 0.3});
                    } else {
                        if(title.includes(filter)) {
                            parentCol.style.display = 'block';
                            gsap.fromTo(parentCol, {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 0.3});
                        } else {
                            parentCol.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});