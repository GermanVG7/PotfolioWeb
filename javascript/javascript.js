/* ====================================
   JAVASCRIPT - Portfolio Interactivo
   ==================================== */

/**
 * ANIMACIÓN DE APARICIÓN DE PROYECTOS AL HACER SCROLL
 * Esta función detecta cuando los artículos de proyectos entran en el viewport
 * y les añade la clase 'visible' para activar la animación CSS
 */
function revealProjectsOnScroll() {
    const articles = document.querySelectorAll('.sec-proyectos article'); // Seleccionar todos los artículos
    const windowHeight = window.innerHeight; // Obtener altura de la ventana
    
    articles.forEach(article => {
        const rect = article.getBoundingClientRect(); // Obtener posición del elemento
        // Si el elemento está a 60px de ser visible, activar animación
        if (rect.top < windowHeight - 60) {
            article.classList.add('visible'); // Añadir clase para animación CSS
        }
    });
}

// Ejecutar la función al hacer scroll y al cargar la página
window.addEventListener('scroll', revealProjectsOnScroll);
window.addEventListener('DOMContentLoaded', revealProjectsOnScroll);

/**
 * ANIMACIÓN DE ENTRADA SUAVE PARA ELEMENTOS
 * Función genérica que aplica una animación de fade-in con desplazamiento vertical
 * @param {string} selector - Selector CSS del elemento a animar
 * @param {number} delay - Retraso en milisegundos antes de iniciar la animación
 */
