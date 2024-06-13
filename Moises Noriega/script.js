document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu li a");
    const hoverSound = new Audio('sounds/hover-sound.mp3');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
});

let cart = [];

function addToCart(name, price, image) {
    const product = { name, price, image };
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        const span = document.createElement('span');
        span.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => {
            cart = cart.filter(cartItem => cartItem !== item);
            updateCart();
        };
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
        total += item.price;
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function checkout() {
    alert('Compra finalizada!');
    cart = [];
    updateCart();
}

document.addEventListener('DOMContentLoaded', function () {
    const cart = document.querySelector('.cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    function addToCart(name, price, img) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${img}" alt="${name}">
            <span>${name}</span>
            <span>$${price.toFixed(2)}</span>
            <button onclick="removeFromCart(this, ${price})">Eliminar</button>
        `;
        cartItems.appendChild(li);
        updateTotal(price);
    }

    function removeFromCart(button, price) {
        const li = button.parentElement;
        li.remove();
        updateTotal(-price);
    }

    function updateTotal(amount) {
        const currentTotal = parseFloat(cartTotal.innerText);
        const newTotal = currentTotal + amount;
        cartTotal.innerText = newTotal.toFixed(2);
    }

    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.checkout = function () {
        alert('Compra realizada con éxito!');
        cartItems.innerHTML = '';
        cartTotal.innerText = '0.00';
    };
});
