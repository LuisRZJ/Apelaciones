// Configuración de plataformas
const platformConfig = {
    discord: {
        username: {
            label: "Nombre de Usuario de Discord:",
            placeholder: "Ej: Usuario#1234",
            hint: "Incluye tu etiqueta numérica (#0000)",
            pattern: /^.+#\d{4}$/
        },
        id: {
            label: "ID de Usuario:",
            placeholder: "Ej: 123456789012345678",
            hint: "ID de 18 dígitos (Activa el Modo Desarrollador)",
            pattern: /^\d{17,20}$/,
            required: true
        },
        adminLabel: "Nombre del moderador que te elimino",
        adminHint: "Ej: @Moderador#1234",
        adminPattern: /^.{5,}#\d{4}$/
    },
    whatsapp: {
        username: {
            label: "Número Telefónico:",
            placeholder: "Ej: +593987654321",
            hint: "Número con código de país",
            pattern: /^\+\d{1,3}\d{6,14}$/
        },
        id: {
            label: "Nombre en WhatsApp:",
            placeholder: "Ej: Juan Pérez",
            hint: "Nombre que muestras en la app",
            pattern: /^[\w\sáéíóúñ]{5,}$/i,
            required: true
        },
        adminLabel: "Número del administrador",
        adminHint: "Ej: +593987654321 (número que te sancionó)",
        adminPattern: /^\+\d{1,3}\d{6,14}$/
    },
    telegram: {
        username: {
            label: "Nombre de Usuario:",
            placeholder: "Ej: @usuario",
            hint: "Tu @usuario público",
            pattern: /^@?\w+$/
        },
        id: {
            label: "ID Numérico:",
            placeholder: "Ej: 123456789",
            hint: "Usa @userinfobot para obtenerlo",
            pattern: /^\d+$/,
            required: true
        },
        adminLabel: "Nombre de usuario del admin que te elimino",
        adminHint: "Ej: @admin_username",
        adminPattern: /^@?\w+$/
    },
    signal: {
        username: {
            label: "Número Telefónico:",
            placeholder: "Ej: +593987654321",
            hint: "Número registrado en Signal",
            pattern: /^\+\d{1,3}\d{6,14}$/
        },
        id: {
            label: "Nombre en Signal:",
            placeholder: "Ej: María González",
            hint: "Nombre que muestras en la app",
            pattern: /^[\w\sáéíóúñ]{5,}$/i,
            required: true
        },
        adminLabel: "Número del administrador",
        adminHint: "Ej: +593987654321 (número que te sancionó)",
        adminPattern: /^\+\d{1,3}\d{6,14}$/
    }
};

// Actualizar campos según plataforma seleccionada
document.getElementById('platform').addEventListener('change', function() {
    const platform = this.value;
    const config = platformConfig[platform] || {};
    
    // Configurar campo de usuario
    const usernameLabel = document.getElementById('usernameLabel');
    const usernameInput = document.getElementById('username');
    const usernameHint = document.getElementById('usernameHint');
    
    usernameLabel.textContent = config.username.label;
    usernameInput.placeholder = config.username.placeholder;
    usernameHint.textContent = config.username.hint;

    // Configurar campo de ID/Nombre
    const idLabel = document.getElementById('userIDLabel');
    const idField = document.getElementById('userIDField');
    const idInput = document.getElementById('userID');
    const idHint = document.getElementById('idHint');
    
    idLabel.textContent = config.id.label;
    idInput.placeholder = config.id.placeholder;
    idHint.textContent = config.id.hint;
    idInput.required = config.id.required;
    
    // Configurar campo de administrador
    const adminLabel = document.getElementById('adminNameLabel');
    const adminInput = document.getElementById('adminName');
    const adminHint = document.getElementById('adminNameHint');
    
    adminLabel.textContent = config.adminLabel;
    adminInput.placeholder = config.adminLabel;
    adminHint.textContent = config.adminHint;
    
    // Mostrar siempre los campos
    idField.classList.remove('hidden-field');
});

// Validar selección máxima de 3 reglas
document.getElementById('brokenRules').addEventListener('change', function() {
    const selectedOptions = Array.from(this.selectedOptions);
    if (selectedOptions.length > 3) {
        alert("Solo puedes seleccionar hasta 3 reglas");
        selectedOptions[selectedOptions.length - 1].selected = false;
    }
});

// Validación general del formulario
document.getElementById('appealForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const platform = document.getElementById('platform').value;
    const config = platformConfig[platform] || {};
    const username = document.getElementById('username').value;
    const userID = document.getElementById('userID').value;
    const adminName = document.getElementById('adminName').value;
    const selectedRules = Array.from(document.getElementById('brokenRules').selectedOptions);
    const acceptRules = document.getElementById('acceptRules').checked;
    const acceptFinal = document.getElementById('acceptFinal').checked;

    // Validación de nombre de usuario
    if (!config.username.pattern.test(username)) {
        alert(`Error en ${config.username.label}: ${config.username.hint}`);
        return;
    }

    // Validación de ID/Nombre
    if (config.id.required && !config.id.pattern.test(userID)) {
        alert(`Error en ${config.id.label}: ${config.id.hint}`);
        return;
    }

    // Validación de administrador
    if (!config.adminPattern.test(adminName)) {
        alert(`Formato inválido para ${config.adminLabel}: ${config.adminHint}`);
        return;
    }

    // Validación de reglas seleccionadas
    if (selectedRules.length === 0) {
        alert("Debes seleccionar al menos una regla incumplida");
        return;
    }

    // Validación de casillas de verificación
    if (!acceptRules) {
        alert("Debes confirmar que conocías las reglas");
        return;
    }
    
    if (!acceptFinal) {
        alert("Debes aceptar que la resolución es definitiva");
        return;
    }

    // Ocultar formulario y mostrar confirmación
    this.classList.add('hidden');
    document.getElementById('confirmationMessage').classList.remove('hidden');

    // Datos para enviar (simulado)
    console.log('Datos de apelación:', {
        platform: platform,
        usuario: username,
        identificacion: userID,
        admin: adminName,
        situacion: document.getElementById('situationDetails').value,
        reglas: selectedRules.map(option => option.value),
        tipo_sancion: document.getElementById('banType').value,
        motivo: document.getElementById('appealReason').value,
        acepta_reglas: acceptRules,
        acepta_final: acceptFinal
    });
});