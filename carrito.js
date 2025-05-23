document.addEventListener('DOMContentLoaded', () => {
    const carritoItems = document.getElementById('carrito-items');
    const carritoTotal = document.getElementById('carrito-total');

    function mostrarCarrito() {
        const productos = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoItems.innerHTML = '';

        if (productos.length === 0) {
            carritoItems.innerHTML = '<p>No hay productos en el carrito.</p>';
            carritoTotal.textContent = '0';
            return;
        }

        let total = 0;

        productos.forEach((producto, index) => {
            total += producto.precio;

            const item = document.createElement('div');
            item.classList.add('carrito-item');
            item.innerHTML = `
                <p>${producto.nombre} - $${producto.precio}</p>
                <button class="eliminar-producto" data-index="${index}">🗑️ Eliminar</button>
            `;
            carritoItems.appendChild(item);
        });

        carritoTotal.textContent = total;
    }

    carritoItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-producto')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            let productos = JSON.parse(localStorage.getItem('carrito')) || [];
            productos.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(productos));
            mostrarCarrito();
        }
    });

    mostrarCarrito();
});
// Botón para vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    if (confirm('¿Estás segura de que quieres vaciar el carrito?')) {
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
});

// Botón para confirmar pedido
document.getElementById('confirmar-pedido').addEventListener('click', () => {
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];
    if (productos.length === 0) {
        alert('Tu carrito está vacío.');
    } else {
        alert('¡Gracias por tu pedido! Pronto nos pondremos en contacto contigo.');
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }
});
