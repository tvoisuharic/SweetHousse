function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cart = getCart();
    document.getElementById('cart-count').innerText = cart.length;
}

function addToCart(event) {
    const button = event.target;
    const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
    };

    const cart = getCart();
    cart.push(product);
    saveCart(cart);
    updateCartCount();
}

function displayCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    let total = 0;

    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Корзина пуста</p>';
        totalPrice.innerText = '0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div>
                ${item.name} - ${item.price} руб.
                <button onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `;
    });

    totalPrice.innerText = total;
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    updateCartCount();
}

function checkout() {
    alert('Заказ оформлен!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html', 'cart1.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.add-to-cart')) {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
        updateCartCount();
    } else if (document.getElementById('cart-items')) {
        displayCart();
    }
});



