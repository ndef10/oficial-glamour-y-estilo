const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnShampoos = document.querySelector('.shampoos');
const btnAcondicionadores = document.querySelector('.acondicionadores');
const btnCremas = document.querySelector('.cremas');
const btnOtros = document.querySelector('.otros');
const contenedorProductos = document.querySelector('.productos');
const comprarBotones = document.querySelectorAll('.comprar-btn');

document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    productos();
    vender();
    suscripcion();
   
 
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);    
}

const observer = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const imagen = entry.target;
            imagen.src = imagen.dataset.src;
            observer.unobserve(imagen);
        }
    }); 
});

imagenes.forEach(imagen=>{   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const productos = () =>{
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto=> productosArreglo = [...productosArreglo,producto]);

    const shampoos = productosArreglo.filter(shampoo=> shampoo.getAttribute('data-producto') === 'shampoo');
    const acondicionadores = productosArreglo.filter(acondicionador => acondicionador.getAttribute('data-producto') === 'acondicionador');
    const cremas = productosArreglo.filter(crema => crema.getAttribute('data-producto') === 'crema');
    const otros = productosArreglo.filter(otro=> otro.getAttribute('data-producto') === 'otro');

    mostrarProductos(shampoos, acondicionadores, cremas, otros, productosArreglo);
}

const mostrarProductos = (shampoos, acondicionadores, cremas, otros, todos) =>{
    btnShampoos.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        shampoos.forEach(shampoo=> contenedorProductos.appendChild(shampoo));
    });

    btnAcondicionadores.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
         acondicionadores.forEach(acondicionador=> contenedorProductos.appendChild(acondicionador));
    });

    btnCremas.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        cremas.forEach(crema=> contenedorProductos.appendChild(crema));
    });
    btnOtros.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        otros.forEach(otro=> contenedorProductos.appendChild(otro));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        todos.forEach(todo=> contenedorProductos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

const vender =() => {
    comprarBotones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
          const producto = boton.closest('.producto');
          const descripcionProducto = producto.querySelector('p').textContent;
          const marcaProducto = producto.querySelector('h2').textContent;
      
          e.preventDefault();
          const mensajeWhatsApp = `¡Hola! Estoy interesada en el producto "${descripcionProducto}" marca "${marcaProducto}".`;
          const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
          window.open(`https://wa.me/56962964710/?text=${mensajeCodificado}`);
        });
    });
}

const btnsCotizar = document.querySelectorAll('.btn-cotizar');
const modalsCotizar = document.querySelectorAll('.modal');
const closeModal = document.getElementById('close-modal');

function showModal(event) {
const index = Array.from(btnsCotizar).indexOf(event.target);
modalsCotizar[index].style.display = 'block';
}

function hideModals() {
modalsCotizar.forEach(function(modal) {
    modal.style.display = 'none';
});
}

btnsCotizar.forEach(function(btn) {
btn.addEventListener('click', showModal);
});

closeModal.addEventListener('click', hideModals);

window.addEventListener('click', function(event) {
if (event.target.classList.contains('modal')) {
    hideModals();
}
});

// contacto

const formulario = document.getElementById('contacto');
const input_nombre = formulario.querySelector('input[name="nombre"]');
const input_apellido = formulario.querySelector('input[name="apellido"]');
const input_correo_contacto = formulario.querySelector('input[name="correo"]');
const input_telefono = formulario.querySelector('input[name="telefono"]');
const input_asunto = formulario.querySelector('input[name="asunto"]');
const textarea_mensaje = formulario.querySelector('textarea[name="mensaje"]');

const errores = (message, input, isError = true) => {
    if(isError) {
        input.classList.add("invalido");
        input.nextElementSibling.classList.add("error");
        input.nextElementSibling.innerText = message;

    }else {
        input.classList.remove("invalido");
        input.nextElementSibling.classList.remove("error");
        input.nextElementSibling.innerText = "";
    }
}

const validarCampos = (message, e) => {
    const input = e.target;
    const inputValue = (e.target.value);
    if(inputValue.trim().length === 0) {
        errores(message, input);

    }else{
        errores("", input, false);    
    }
}

