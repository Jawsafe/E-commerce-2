// Sticky header class
const header = document.querySelector("#header");

window.addEventListener("scroller", function () {
  header.classList.toggle("sticky", this.window.scrollY > 0);
});

// Opening nav-menu
document.addEventListener('DOMContentLoaded', function () {
  const bar = document.getElementById('bar');
  const nav = document.getElementById('navbar');

  if (bar && nav) {
    bar.addEventListener('click', function () {
      console.log('Bar clicked');
      this.classList.toggle('fa-xmark');
      nav.classList.toggle('active');
    });
  }
});

// Selecting product images
const mainImg = document.getElementById("MainImg");
const smallImages = document.getElementsByClassName("smallImg");

for (let i = 0; i < smallImages.length; i++) {
  smallImages[i].onclick = function () {
    mainImg.src = this.src;
  }
}

// Message Box - Blogs
const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
  link.addEventListener('click', function () {
    alert(`You clicked "${this.textContent}"`);
  });
});

// Scrolling animation
const scrollers = document.querySelectorAll('.scrolling-container');

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerImage = scroller.querySelector('.scrolling-img');
    const scrollerContent = Array.from(scrollerImage.children);

    scrollerContent.forEach(item => {
      const sameItem = item.cloneNode(true);
      sameItem.setAttribute('aria-hidden', true);
      scrollerImage.appendChild(sameItem);
    });
  });
}

// No letter 'e'
function validateInput(input) {
  input.value = input.value.replace(/e/g, ''); // Remove 'e' from the input value
}

// Calculating the product cost & subtotal
const productCosts = [];

for (let i = 1; i <= 4; i++) {
  const priceElement = document.getElementById(`price${i}`);
  const quantityElement = document.getElementById(`quantity${i}`).querySelector('input');
  const costElement = document.getElementById(`product-cost${i}`);

  quantityElement.addEventListener('input', updateCost);
  updateCost(); // Initial calculation

  function updateCost() {
    const price = parseFloat(priceElement.innerText.replace('₱', ''));
    const quantity = parseInt(quantityElement.value);

    const cost = price * quantity;
    costElement.innerText = `₱${cost.toFixed(2)}`;

    // Update the product cost in the array
    productCosts[i - 1] = cost;

    // Update the subtotal
    const subtotal = productCosts.reduce((total, cost) => total + cost, 0);
    document.getElementById('subtotal').innerText = `₱${subtotal.toFixed(2)}`;
  }
}

// Calculating totalcost
const shippingSelect = document.getElementById('ship-fee');
const subtotalElement = document.getElementById('subtotal');
const totalCostElement = document.getElementById('total-cost');

// Add an event listener to the select element
shippingSelect.addEventListener('change', updateTotalCost);

function updateTotalCost() {
    // Get the selected value from the shipping select
    const selectedValue = parseInt(shippingSelect.value);

    // Calculate subtotal (sum of product costs)
    const subtotal = calculateSubtotal();

    // Calculate total cost by adding shipping to the subtotal
    const totalCost = subtotal + (selectedValue || 0); // Use selectedValue or 0 if it's falsy

    // Update the subtotal and total cost elements in the HTML
    subtotalElement.innerText = `₱${subtotal.toFixed(2)}`;
    totalCostElement.innerText = `₱${totalCost.toFixed(2)}`;
}

// Function to calculate the subtotal from product costs
function calculateSubtotal() {
    let subtotal = 0;

    // Loop through product cost elements
    for (let i = 1; i <= 4; i++) {
        const productCostElement = document.getElementById(`product-cost${i}`);
        // Get the product cost value and add it to the subtotal
        subtotal += parseFloat(productCostElement.innerText.replace('₱', ''));
    }

    return subtotal;
}

// Initial update when the page loads
updateTotalCost();