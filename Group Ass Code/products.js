let cart = {};
let total = 0;

function updateTotal(amount) {
  total += amount;
  document.getElementById("cart-total").textContent = total;
}

function addToCart(button) {
  const card = button.parentElement;
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);

  if (cart[name]) {
    cart[name].qty++;
    cart[name].qtyEl.textContent = cart[name].qty;
    updateTotal(price);
    return;
  }

  const item = document.createElement("div");
  item.classList.add("cart-item");

  item.innerHTML = `
    <span>${name} - RM${price}</span>
    <div class="cart-controls">
      <button class="qty-btn minus">−</button>
      <span class="qty">1</span>
      <button class="qty-btn plus">+</button>
      <button class="remove-btn">✖</button>
    </div>
  `;

  const qtyEl = item.querySelector(".qty");

  // PLUS
  item.querySelector(".plus").onclick = () => {
    cart[name].qty++;
    qtyEl.textContent = cart[name].qty;
    updateTotal(price);
  };

  // MINUS
  item.querySelector(".minus").onclick = () => {
    cart[name].qty--;
    updateTotal(-price);

    if (cart[name].qty <= 0) {
      item.remove();
      delete cart[name];
    } else {
      qtyEl.textContent = cart[name].qty;
    }
  };

  // REMOVE
  item.querySelector(".remove-btn").onclick = () => {
    updateTotal(-price * cart[name].qty);
    item.remove();
    delete cart[name];
  };

  document.getElementById("cart-items").appendChild(item);

  cart[name] = {
    price: price,
    qty: 1,
    qtyEl: qtyEl,
  };

  updateTotal(price);

  button.textContent = "Added ✓";
  setTimeout(() => (button.textContent = "Add to Cart"), 800);
}

function toggleCart() {
  const cartPanel = document.querySelector(".cart-panel");
  const overlay = document.querySelector(".cart-overlay");

  cartPanel.classList.toggle("active");
  overlay.style.display = cartPanel.classList.contains("active")
    ? "block"
    : "none";
}
