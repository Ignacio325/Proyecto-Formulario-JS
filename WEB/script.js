const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

// 1. Expresión regular para validación de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 2. Función para mostrar/ocultar errores
const setFieldError = (id, message, isError) => {
    const errorSpan = document.getElementById(`error-${id}`);
    const inputField = document.getElementById(id);
    
    if (isError) {
        errorSpan.textContent = message;
        errorSpan.style.display = 'block';
        inputField.parentElement.classList.add('invalid');
    } else {
        errorSpan.style.display = 'none';
        inputField.parentElement.classList.remove('invalid');
    }
};


form.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('blur', () => validateField(element));
});

function validateField(field) {
    let isValid = true;
    
    // Verificación de campos obligatorios
    if (field.value.trim() === "") {
        setFieldError(field.id, "Este campo es obligatorio", true);
        isValid = false;
    } 
    // Validación de formato para el correo con RegExp
    else if (field.id === 'email' && !emailRegex.test(field.value)) {
        setFieldError(field.id, "Ingresa un correo electrónico válido", true);
        isValid = false;
    } 
    else {
        setFieldError(field.id, "", false);
    }
    return isValid;
}


const enviarDatos = (datos) => {
    return new Promise((resolve, reject) => {
        statusMessage.textContent = "Enviando datos...";
        statusMessage.style.color = "blue";

        setTimeout(() => {
            // Simulación de posibilidad de error (30% de probabilidad de fallo)
            const exito = Math.random() > 0.3;
            if (exito) {
                resolve("¡Formulario enviado con éxito!");
            } else {
                reject("Error de conexión: No se pudo contactar con el servidor.");
            }
        }, 2000);
    });
};

// 5. Manejo del evento Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let formValido = true;
    form.querySelectorAll('input, textarea').forEach(field => {
        if (!validateField(field)) formValido = false;
    });

    if (formValido) {
        const formData = {
            nombre: form.nombre.value,
            email: form.email.value,
            mensaje: form.mensaje.value
        };

        try {
            const respuesta = await enviarDatos(formData);
            statusMessage.textContent = respuesta;
            statusMessage.style.color = "green";
            form.reset(); // Limpiar formulario tras éxito
        } catch (error) {
            statusMessage.textContent = error;
            statusMessage.style.color = "red";
        }
    } else {
        statusMessage.textContent = "Por favor, corrige los errores antes de enviar.";
        statusMessage.style.color = "red";
    }
});