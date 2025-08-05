const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productListEl = document.getElementById("product-list");
const cartListEl = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = [];

// Load cart from sessionStorage
function loadCart() {
  const savedCart = sessionStorage.getItem("cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
      cart.forEach(renderCartItem);
    } catch (e) {
      cart = [];
    }
  }
}

// Save cart to sessionStorage
function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render a product in the product list
function renderProduct(product) {
  const li = document.createElement("li");
  li.textContent = `${product.name} - $${product.price} `;

  const addButton = document.createElement("button");
  addButton.textContent = "Add to Cart";
  addButton.addEventListener("click", () => {
    cart.push(product);
    renderCartItem(product);
    saveCart();
  });

  li.appendChild(addButton);
  productListEl.appendChild(li);
}

// Render a cart item in the cart list
function renderCartItem(product) {
  const li = document.createElement("li");
  li.textContent = `${product.name} - $${product.price}`;
  cartListEl.appendChild(li);
}

// Clear cart logic
clearCartBtn.addEventListener("click", () => {
  cart = [];
  cartListEl.innerHTML = "";
  sessionStorage.removeItem("cart");
});

// Initialize page
function init() {
  products.forEach(renderProduct);
  loadCart();
}

init();
