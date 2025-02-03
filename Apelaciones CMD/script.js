// Detección inicial del tema del sistema
const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Función para aplicar el tema
function applyTheme(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
}

// Función para toggle manual
function toggleTheme() {
    const isDark = !document.body.classList.contains('dark-mode');
    applyTheme(isDark);
    document.body.dataset.theme = isDark ? 'dark' : 'light';
}

// Escuchar cambios en el sistema
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!document.body.dataset.theme) {
        applyTheme(e.matches);
    }
});

// Inicializar con preferencia del sistema
applyTheme(systemDarkMode);

// Añadir botón al HTML
const themeButton = document.createElement('button');
themeButton.className = 'theme-toggle';
themeButton.textContent = systemDarkMode ? '☀️' : '🌙';
document.body.appendChild(themeButton);

// Evento del botón
document.querySelector('.theme-toggle').addEventListener('click', () => {
    toggleTheme();
    themeButton.textContent = document.body.classList.contains('dark-mode') 
        ? '☀️' 
        : '🌙';
});