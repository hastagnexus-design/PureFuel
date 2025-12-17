// ------------------ FRUIT ICONS ------------------
const fruitIcons = [
  "img/fruit1.png",
  "img/fruit2.png",
  "img/fruit3.png"
];

// COLORS FOR BACKGROUND
const colors = ["#f6e1c5ff", " #EAF7F2", "#FFE5DC"];

// ELEMENTS
const fruitsContainer = document.querySelector(".fruits");
const body = document.body;
const mainBox = document.querySelector(".main-box");
const leftBg = document.querySelector(".left-bg");
const bottle = document.querySelector(".bottle");
const blend = document.querySelector(".text-box h3");
const title = document.querySelector(".text-box h1 span");

// Text + bottle data
const fruitData = [
  {
    img: "img/juice1.png",
    blend: "BLEND NO. 3",
    name: "MANGO"
  },
  {
    img: "img/juice2.png",
    blend: "BLEND NO. 1",
    name: "APPLE"
  },
  {
    img: "img/juice3.png",
    blend: "BLEND NO. 2",
    name: "KIWI"
  }
];

let index = 0;

// ------------------ AUTO CHANGE EVERYTHING ------------------
function changeEverything() {

  // Background colors
  document.querySelector(".home-page").style.background = colors[index];
  mainBox.style.background = colors[index] + "22";
  leftBg.style.background = colors[index];

  // Fruit icons (right side)
  const icons = fruitsContainer.querySelectorAll("img");
  icons.forEach((img, i) => {
    img.src = fruitIcons[(i + index) % fruitIcons.length];
  });

  // ⭐ Main bottle change
  bottle.src = fruitData[index].img;

  // ⭐ Text change
  blend.textContent = fruitData[index].blend;
  title.textContent = fruitData[index].name;

  // Loop index
  index = (index + 1) % colors.length;
}

// Run every 3 seconds
setInterval(changeEverything, 3000);

// Run once on load
changeEverything();
