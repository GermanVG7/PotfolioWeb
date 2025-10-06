# Configuración de EmailJS para el Portfolio

## Pasos para configurar el envío de emails:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar un servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Anota el **Service ID** que se genera

### 3. Crear un template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. **IMPORTANTE - Configurar el destinatario:**
   - En la parte superior del template, donde dice **"To"**
   - Escribe tu email real: `tu-email@gmail.com`
   - Este es donde llegarán todos los mensajes del formulario

4. Usa este template mejorado en el cuerpo del mensaje:

**📧 FORMATO RECOMENDADO PARA EL TEMPLATE:**

```
Subject: 💌 Nuevo contacto desde tu Portfolio - {{from_name}}

🎯 NUEVO MENSAJE DE CONTACTO
═══════════════════════════════════

👤 INFORMACIÓN DEL CONTACTO:
   • Nombre: {{from_name}}
   • Email: {{from_email}}

📝 MENSAJE:
{{message}}

═══════════════════════════════════
📍 Origen: Portfolio Web de Germán Villar García
🕒 Fecha: Automática (EmailJS)
💡 Responder directamente a: {{from_email}}

---
Este mensaje fue enviado automáticamente desde tu formulario de contacto.
```

**🎨 ALTERNATIVA MÁS SIMPLE:**

```
Subject: Contacto Portfolio - {{from_name}}

Hola Germán,

Has recibido un nuevo mensaje desde tu portfolio:

📋 DATOS DEL CONTACTO:
• Nombre: {{from_name}}
• Email: {{from_email}}

💬 MENSAJE:
{{message}}

---
Enviado desde: Portfolio Web
Para responder: Usa el email {{from_email}}
```

5. Guarda el template y anota el **Template ID**

### 4. Obtener tu Public Key
1. Ve a "Account" en el menú
2. Copia tu **Public Key**

### 5. Actualizar el código
Reemplaza en los archivos:

**En `index.html` (línea ~18):**
```javascript
emailjs.init("AEcmMTaXzEYmNbGPO"); // ✅ YA CONFIGURADO
```

**En `javascript.js` (líneas ~320-322):**
```javascript
const SERVICE_ID = 'service_weqyno5';     // ✅ YA CONFIGURADO
const TEMPLATE_ID = 'template_5a2du19';   // ✅ YA CONFIGURADO
const PUBLIC_KEY = 'AEcmMTaXzEYmNbGPO';   // ✅ YA CONFIGURADO
```

### 6. Variables del template
Asegúrate de que tu template de EmailJS use estas variables:
- `{{from_name}}` - Nombre del usuario
- `{{from_email}}` - Email del usuario
- `{{message}}` - Mensaje del usuario
- `{{to_name}}` - Tu nombre (Germán Villar García)
- `{{reply_to}}` - Email del usuario para responder

### 7. Configurar email de destino (IMPORTANTE)
**📍 El campo "To" está en la parte SUPERIOR del template, no en Settings**

**Pasos detallados:**

1. **Ve a tu dashboard de EmailJS** → [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)

2. **Haz clic en "Email Templates"** en el menú izquierdo

3. **Busca y haz clic en tu template** `template_5a2du19`

4. **🎯 BUSCA EN LA PARTE SUPERIOR del template:**
   - Verás campos como: **From**, **To**, **Subject**
   - En el campo **"To"** es donde pones tu email
   - **NO** busques en Settings, está en la parte de arriba

5. **En el campo "To", escribe tu email real:**
   ```
   tu-email@gmail.com
   ```
   - O el email que uses normalmente
   - Ejemplo: `german.villar@outlook.com`

6. **Guarda los cambios** haciendo clic en "Save"

**🔍 GUÍA VISUAL - Dónde encontrar el campo "To":**

Cuando abras tu template `template_5a2du19`, verás algo así:

```
┌─────────────────────────────────────┐
│ From: [service_connected_email]     │  ← Este se llena automáticamente
│ To:   [AQUÍ PONES TU EMAIL] ←←←←    │  ← 🎯 ¡ESTE ES EL IMPORTANTE!
│ Subject: Nuevo mensaje desde...     │  ← Este ya está configurado
├─────────────────────────────────────┤
│                                     │
│ [Aquí está el cuerpo del mensaje]   │
│                                     │
└─────────────────────────────────────┘
```

