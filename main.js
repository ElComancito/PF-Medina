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
let carrito = [];
let preciototal = 0;

//stock de productos 

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

    carritoGuardado.push(producto);
    producto.stock--;
    contenedorsimple_20pies.innerText = `Stock: ${producto1.stock}`;
    contenedorsimple_30pies.innerText = `Stock: ${producto2.stock}`;
    contenedorsimple_40pies.innerText = `Stock: ${producto3.stock}`;
    contenedorcasa_15m2.innerText = `Stock: ${producto4.stock}`;
    contenedorcasa_30m2.innerText = `Stock: ${producto5.stock}`;
    contenedorcasa_45m2.innerText = `Stock: ${producto6.stock}`;
    contenedorcasa_50m2.innerText = `Stock: ${producto7.stock}`;
    contenedorcasa_60m2.innerText = `Stock: ${producto8.stock}`;
    precioTotalGuardado += producto.precio;
    console.table(carritoGuardado);
    console.log('Precio total: $', precioTotalGuardado);
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
    if (carritoGuardado.length === 0) {
        Swal.fire({
            title: 'VACÍO',
            text: 'El carrito está vacío. Agrega productos para continuar.',
            icon: 'info',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

    let mensaje = "";
    for (let producto of carritoGuardado) {
        mensaje += `${producto.tipo} ${producto.modelo}<br>`;
    }
    mensaje += `<br>Total: $${precioTotalGuardado}`;

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
           
            for (let producto of carritoGuardado) {
                producto.stock--;  
            }
            carritoGuardado = [];
            precioTotalGuardado = 0;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Compra cancelada.',
                '',
                'error'
            );

            // Devolver el stock y vaciar el carrito
            for (let producto of carritoGuardado) {
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
            carritoGuardado = [];
            precioTotalGuardado = 0;
        }
    });
}

//JSON Y LOCALSTORAGE

// Guardar productos en localStorage
localStorage.setItem('productos', JSON.stringify(productos));

// Recuperar productos de localStorage
let productosGuardados = JSON.parse(localStorage.getItem('productos'));
// Guardar carrito en localStorage
localStorage.setItem('carrito', JSON.stringify(carrito));

// Guardar precio total en localStorage
localStorage.setItem('preciototal', preciototal);

// Recuperar carrito y precio total desde localStorage
let carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
let precioTotalGuardado = parseFloat(localStorage.getItem('preciototal')) || 0;


// FORMULARIO de Naim
const form = document.querySelector('.form');
const inputs = form.querySelectorAll('.input');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = {};
  let nombre = '';
  inputs.forEach(input => {
    formData[input.getAttribute('placeholder')] = input.value;
    const placeholder = input.getAttribute('placeholder');
    const value = input.value.trim();
    if (placeholder === 'Nombre') {
      nombre = value;
    } 
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: alertMessage,
      showConfirmButton: false,
      timer: 3000,
    });
    localStorage.setItem('formData', JSON.stringify(formData));
    form.reset()
  });


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
});})
