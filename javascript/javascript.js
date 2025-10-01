// Animación de aparición de proyectos al hacer scroll
function revealProjectsOnScroll() {
    const articles = document.querySelectorAll('.sec-proyectos article');
    const windowHeight = window.innerHeight;
    articles.forEach(article => {
        const rect = article.getBoundingClientRect();
        if (rect.top < windowHeight - 60) {
            article.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealProjectsOnScroll);
window.addEventListener('DOMContentLoaded', revealProjectsOnScroll);

// Animación de entrada suave para aside y presentación
function fadeInOnLoad(selector, delay = 0) {
    const el = document.querySelector(selector);
    if (el) {
        el.style.opacity = 0;
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
            el.style.transition = 'opacity 1.2s cubic-bezier(.77,.2,.32,1.01), transform 1.2s cubic-bezier(.77,.2,.32,1.01)';
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, delay);
    }
}
window.addEventListener('DOMContentLoaded', function() {
    fadeInOnLoad('aside', 100);
    fadeInOnLoad('.presentacion', 300);
});

// Animación de fondo: red de puntos conectados
(function createNetworkBg() {
    const canvas = document.createElement('canvas');
    canvas.id = 'network-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.18';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let width, height;
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    // Puntos
    const POINTS = 32;
    let nodes = [];
    for (let i = 0; i < POINTS; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18
        });
    }
    function draw() {
        ctx.clearRect(0, 0, width, height);
        // Dibujar líneas
        for (let i = 0; i < POINTS; i++) {
            for (let j = i + 1; j < POINTS; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 180) {
                    ctx.save();
                    ctx.globalAlpha = 0.22;
                    ctx.strokeStyle = '#60A5FA';
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        // Dibujar puntos
        for (let n of nodes) {
            ctx.save();
            ctx.globalAlpha = 0.65; // puntos más visibles
            ctx.beginPath();
            ctx.arc(n.x, n.y, 6.5, 0, 2 * Math.PI); // puntos más grandes
            ctx.fillStyle = '#60A5FA';
            ctx.fill();
            ctx.restore();
            n.x += n.vx;
            n.y += n.vy;
            if (n.x < 0 || n.x > width) n.vx *= -1;
            if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        requestAnimationFrame(draw);
    }
    draw();
})();

// Animación 3: Pulse en botón de descarga de CV al llegar al final
window.addEventListener('scroll', function() {
    const btn = document.querySelector('.cv-download-btn');
    if (!btn) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const windowH = window.innerHeight;
    const docH = document.body.scrollHeight;
    if (scrollY + windowH >= docH - 12) {
        btn.classList.add('pulse-cv');
    } else {
        btn.classList.remove('pulse-cv');
    }
});

// Animación JS para ampliar y girar sutilmente la foto de perfil al pasar el mouse
const profilePhoto = document.querySelector('.profile-photo');
if (profilePhoto) {
    profilePhoto.addEventListener('mouseenter', () => {
        profilePhoto.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
        profilePhoto.style.transform = 'scale(1.08) rotate(6deg)';
        profilePhoto.style.boxShadow = '0 8px 32px rgba(59,130,246,0.18)';
    });
    profilePhoto.addEventListener('mouseleave', () => {
        profilePhoto.style.transform = 'scale(1) rotate(0deg)';
        profilePhoto.style.boxShadow = '';
    });
}

// Mostrar el nombre de la tecnología en un lugar fijo al hacer hover
const techIcons = document.querySelectorAll('.tech-icon img');
const techNameFixed = document.querySelector('.tech-name-fixed');
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        if (techNameFixed) techNameFixed.textContent = icon.getAttribute('data-name');
    });
    icon.addEventListener('mouseleave', () => {
        if (techNameFixed) techNameFixed.textContent = '';
    });
});

// Validación JS mejorada para el formulario de contacto
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.setAttribute('novalidate', 'novalidate');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        let errorMsgs = [];
        const nombre = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const mensaje = contactForm.querySelector('textarea[name="message"]');
        if (nombre) nombre.classList.remove('input-error');
        if (email) email.classList.remove('input-error');
        if (mensaje) mensaje.classList.remove('input-error');
        // Validación nombre
        if (!nombre || nombre.value.trim().length < 3) {
            valid = false;
            errorMsgs.push('El nombre debe tener al menos 3 caracteres.');
            if (nombre) nombre.classList.add('input-error');
        }
        // Validación email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.value.trim())) {
            valid = false;
            errorMsgs.push('Introduce un email válido.');
            if (email) email.classList.add('input-error');
        }
        // Validación mensaje
        if (!mensaje || mensaje.value.trim().length < 10) {
            valid = false;
            errorMsgs.push('El mensaje debe tener al menos 10 caracteres.');
            if (mensaje) mensaje.classList.add('input-error');
        }
        let msg = contactForm.querySelector('.form-message');
        if (!msg) {
            msg = document.createElement('div');
            msg.className = 'form-message';
            contactForm.appendChild(msg);
        }
        msg.classList.remove('success', 'error');
        msg.style.opacity = 0;
        msg.style.textAlign = 'center'; // Centrar el texto de los mensajes
        setTimeout(() => {
            if (valid) {
                msg.textContent = '¡Mensaje enviado correctamente!';
                msg.classList.add('success');
            } else {
                msg.innerHTML = errorMsgs.map(e => `<div>${e}</div>`).join('');
                msg.classList.add('error');
            }
            msg.style.opacity = 1;
        }, 200);
        if (valid) contactForm.reset();
    });
}


