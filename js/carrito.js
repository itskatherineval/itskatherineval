
//CARRITO

let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorResumenCompra =document.querySelector("#carrito-resumen-compra");
let botonEliminar = document.querySelector(".carrito-eliminar-producto");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#btn-comprar");


function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorResumenCompra.classList.remove("disabled");

    
        contenedorCarritoProductos.innerHTML ="";
    
        productosEnCarrito.forEach((producto) =>{
            let contenedorCarritoProducto = document.createElement("div")
            contenedorCarritoProducto.innerHTML= 
            `<div id="carrito-producto" class="carrito-producto">
                <div><img src=${producto.img} class="carrito-producto-imagen"></div>
                <div>
                    <small class="carrito-producto-small">Producto</small>
                    <p class="carrito-producto-p">${producto.nombre}</p>
                </div>
                <div>
                    <small class="carrito-producto-small">Cantidad</small>
                    <p class="carrito-producto-p">${producto.cantidad}</p>
                </div>
                <div>
                    <small class="carrito-producto-small">Subtotal</small>
                    <p class="carrito-producto-p">S/ ${producto.precio*producto.cantidad}.00</p>
                </div>
                <div id=${producto.id} class="carrito-eliminar-producto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </div>
            </div>`
    
            contenedorCarritoProductos.appendChild(contenedorCarritoProducto) 
    })
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorResumenCompra.classList.add("disabled");
    }    
    actualizarBotonEliminar()
    actualizarTotal()

}

cargarProductosCarrito()


//ACTUALIZAR LA CANTIDAD DE PRODUCTOS

const cantidad = document.querySelector("#Cantidad")

function actualizarCantidad(){
    let nuevaCantidad =  productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0);
    cantidad.innerText = nuevaCantidad;}

actualizarCantidad()

//BOTON ELIMINAR PRODUCTO

function actualizarBotonEliminar(){
    botonEliminar = document.querySelectorAll(".carrito-eliminar-producto")
    
    botonEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito(e){
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#552901",
        cancelButtonColor: "#cfaa8b",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
            actualizarCantidad()
        }
      });

    const idBotonEliminar = e.currentTarget.id;
    const index = productosEnCarrito.findIndex((producto) => producto.id === idBotonEliminar);
    productosEnCarrito.splice(index, 1);

}

//ACTUALIZAR TOTAL

function actualizarTotal(){
    const nuevoTotal = productosEnCarrito.reduce((acc,producto) => acc +(producto.precio*producto.cantidad),0);
    total.innerText= `S/ ${nuevoTotal}.00`
}


//ACCIÓN COMPRAR

botonComprar.addEventListener("click", ComprarCarrito)
function ComprarCarrito(){
    productosEnCarrito.length=0;
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorResumenCompra.classList.add("disabled");

    actualizarCantidad()
}