**✅ LO QUE DEBES HACER:**
1. Haz clic en el campo **"To"** (en la parte superior)
2. Borra lo que esté ahí (si hay algo)
3. Escribe tu email: `tu-email@gmail.com`
4. Haz clic en "Save"

**❌ NO BUSQUES:**
- En "Settings" (abajo)
- En "Advanced settings"
- En ningún menú lateral
- El campo está arriba, junto a "From" y "Subject"

**⚠️ MUY IMPORTANTE:**
- El campo "To" está en la PARTE SUPERIOR del template
- NO está en la sección "Settings" 
- Sin esto, los emails no te llegarán

### 7.1. Configuración detallada del template
**En la página de configuración de tu template `template_5a2du19`, configura así:**

#### **📧 Email de destino:**
- **To Email:** Pon aquí tu email real (ej: `german.villar@gmail.com`)
- Este es el email donde recibirás todos los mensajes del formulario

#### **🔒 Configuraciones de privacidad:**
- **"Do not save private data"** → ✅ **ACTIVAR** (recomendado)
  - Esto evita que EmailJS guarde los datos de tus visitantes
  - Más seguridad y privacidad

- **"Allow unsubscribing from emails"** → ❌ **DESACTIVAR**
  - No es necesario para formularios de contacto
  - Es más para newsletters/marketing

#### **🛡️ Seguridad (Opcional):**
- **"Enable reCAPTCHA V2 verification"** → ❌ **DESACTIVAR por ahora**
  - Puedes activarlo más tarde si recibes spam
  - Tu formulario ya tiene validación propia

#### **📊 Analytics (Opcional):**
- **"Enable Google Analytics tracking"** → ❌ **DESACTIVAR por ahora**
  - Solo si quieres estadísticas avanzadas de emails

#### **💾 Guardar configuración:**
- Haz clic en **"Save"** al final de la página

### 8. Opciones adicionales del template (Configuración avanzada)

En la configuración de tu template (`template_5a2du19`) encontrarás estas opciones:

#### 8.1. Privacidad de datos
- **"Do not save private data"**: 
  - ✅ **RECOMENDADO**: Mantén esta opción activada
  - Los valores de los parámetros del template no se guardarán en el historial
  - Mejora la privacidad de los datos de tus usuarios

#### 8.2. Opción de cancelar suscripción
- **"Allow unsubscribing from emails"**:
  - 📧 Esta opción añade un enlace para cancelar suscripción
  - Para portfolios personales generalmente NO es necesario
  - Útil solo si planeas enviar newsletters o emails masivos

