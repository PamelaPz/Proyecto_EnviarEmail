//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListernes();

function eventListernes() {
    //Cuadno la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

//Funciones

function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

//Valida Formulario
function validarFormulario(e) {
    // console.log(e.target.type);
    const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (e.target.value.length > 0) {

        //Elimina los errores
        const error = document.querySelector('p.error');
        if(error) {
            error.remove(); 
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }


    if (e.target.type === 'email' ) {

        if ( er.test(e.target.value) ) {
            const error = document.querySelector('p.error');
            if(error) {
                error.remove(); 
            }
    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }
    }

    if( er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disable = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault();
    
    // Mostrar el spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //setInterval --> se ejecuta cada siento tiempo
    //setTimeout --> se ejecuta después de 3 segundos 
    setTimeout( () => {
        //ocultar spinner y mostrar mensaje.
        spinner.style.display = 'none';

        //Mensaje
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió exisotamente!';
        parrafo.classList.add('text-center', 'my-10', 'bg-green-500', 'p-2', 'text-white', 'font-bold')

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); //Elimina el mensaje depués de 5 segundos
            resetearFormulario();
        }, 4000);

    }, 3000);
}


//Function que resetea el formulario
function resetearFormulario() {
    formulario.reset();
    const error = document.querySelector('p.error');
    if(error) {
        error.remove(); 
    }

    iniciarApp();

}