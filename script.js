// ==========================================
// 1. MEMORIA DEL CARRITO Y SELECCIÓN DE ELEMENTOS
// ==========================================
let carrito = [];

// Elementos de los botones de productos
const contadorCarrito = document.getElementById('cart-count');
const botonesAgregar = document.querySelectorAll('.add-to-cart');

// Elementos de los íconos del menú superior (Header)
const iconoCarritoMenu = document.getElementById('cart-icon');
const iconoCuentaMenu = document.querySelector('.fa-user')?.parentElement; // Selecciona el enlace del usuario

// ==========================================
// 2. LÓGICA PARA AGREGAR PRODUCTOS AL CARRITO
// ==========================================
botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', (evento) => {
        // Buscamos la tarjeta contenedora del producto específico
        const tarjetaProducto = evento.target.closest('.product-card');
        
        // Extraemos los textos de la tarjeta para saber qué producto es
        const nombreProducto = tarjetaProducto.querySelector('h3').textContent;
        const precioProducto = tarjetaProducto.querySelector('.price').textContent;
        
        // Creamos un objeto con la información limpia del producto
        const productoSeleccionado = {
            nombre: nombreProducto,
            precio: precioProducto
        };
        
        // Agregamos el producto al arreglo del carrito
        carrito.push(productoSeleccionado);
        
        // Actualizamos el contador visual en el header
        if (contadorCarrito) {
            contadorCarrito.textContent = carrito.length;
        }
        
        // Mensajes de prueba en la consola
        console.log("Producto Añadido a FH Basket:", productoSeleccionado);
        console.log("Carrito Actual:", carrito);
        
        // EFECTO VISUAL: Feedback de guardado en el botón
        const iconoOriginal = boton.innerHTML;
        boton.innerHTML = '<i class="fas fa-check"></i>';
        boton.style.background = '#4BB543'; // Fondo Verde
        boton.style.borderColor = '#4BB543';
        boton.style.color = '#ffffff';       // Check Blanco para que resalte
        
        // Regresar el botón a su estado original después de 1 segundo
        setTimeout(() => {
            boton.innerHTML = iconoOriginal;
            boton.style.background = 'transparent'; 
            boton.style.borderColor = '#ff4500';
            boton.style.color = ''; // Restaura el color de texto original (naranja/rojo)
        }, 1000);
    });
});

// ==========================================
// 3. NUEVA FUNCIÓN: INTERACCIÓN DEL CARRITO (🛒)
// ==========================================
if (iconoCarritoMenu) {
    iconoCarritoMenu.addEventListener('click', (evento) => {
        evento.preventDefault(); // Evita que la página se mueva o recargue
        
        if (carrito.length === 0) {
            alert("🛒 Tu carrito de FH Basket está vacío.\n¡Añade algunos tenis, gorras o medias para empezar!");
        } else {
            // Creamos la lista de productos formato texto uno por uno
            let listaProductos = "";
            let sumaTotal = 0;

            carrito.forEach((producto, indice) => {
                listaProductos += `${indice + 1}. ${producto.nombre} - ${producto.precio}\n`;
                
                // Limpiamos el texto del precio (quitamos el '$' y comas) para poder sumarlo numéricamente
                let precioLimpio = parseFloat(producto.precio.replace('$', '').replace(',', ''));
                if (!isNaN(precioLimpio)) {
                    sumaTotal += precioLimpio;
                }
            });

            // Mostramos el desglose completo y el total acumulado en una alerta limpia
            alert(
                `🛒 FH BASKET - DETALLE DE TU COMPRA:\n\n` +
                `${listaProductos}\n` +
                `-----------------------------------------\n` +
                `💰 TOTAL ESTIMADO: $${sumaTotal.toFixed(2)}\n\n` +
                `¡Todo listo! En la siguiente fase conectaremos esto para procesar tu pago.`
            );
        }
    });
}

// ==========================================
// 4. NUEVA FUNCIÓN: INTERACCIÓN DE LA CUENTA (👤)
// ==========================================
if (iconoCuentaMenu) {
    iconoCuentaMenu.addEventListener('click', (evento) => {
        evento.preventDefault(); // Evita que la página se recargue
        
        // Simulación del estado del perfil del cliente
        alert(
            `👤 MI CUENTA - FH BASKET\n\n` +
            `¡Bienvenido a tu panel de control!\n` +
            `• Estado: Invitado de Pruebas\n` +
            `• Historial de pedidos: 0 compras activas\n\n` +
            `Próximamente: Aquí podrás iniciar sesión, registrarte y guardar tus direcciones de envío.`
        );
    });
}