function fadeInOnLoad(selector, delay = 0) {
    const el = document.querySelector(selector); // Seleccionar elemento
    if (el) {
        // Estado inicial: invisible y desplazado hacia abajo
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        
        // Aplicar animación después del delay especificado
        setTimeout(() => {
            // Definir transición suave con cubic-bezier personalizado
            el.style.transition = 'opacity 1.2s cubic-bezier(.77,.2,.32,1.01), transform 1.2s cubic-bezier(.77,.2,.32,1.01)';
            // Estado final: visible y en posición normal
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, delay);
    }
}

// Ejecutar animaciones al cargar la página con delays escalonados
window.addEventListener('DOMContentLoaded', function() {
    fadeInOnLoad('aside', 100);        // Sidebar a los 100ms
    fadeInOnLoad('.presentacion', 300); // Presentación a los 300ms
});

/**
 * ANIMACIÓN DE FONDO: RED DE PUNTOS CONECTADOS
 * Crea un canvas de fondo con puntos animados que se conectan entre sí
 * cuando están cerca, creando un efecto de red dinámica
 */
(function createNetworkBg() {
    // Crear y configurar el canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'network-bg';
    canvas.style.position = 'fixed';     // Posición fija para cubrir toda la pantalla
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';        // Ancho completo de viewport
    canvas.style.height = '100vh';       // Alto completo de viewport
    canvas.style.zIndex = '0';           // Detrás de todo el contenido
    canvas.style.pointerEvents = 'none'; // No interferir con interacciones
    canvas.style.opacity = '0.18';       // Opacidad sutil para no distraer
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    /**
     * Función para redimensionar el canvas cuando cambia el tamaño de ventana
     */
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize(); // Llamar inicialmente
    
    // Configuración de la animación
    const POINTS = 32; // Número de puntos en la red
    let nodes = [];
    
    // Crear puntos con posiciones y velocidades aleatorias
    for (let i = 0; i < POINTS; i++) {
        nodes.push({
            x: Math.random() * width,          // Posición X aleatoria
            y: Math.random() * height,         // Posición Y aleatoria
            vx: (Math.random() - 0.5) * 0.18,  // Velocidad X (lenta)
            vy: (Math.random() - 0.5) * 0.18   // Velocidad Y (lenta)
        });
    }
    
    /**
     * Función principal de dibujo que se ejecuta en cada frame
     */
    function draw() {
        ctx.clearRect(0, 0, width, height); // Limpiar canvas
        
        // Dibujar líneas entre puntos cercanos
        for (let i = 0; i < POINTS; i++) {
            for (let j = i + 1; j < POINTS; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy); // Calcular distancia
                
                // Si los puntos están cerca, dibujar línea
                if (dist < 180) {
                    ctx.save();
                    ctx.globalAlpha = 0.22;          // Transparencia de línea
                    ctx.strokeStyle = '#60A5FA';     // Color azul claro
                    ctx.lineWidth = 1.2;             // Grosor de línea
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        
        // Dibujar y mover puntos
        for (let n of nodes) {
            ctx.save();
            ctx.globalAlpha = 0.65;              // Puntos más visibles que las líneas
            ctx.beginPath();
            ctx.arc(n.x, n.y, 6.5, 0, 2 * Math.PI); // Círculo grande
            ctx.fillStyle = '#60A5FA';           // Color azul claro
            ctx.fill();
            ctx.restore();
            
            // Actualizar posición
            n.x += n.vx;
            n.y += n.vy;
            
            // Rebotar en los bordes
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        
        requestAnimationFrame(draw); // Continuar animación
    }
    
    draw(); // Iniciar animación
})();

/**
 * ANIMACIÓN PULSE EN BOTÓN CV AL FINAL DE PÁGINA
 * Activa una animación de pulso en el botón de descarga de CV 
 * cuando el usuario se acerca al final de la página
 */
window.addEventListener('scroll', function() {
    const btn = document.querySelector('.cv-download-btn');
    if (!btn) return; // Si no existe el botón, salir
    
    // Obtener posiciones de scroll
    const scrollY = window.scrollY || window.pageYOffset; // Posición actual de scroll
    const windowH = window.innerHeight;                   // Altura de la ventana
    const docH = document.body.scrollHeight;              // Altura total del documento
    
    // Si estamos cerca del final (dentro de 12px), activar animación
    if (scrollY + windowH >= docH - 12) {
        btn.classList.add('pulse-cv');  // Añadir clase de animación
    } else {
        btn.classList.remove('pulse-cv'); // Quitar clase de animación
    }
});

/**
 * ANIMACIÓN DE FOTO DE PERFIL
 * Aplica un efecto de escala y rotación sutil a la foto de perfil
 * cuando el usuario pasa el mouse por encima
 */
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    // Evento al entrar con el mouse
    profilePhoto.addEventListener('mouseenter', () => {
        // Transición suave con easing personalizado
        profilePhoto.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
        // Escalar ligeramente y rotar 6 grados
        profilePhoto.style.transform = 'scale(1.08) rotate(6deg)';
        // Añadir sombra azul sutil
        profilePhoto.style.boxShadow = '0 8px 32px rgba(59,130,246,0.18)';
    });
    
    // Evento al salir con el mouse
    profilePhoto.addEventListener('mouseleave', () => {
        // Volver al estado original
        profilePhoto.style.transform = 'scale(1) rotate(0deg)';
        profilePhoto.style.boxShadow = ''; // Quitar sombra
    });
}

/**
 * SISTEMA DE NOMBRES DE TECNOLOGÍAS
 * Muestra el nombre de cada tecnología en un contenedor fijo
 * cuando el usuario pasa el mouse sobre los iconos
 */
const techIcons = document.querySelectorAll('.tech-icon img');
const techNameFixed = document.querySelector('.tech-name-fixed');

techIcons.forEach(icon => {
    // Al entrar con el mouse, mostrar nombre de la tecnología
    icon.addEventListener('mouseenter', () => {
        if (techNameFixed) {
            // Obtener el nombre desde el atributo data-name
            techNameFixed.textContent = icon.getAttribute('data-name');
        }
    });
    
    // Al salir con el mouse, limpiar el contenedor
    icon.addEventListener('mouseleave', () => {
        if (techNameFixed) {
            techNameFixed.textContent = ''; // Limpiar texto
        }
    });
});

/**
 * VALIDACIÓN AVANZADA DEL FORMULARIO DE CONTACTO
 * Sistema completo de validación con mensajes de error personalizados,
 * resaltado visual de campos incorrectos y animaciones suaves
 */
const contactForm = document.querySelector('form');
if (contactForm) {
    // Desactivar validación HTML5 para usar solo la personalizada
    contactForm.setAttribute('novalidate', 'novalidate');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir envío por defecto
        
        // Variables de control
        let valid = true;
        let errorMsgs = [];
        
        // Obtener referencias a los campos
        const nombre = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const mensaje = contactForm.querySelector('textarea[name="message"]');
        
        // Limpiar estados de error previos
        if (nombre) nombre.classList.remove('input-error');
        if (email) email.classList.remove('input-error');
        if (mensaje) mensaje.classList.remove('input-error');
        
        // VALIDACIÓN DEL NOMBRE
        if (!nombre || nombre.value.trim().length < 3) {
            valid = false;
            errorMsgs.push('El nombre debe tener al menos 3 caracteres.');
            if (nombre) nombre.classList.add('input-error'); // Resaltar campo con error
        }
        
        // VALIDACIÓN DEL EMAIL
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón básico de email
        if (!email || !emailRegex.test(email.value.trim())) {
            valid = false;
            errorMsgs.push('Introduce un email válido.');
            if (email) email.classList.add('input-error'); // Resaltar campo con error
        }
        
        // VALIDACIÓN DEL MENSAJE
        if (!mensaje || mensaje.value.trim().length < 10) {
            valid = false;
            errorMsgs.push('El mensaje debe tener al menos 10 caracteres.');
            if (mensaje) mensaje.classList.add('input-error'); // Resaltar campo con error
        }
        
        // MOSTRAR RESULTADO DE VALIDACIÓN
        let msg = contactForm.querySelector('.form-message');
        if (!msg) {
            // Crear contenedor de mensaje si no existe
            msg = document.createElement('div');
            msg.className = 'form-message';
            contactForm.appendChild(msg);
        }
        
        // Limpiar clases previas y ocultar mensaje
        msg.classList.remove('success', 'error');
        msg.style.opacity = 0;
        msg.style.textAlign = 'center'; // Centrar el texto de los mensajes
        
        // Mostrar mensaje después de una breve pausa (para efecto visual)
        setTimeout(() => {
            if (valid) {
                // ÉXITO: Formulario válido - Enviar email
                enviarEmail(nombre.value.trim(), email.value.trim(), mensaje.value.trim(), msg);
            } else {
                // ERROR: Mostrar todos los errores encontrados
                msg.innerHTML = errorMsgs.map(e => `<div>${e}</div>`).join('');
                msg.classList.add('error');
                msg.style.opacity = 1; // Hacer visible el mensaje de error
            }
        }, 200);
        
        // Si es válido, el formulario se limpiará después del envío exitoso del email
    });
}

/**
 * FUNCIÓN PARA ENVIAR EMAIL CON EMAILJS
 * Envía los datos del formulario a tu correo electrónico usando EmailJS
 * @param {string} nombre - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {string} mensaje - Mensaje del usuario
 * @param {HTMLElement} msgElement - Elemento para mostrar el resultado
 */
function enviarEmail(nombre, email, mensaje, msgElement) {
    // Mostrar mensaje de carga
    msgElement.textContent = 'Enviando mensaje...';
    msgElement.classList.add('success');
    msgElement.style.opacity = 1;
    
    // Configuración de EmailJS - COMPLETAMENTE CONFIGURADO
    const SERVICE_ID = 'service_weqyno5';     // Tu Service ID de EmailJS
    const TEMPLATE_ID = 'template_5a2du19';   // Tu Template ID de EmailJS
    const PUBLIC_KEY = 'AEcmMTaXzEYmNbGPO';   // Tu Public Key de EmailJS
    
    // Parámetros del template
    const templateParams = {
        from_name: nombre,
        from_email: email,
        message: mensaje,
        to_name: 'Germán Villar García',
        reply_to: email
    };
    
    // Enviar email usando EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(function(response) {
            // ÉXITO: Email enviado correctamente
            console.log('Email enviado exitosamente:', response.status, response.text);
            msgElement.textContent = '¡Mensaje enviado correctamente! Te responderé pronto.';
            msgElement.classList.remove('error');
            msgElement.classList.add('success');
            
            // Limpiar formulario después del envío exitoso
            contactForm.reset();
            
        }, function(error) {
            // ERROR: Fallo al enviar email
            console.error('Error al enviar email:', error);
            msgElement.textContent = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.';
            msgElement.classList.remove('success');
            msgElement.classList.add('error');
        });
}


