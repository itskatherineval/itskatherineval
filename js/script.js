//TOP BAR

let topBarIndex = 0;

function TopBar() {
    let i;
    let slides = document.getElementsByClassName("mensajeSuperior");

    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }

    topBarIndex++;
    if(topBarIndex > slides.length) {topBarIndex = 1}
    slides[topBarIndex-1].style.display = "block";
    setTimeout(TopBar,2500);
}

TopBar();


//FECTH PRODUCTOS

let productos = [];

fetch("js/productos.json")
    .then (response => response.json())
    .then (data =>{
        productos = data;
        cargarProductos(productos)
    })

//MOSTRAR PRODUCTOS

let botonesAgregar = document.querySelectorAll(".btn_addtocart");
const cantidad = document.querySelector("#Cantidad")
const contenedorGeneral = document.querySelector("#contenedor_productos")


function cargarProductos (productosElegidos){

    contenedorGeneral.innerHTML ="";

    productosElegidos.forEach((producto) =>{
        let contenedor = document.createElement("div")
        contenedor.innerHTML= 
        `<div class="grid-espacio"> 
            <div class="producto" id="${producto.categoria}">
                <img src=${producto.img} alt="" class="w-100 rounded scale1 pb-3 pt-5"></a>
                <div>
                    <Span class="product_title">${producto.nombre}</Span>
                    <p class="product_price"> S/ ${producto.precio}.00</p>
                    <button class="btn_addtocart" id=${producto.id} data-bs-toggle="modal" data-bs-target="#modalCarrito">Agregar al carrito</button>
                </div>
            </div>    
         </div>`
        contenedorGeneral.appendChild(contenedor)        
    })

    actualizarBotonesAgregar()
}

//NAVBAR - BOTONES CATEGORIA

const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal =document.querySelector(("#titulo-principal"))

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active")

        if(e.currentTarget.id !== "todos"){
            const productoCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            tituloPrincipal.innerText= productoCategoria.categoria;
            const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id)
           
            cargarProductos(productosBoton);

        }else{
            tituloPrincipal.innerHTML= `Productos para un <b>#CoffeeLover</b></h1>`
            cargarProductos(productos);
        }
    });
})

//SLIDER BOTÓN

const botonesSlider = document.querySelectorAll(".boton-ver-productos")

botonesSlider.forEach(boton =>{
    boton.addEventListener("click", (e)=>{
        if(e.currentTarget.id === "btn-cafes-de-especialidad"){
            const botonCafes = productos.find(producto => producto.categoria === "Cafés de especialidad");
            tituloPrincipal.innerText= botonCafes.categoria;

            const cafesBotonSlider = productos.filter(producto => producto.categoria === "Cafés de especialidad")
            cargarProductos(cafesBotonSlider);

        } else if(e.currentTarget.id === "btn-maquinas"){
            const botonMaquinas = productos.find(producto => producto.categoria === "Máquinas");
            tituloPrincipal.innerText= botonMaquinas.categoria;

            const maquinasBotonSlider = productos.filter(producto => producto.categoria === "Máquinas")
            cargarProductos(maquinasBotonSlider);
        } else{
            tituloPrincipal.innerHTML= `Productos para un <b>#CoffeeLover</b></h1>`
            cargarProductos(productos);
        }
    })
})


//BOTON AGREGAR AL CARRITO
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".btn_addtocart")
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito);
    })
}

//LLAMANDO AL LOCAL STORAGE

let productosEnCarrito;
const productosEnCarritoLS = localStorage.getItem("productosEnCarrito");

if(productosEnCarritoLS ){
    productosEnCarrito=JSON.parse(productosEnCarritoLS);
    actualizarCantidad();
}else{
    productosEnCarrito= []
}


//AGREGAR AL CARRITO
function agregarAlCarrito(e){
    const idBotonAgregar = e.currentTarget.id;
    const productoAgregado = productos.find((producto) => producto.id === idBotonAgregar);

    if(productosEnCarrito.some ((producto) => producto.id === idBotonAgregar)){
        const index = productosEnCarrito.findIndex((producto) => producto.id === idBotonAgregar);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarCantidad();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
}

//ACTUALIZAR LA CANTIDAD DE PRODUCTOS
function actualizarCantidad(){
    let nuevaCantidad =  productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0);
    cantidad.innerText = nuevaCantidad;
}

//FOOTER

const form = document.querySelector("#formulario");
const email = document.querySelector("#email");

form.addEventListener("submit",validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    if(email.value.length > 0){
        Swal.fire({
            title: "¡Gracias por registrarte!",
            text: "Te avisaremos de las novedades en The Coffee Shop",
            icon: "success",
            confirmButtonColor: "#552901",
            confirmButtonText: "Volver"
          })
    } 
    form.reset()

}







