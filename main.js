// Recuperar datos del localStorage al cargar la página
let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
let preciototalGuardado = parseInt(localStorage.getItem('preciototal')) || 0;

// Restaurar los valores en caso de recarga
let carrito = carritoGuardado;
let preciototal = preciototalGuardado;

class Container {
    constructor(id, tipo, modelo, precio, stock) {
        this.id = id;
        this.tipo = tipo
        this.modelo = modelo;
        this.precio = precio;
        this.stock = stock;
    }
}

let producto1 = new Container(1, "Contenedor", "20 pies", 2500, 5)
let producto2 = new Container(2, "Contenedor", "30 pies", 3500, 8)
let producto3 = new Container(3, "Contenedor", "40 pies", 5000, 25)
let producto4 = new Container(4, "Casa", "15 m2", 15000, 7);
let producto5 = new Container(5, "Casa", "30 m2", 25000, 15);
let producto6 = new Container(6, "Casa", "45 m2", 32000, 2);
let producto7 = new Container(7, "Casa", "50 m2", 36000, 8);
let producto8 = new Container(8, "Casa", "60 m2", 40000, 10);

let productos = [producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8]

let stockProducto1 = document.getElementById('contenedorsimple_20pies');
contenedorsimple_20pies.innerText = `Stock: ${producto1.stock}`;
let stockProducto2 = document.getElementById('contenedorsimple_30pies');
contenedorsimple_30pies.innerText = `Stock: ${producto2.stock}`;
let stockProducto3 = document.getElementById('contenedorsimple_40pies');
contenedorsimple_40pies.innerText = `Stock: ${producto3.stock}`;
let stockProducto4 = document.getElementById('contenedorcasa_15m2');
contenedorcasa_15m2.innerText = `Stock: ${producto4.stock}`;
let stockProducto5 = document.getElementById('contenedorcasa_30m2');
contenedorcasa_30m2.innerText = `Stock: ${producto5.stock}`;
let stockProducto6 = document.getElementById('contenedorcasa_45m2');
contenedorcasa_45m2.innerText = `Stock: ${producto6.stock}`;
let stockProducto7 = document.getElementById('contenedorcasa_50m2');
contenedorcasa_50m2.innerText = `Stock: ${producto7.stock}`;
let stockProducto8 = document.getElementById('contenedorcasa_60m2');
contenedorcasa_60m2.innerText = `Stock: ${producto8.stock}`;


function Agregaralcarrito(producto) {
    if (producto.stock <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'No hay más stock de este producto.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    carrito.push(producto);
    producto.stock--;
    contenedorsimple_20pies.innerText = `Stock: ${producto1.stock}`;
    contenedorsimple_30pies.innerText = `Stock: ${producto2.stock}`;
    contenedorsimple_40pies.innerText = `Stock: ${producto3.stock}`;
    contenedorcasa_15m2.innerText = `Stock: ${producto4.stock}`;
    contenedorcasa_30m2.innerText = `Stock: ${producto5.stock}`;
    contenedorcasa_45m2.innerText = `Stock: ${producto6.stock}`;
    contenedorcasa_50m2.innerText = `Stock: ${producto7.stock}`;
    contenedorcasa_60m2.innerText = `Stock: ${producto8.stock}`;
    preciototal += producto.precio;
    console.table(carrito);
    console.log('Precio total: $', preciototal);
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    Toast.fire({
        icon: 'success',
        title: 'Agregado al carrito'
    });

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('preciototal', preciototal);
}


//BOTONES CARRITO
let boton1 = document.getElementById('botoncarrito20pies');
boton1.addEventListener('click', function() {
    Agregaralcarrito(producto1);
});
let boton2 = document.getElementById('botoncarrito30pies');
boton2.addEventListener('click', function() {
    Agregaralcarrito(producto2);
});
let boton3 = document.getElementById('botoncarrito40pies');
boton3.addEventListener('click', function() {
    Agregaralcarrito(producto3);
});
let boton4 = document.getElementById('botoncarrito15m2');
boton4.addEventListener('click', function() {
    Agregaralcarrito(producto4);
});
let boton5 = document.getElementById('botoncarrito30m2');
boton5.addEventListener('click', function() {
    Agregaralcarrito(producto5);
});
let boton6 = document.getElementById('botoncarrito45m2');
boton6.addEventListener('click', function() {
    Agregaralcarrito(producto6);
});
let boton7 = document.getElementById('botoncarrito50m2');
boton7.addEventListener('click', function() {
    Agregaralcarrito(producto7);
});
let boton8 = document.getElementById('botoncarrito60m2');
boton8.addEventListener('click', function() {
    Agregaralcarrito(producto8);
});

//agregar el boton carrito del header
let boton9 = document.getElementById('header__button__carrito');
boton9.addEventListener('click',mostrarAlerta)

function mostrarAlerta() {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'VACÍO',
            text: 'El carrito está vacío. Agrega productos para continuar.',
            icon: 'info',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    let mensaje = "";
    for (let producto of carrito) {
        mensaje += `${producto.tipo} ${producto.modelo}
        <button class="btn btn-danger btn-sm custom-delete-btn" id="eliminar-${producto.id}" onclick="eliminarProducto(${producto.id})">
            X
        </button><br>`;
    }
    mensaje += `<br>Total: U$D ${preciototal}`;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Productos en carrito:',
        html: mensaje,
        icon: 'warning',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Realizar pago!',
        cancelButtonText: 'Cancelar compra' ,
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Compra exitosa.',
                '',
                'success'
            );
           
            for (let producto of carrito) {
                producto.stock--;  
            }
            carrito = [];
            preciototal = 0;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Compra cancelada.',
                '',
                'error'
            );
            for (let producto of carrito) {
                producto.stock++; 
                contenedorsimple_20pies.innerText = `Stock: ${producto1.stock}`;
                contenedorsimple_30pies.innerText = `Stock: ${producto2.stock}`;
                contenedorsimple_40pies.innerText = `Stock: ${producto3.stock}`;
                contenedorcasa_15m2.innerText = `Stock: ${producto4.stock}`;
                contenedorcasa_30m2.innerText = `Stock: ${producto5.stock}`;
                contenedorcasa_45m2.innerText = `Stock: ${producto6.stock}`;
                contenedorcasa_50m2.innerText = `Stock: ${producto7.stock}`;
                contenedorcasa_60m2.innerText = `Stock: ${producto8.stock}`;    
            }
            carrito = [];
            preciototal = 0;
        }
    });
}

