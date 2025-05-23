
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.agregar-carrito');

    botones.forEach(boton => {
        boton.addEventListener('click', e => {
            e.preventDefault();
            const nombre = boton.getAttribute('data-nombre');
            const precio = parseFloat(boton.getAttribute('data-precio'));

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            carrito.push({ nombre, precio });

            localStorage.setItem('carrito', JSON.stringify(carrito));

            alert(`${nombre} agregado al carrito.`);
        });
    });
});