const validarCorreo = (e) => {
    const input = e.target;
    const inputValue = e.target.value;
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/); 
    console.log(regex.test(input.value))
    if(inputValue.trim().length > 5 && !regex.test(input.value)) {
        errores("Correo invalido", input);
        
    }else{
        errores("", input, false);
    }
}

const validarMensaje = (e) => {
    const textarea = e.target;
    const inputValue = textarea.value;
    if (inputValue.trim().length < 2) {
        textarea.classList.add("invalido");
        textarea.nextElementSibling.classList.add("error");
        textarea.nextElementSibling.innerText = "Ingresa un mensaje más largo";
    } else {
        textarea.classList.remove("invalido");
        textarea.nextElementSibling.classList.remove("error");
        textarea.nextElementSibling.innerText = "";
    }
    };

input_nombre.addEventListener('blur', (e) => validarCampos("Nombre es requerido", e));
input_apellido.addEventListener('blur', (e) =>validarCampos("Apellido es requerido", e));
input_correo_contacto.addEventListener('blur', (e) =>validarCampos("Correo es requerido", e));
input_telefono.addEventListener('blur', (e) =>validarCampos("Telefono es requerido", e));
input_asunto.addEventListener('blur', (e) =>validarCampos("Asunto es requerido", e));

textarea_mensaje.addEventListener('input', validarMensaje);

input_correo_contacto.addEventListener('input', validarCorreo);

formulario.addEventListener('submit', function (e) {
    let formularioValido = true; 
    
    validarCampos("Nombre es requerido", { target: input_nombre });
    validarCampos("Apellido es requerido", { target: input_apellido });
    validarCampos("Correo es requerido", { target: input_correo_contacto });
    validarCampos("Teléfono es requerido", { target: input_telefono });
    validarCampos("Asunto es requerido", { target: input_asunto });
    validarCorreo({ target: input_correo_contacto });
    validarMensaje({ target: textarea_mensaje });
    
    if (formulario.querySelector('.invalido')) {
        formularioValido = false;
        e.preventDefault();
        mensaje_contacto.textContent = "El formulario contiene errores. Por favor, verifica los campos.";
        mensaje_contacto.classList.add('error-suscripcion');
    }else {
        const mensaje_contacto = document.getElementById('mensaje_contacto');
        mensaje_contacto.textContent = " ";
        mensaje_contacto.classList.remove('error-suscripcion');
        const nuevoParrafo = document.createElement('p');
        mensaje_contacto.appendChild(nuevoParrafo);
        nuevoParrafo.classList.add('exito');
        nuevoParrafo.textContent = 'Mensaje enviado exitosamente';
    }
});

// suscripcion

function suscripcion() {
    const formulario = document.getElementById('suscripcion');
    const correoInput = formulario.querySelector('input[name="correo_suscripcion"]');
    const nombreSuscripcionInput = formulario.querySelector('input[name="nombre_suscripcion"]');
    const nuevoParrafo = document.createElement('p');
    mensaje_suscripcion.appendChild(nuevoParrafo);

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
      
        if (!nombreSuscripcionInput.value.trim()) {
          const mensaje_suscripcion = document.getElementById('mensaje_suscripcion');
          nuevoParrafo.classList.add('error-suscripcion');
          nombreSuscripcionInput.classList.add("invalido");
          nuevoParrafo.textContent = 'Ingresa tu nombre';
          return; 
        }
      
        const correo = correoInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
          const mensaje_suscripcion = document.getElementById('mensaje_suscripcion');
          nuevoParrafo.classList.add('error-suscripcion');
          correoInput.classList.add("invalido");
          nuevoParrafo.textContent = 'Ingresa un correo válido.';
          return; 
        }
      
        nuevoParrafo.classList.remove('error-suscripcion');
        nombreSuscripcionInput.classList.remove("invalido");
        correoInput.classList.remove("invalido");
        nuevoParrafo.classList.add('exito');
        nuevoParrafo.textContent = 'Bienvenida!!! Gracias por suscribirte';
        formulario.submit();
      });         
}