//BOTON para desplazar hacia arriba
const irArribaBtn = document.getElementById('irArribaBtn');

irArribaBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mostrar u ocultar el botón según el desplazamiento
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        irArribaBtn.style.display = 'block';
    } else {
        irArribaBtn.style.display = 'none';
    }
});

function eliminarProducto(id) {
    const productoIndex = carrito.findIndex(producto => producto.id === id);
    if (productoIndex !== -1) {
        const productoEliminado = carrito.splice(productoIndex, 1)[0];
        preciototal -= productoEliminado.precio;
        
        // Incrementa el stock del producto eliminado (si es necesario)
        const productoOriginal = productos.find(producto => producto.id === id);
        if (productoOriginal) {
            productoOriginal.stock++;
        }
        
        // Actualiza la vista del carrito y los valores
        actualizarVistaCarrito();
        
        // Guarda los cambios en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem('preciototal', preciototal);
    }
}

function actualizarVistaCarrito() {
    // Actualiza los elementos de stock en la vista
    contenedorsimple_20pies.innerText = `Stock: ${producto1.stock}`;
    contenedorsimple_30pies.innerText = `Stock: ${producto2.stock}`;
    // Repite para otros productos...
    
    // Actualiza el total en la vista
    console.log('Precio total: $', preciototal);
    
    // Llama a mostrarAlerta para refrescar el mensaje en la vista
    mostrarAlerta();
}

//Asincronía 

const boton = document.getElementById("boton")
const popup = document.getElementById("popup-mensaje")

boton.addEventListener("click", ()=>{
    popup.classList.add("popup-active")

    setTimeout(()=>{
        popup.classList.remove("popup-active")
    },3500)
})

//FETCH
fetch("https://dolarapi.com/v1/dolares")
fetch("https://dolarapi.com/v1/dolares")
.then(response => response.json())
.then(data => {
    const dolarContainer = document.getElementById('dolarContainer');

    data.forEach(item => {
        const dolarElement = document.createElement('p');
        const compraText = `Compra: ${item.compra}`;
        const ventaText = `Venta: ${item.venta}`;
        const casaText = `Casa: ${item.casa}`;
        const nombreText = `Nombre: ${item.nombre}`;
        const fechaText = `Fecha de Actualización: ${item.fechaActualizacion}`;
        
        dolarElement.innerHTML = `${nombreText}<br>${compraText}, ${ventaText}<br>${fechaText}`;
        dolarContainer.appendChild(dolarElement);
    });
})
.catch(error => {
    console.error('Hay un error:', error);
});
