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
        image: button.dataset.image, // Добавляем картинку товара
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
            <div style="display: flex; align-items: center;data-name margin-bottom: 10px; gap: 15px;">
                <img src="${item.image}" alt="${item.name}" style="width: 200px; margin: 20px; height: auto;">
                <div>
                    <p>${item.name} - ${item.price} руб.</p>
                </div>
                <button onclick="removeFromCart(${index})" style="margin-left: auto;">Удалить</button>
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
    window.location.href = 'index.html';
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

// Получаем элементы DOM
const sortSelect = document.getElementById('sort');
const productList = document.getElementById('product-list');
const productCards = Array.from(productList.querySelectorAll('.product'));

function sortProducts(criteria) {
    const sortedCards = productCards.sort((a, b) => {
        if (criteria === 'price') {
            // Сравнение по цене (преобразуем к числу)
            return a.dataset.price - b.dataset.price;
        } else if (criteria === 'name') {
            // Сравнение по названию
            return a.dataset.name.localeCompare(b.dataset.name);
        }
    });

    // Очищаем список товаров и добавляем отсортированные карточки
    productList.innerHTML = '';
    sortedCards.forEach(card => productList.appendChild(card));
}

// Слушатель на изменение сортировки
sortSelect.addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

// Начальная сортировка по цене
sortProducts('price');