#### 8.3. Verificación reCAPTCHA (Opcional)
- **"Enable reCAPTCHA V2 verification"**:
  - 🛡️ Añade protección extra contra spam
  - Requiere configuración adicional en Google reCAPTCHA
  - Para portfolios pequeños es opcional
  - Si lo activas, necesitarás:
    1. Crear una cuenta en [Google reCAPTCHA](https://www.google.com/recaptcha/)
    2. Obtener tu "reCAPTCHA Secret Key"
    3. Añadir el widget reCAPTCHA a tu formulario HTML

#### 8.4. Google Analytics (Opcional)
- **"Enable Google Analytics tracking"**:
  - 📊 Permite rastrear cuántos emails se envían
  - Requiere un Tracking ID de Google Analytics
  - Para portfolios básicos es opcional

**💡 Recomendación para tu portfolio:**
- ✅ Mantén activado: "Do not save private data"
- ❌ Desactiva: "Allow unsubscribing" (no es necesario para contacto)
- ⚠️ Opcional: reCAPTCHA (solo si recibes mucho spam)
- ⚠️ Opcional: Google Analytics (solo si quieres estadísticas)

### 9. Limites del plan gratuito
- 200 emails por mes
- Perfecto para un portfolio personal
- Sin necesidad de servidor backend

Si necesitas más emails, puedes upgradear a un plan pago.

### 10. Solución de problemas comunes

#### Error: "Service is not available"
- ✅ Verifica que el Service ID (`service_q9dcv5r`) esté correcto
- ✅ Asegúrate de que el servicio esté configurado en EmailJS

#### Error: "Template not found"
- ✅ Verifica que el Template ID (`template_5a2du19`) esté correcto
- ✅ Confirma que el template esté guardado

#### Error: "Public Key is not valid"
- ✅ Verifica la Public Key (`WDTgU9FgZyU9hDNWA`) en Account → API Keys
- ✅ Asegúrate de no incluir espacios extra

#### Los emails no llegan
- 📧 **IMPORTANTE**: Revisa tu carpeta de SPAM
- ✉️ Confirma que pusiste tu email real en "To Email" del template
- 🔍 Verifica la configuración del servicio Gmail/Outlook

#### Error CORS en desarrollo local
- 🌐 EmailJS funciona desde `file://` pero es mejor usar un servidor local
- 💻 Si usas VS Code, instala "Live Server" extension

### 🚨 PROBLEMAS COMUNES AL EDITAR EL TEMPLATE

#### **❓ "No veo el campo 'To Email'"**
- **Solución:** Busca en la parte SUPERIOR del editor, no en configuraciones
- **Ubicación:** Junto a "From Email" y "Subject"
- **Alternativa:** Busca un campo que diga "Recipient" o "Destinatario"

#### **❓ "El template no se guarda"**
- **Revisa:** Que todos los campos obligatorios estén llenos
- **Verifica:** Que el "To Email" tenga un email válido
- **Intenta:** Refrescar la página y volver a intentar

#### **❓ "No encuentro mi template"**
- **Ve a:** Email Templates en el menú izquierdo
- **Busca:** `template_5a2du19` en la lista
- **Si no aparece:** Verifica que estés en la cuenta correcta

#### **❓ "Los emails no me llegan"**
1. **Verifica** que pusiste tu email real en "To Email"
2. **Revisa** tu carpeta de SPAM/Correo no deseado
3. **Confirma** que el servicio de email esté conectado
4. **Prueba** enviando desde otro email para verificar

#### **⚡ CONSEJO RÁPIDO:**
Si tienes dudas, **haz una captura de pantalla** de la pantalla de edición del template y podrás mostrar exactamente qué ves para recibir ayuda específica.

---

## 🎉 ¡Tu portfolio está listo!

Una vez completados todos los pasos, tendrás:
- ✨ Un portfolio moderno y responsivo
- 🌙 Modo oscuro/claro
- 📧 Formulario de contacto funcional con EmailJS
- 🎨 Animaciones elegantes
- 📱 Diseño mobile-first
- 💌 Envío real de emails de contacto

**¿Necesitas ayuda?** Revisa este archivo o consulta la [documentación oficial de EmailJS](https://www.emailjs.com/docs/).

### 🔧 CÓMO EDITAR TU TEMPLATE DE EMAILJS - PASO A PASO

#### **Paso 1: Acceder al template**
1. Ve a [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Inicia sesión con tu cuenta
3. En el menú izquierdo, haz clic en **"Email Templates"**
4. Busca tu template **`template_5a2du19`**
5. Haz clic en el nombre del template para abrirlo

#### **Paso 2: Editar la información básica del email**
Una vez dentro del template, verás la interfaz de edición:

```
┌─────────────────────────────────────────────────────┐
│ 📝 EDITOR DEL TEMPLATE                              │
├─────────────────────────────────────────────────────┤
│ From Name: [Tu Nombre o el de tu servicio]          │
│ From Email: [Se llena automático con tu servicio]   │
│ To Email: [🎯 AQUÍ PONES TU EMAIL PERSONAL] ←←←     │
│ Subject: Nuevo mensaje desde tu portfolio - {{...}} │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📄 CUERPO DEL MENSAJE:                             │
│ [Aquí escribes el contenido del email]             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### **Paso 3: Configurar el destinatario (MUY IMPORTANTE)**
- **Busca el campo "To Email"** (en la parte superior)
- **Haz clic en ese campo**
- **Borra** cualquier contenido que tenga
- **Escribe tu email personal**, por ejemplo:
  ```
  german.villar@gmail.com
  ```
- Este es el email donde recibirás todos los mensajes

#### **Paso 4: Verificar el contenido del mensaje**
En la parte del cuerpo del mensaje, asegúrate de que tenga este contenido:

```
Hola {{to_name}},

Has recibido un nuevo mensaje desde tu portfolio web:

Nombre: {{from_name}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Enviado desde tu portfolio web
```

#### **Paso 5: Configurar variables del template**
Asegúrate de que estas variables estén configuradas:
- `{{from_name}}` - Nombre de quien envía el mensaje
- `{{from_email}}` - Email de quien envía el mensaje  
- `{{message}}` - El mensaje del formulario
- `{{to_name}}` - Tu nombre (puedes poner "Germán" o dejarlo así)

#### **Paso 6: Guardar los cambios**
1. **Revisa** que todo esté correcto
2. **Haz clic en "Save"** (botón azul, generalmente abajo)
3. **Confirma** que aparezca un mensaje de "Template saved successfully"

#### **Paso 7: Probar la configuración**
Después de guardar:
1. Ve a tu portfolio (`index.html`)
2. Llena el formulario de contacto
3. Envía un mensaje de prueba
4. **Revisa tu email** (incluyendo carpeta de spam)

---

**🔧 PERSONALIZACIÓN AVANZADA DEL EMAIL:**

Si quieres un formato aún más detallado, puedes usar este template:

```
Subject: 📩 [PORTFOLIO] Mensaje de {{from_name}}

═══════════════════════════════════════════════════════════
🌟 NUEVO CONTACTO DESDE TU PORTFOLIO WEB
═══════════════════════════════════════════════════════════

📊 DETALLES DEL CONTACTO:
┌─────────────────────────────────────────────────────────┐
│ 👤 Nombre completo: {{from_name}}                       │
│ 📧 Dirección email: {{from_email}}                      │
│ 🔗 Reply-to: {{from_email}}                            │
└─────────────────────────────────────────────────────────┘

💬 MENSAJE RECIBIDO:
┌─────────────────────────────────────────────────────────┐
│ {{message}}                                             │
└─────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════
📍 INFORMACIÓN ADICIONAL:
• Origen: Formulario de contacto del portfolio
• Portfolio: https://tu-portfolio-url.com
• Responder: Simplemente responde a este email
═══════════════════════════════════════════════════════════

🚀 ¡No olvides responder pronto para mantener una buena impresión profesional!

---
Este email fue generado automáticamente por EmailJS desde tu portfolio web.
```

**📝 VARIABLES DISPONIBLES EN TU FORMULARIO:**

Según tu formulario de contacto, puedes usar estas variables:
- `{{from_name}}` → Campo "nombre" del formulario
- `{{from_email}}` → Campo "email" del formulario  
- `{{message}}` → Campo "mensaje" del formulario
- `{{to_name}}` → Tu nombre (Germán Villar García)
- `{{reply_to}}` → Misma que from_email para responder

**💡 CONSEJOS PARA PERSONALIZAR:**

1. **Subject personalizado:** El asunto aparece en tu bandeja de entrada
2. **Formato claro:** Usa separadores (═══, ---, ••• ) para dividir secciones
3. **Emojis opcionales:** Hacen el email más visual (puedes quitarlos)
4. **Información útil:** Incluye datos que te ayuden a responder rápido

### 📧 CÓMO CAMBIAR EL FORMATO EN EMAILJS:

#### **Paso 1: Acceder al template**
1. Ve a [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Clic en "Email Templates" → `template_5a2du19`

#### **Paso 2: Modificar el Subject (Asunto)**
En el campo **"Subject"** cambia por uno de estos:
```
💌 Nuevo contacto desde tu Portfolio - {{from_name}}
```
o más simple:
```
Contacto Portfolio - {{from_name}}
```

#### **Paso 3: Cambiar el cuerpo del mensaje**
En la zona del **contenido del email**, borra todo y pega uno de los formatos de arriba.

**🎯 RECOMENDADO - Formato profesional:**
```
🎯 NUEVO MENSAJE DE CONTACTO
═══════════════════════════════════

👤 INFORMACIÓN DEL CONTACTO:
   • Nombre: {{from_name}}
   • Email: {{from_email}}

📝 MENSAJE:
{{message}}

═══════════════════════════════════
📍 Origen: Portfolio Web
💡 Responder directamente a: {{from_email}}

---
Mensaje enviado automáticamente desde tu formulario de contacto.
```

#### **Paso 4: Guardar cambios**
1. Haz clic en **"Save"**
2. Confirma que se guardó correctamente

#### **Paso 5: Probar el nuevo formato**
1. Ve a tu portfolio
2. Llena y envía el formulario
3. Revisa tu email para ver el nuevo formato

**✨ ¡Ahora recibirás emails mucho más organizados y profesionales!**
