// Wait for the HTML to be fully loaded before running logic
document.addEventListener('DOMContentLoaded', function () {

    // --- DOM ELEMENTS REFERENCE ---
    const btnGenerate = document.getElementById('btnGenerate');
    const btnCopy = document.getElementById('btnCopy');
    const seedInput = document.getElementById('seedInput');
    const serviceInput = document.getElementById('serviceInput');
    const lengthInput = document.getElementById('lengthInput');
    const btnLess = document.getElementById('btnLess');
    const btnMore = document.getElementById('btnMore');
    const passwordOutput = document.getElementById('passwordOutput');
    const status = document.getElementById('status');
    const timerContainer = document.getElementById('timerContainer');
    const timerCount = document.getElementById('timerCount');

    // --- PHYSICAL MODE ELEMENTS ---
    const togglePhysical = document.getElementById('togglePhysical');
    const physicalPasswordOutput = document.getElementById('physicalPasswordOutput');
    const statusPhysical = document.getElementById('statusPhysical');

    // --- LANGUAGE FLAGS ---
    const langEs = document.getElementById('langEs');
    const langEn = document.getElementById('langEn');

    // --- EYE TOGGLE & TIMER ---
    const toggleSeed = document.getElementById('toggleSeed');
    let hideTimeout; // Stores the timer ID to auto-hide password

    // --- SVG CONSTANTS ---
    const svgEyeOpen = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    const svgEyeClosed = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

    // --- LANGUAGE DICTIONARY ---
    const translations = {
        en: {
            seedLabel: "Master Seed (Your Secret):",
            seedPlaceholder: "Enter your passphrase...",
            serviceLabel: "Service Name (Domain):",
            servicePlaceholder: "e.g. gmail.com",
            lengthLabel: "Length:",
            tooltipHtml: "Standard length (16 chars) works for most sites. Change only if required. <br><strong>Important:</strong> You must remember the specific length to regenerate the password.",
            btnGenerate: "Generate Password",
            btnCopy: "Copy",
            donateText: "Donate via PayPal",
            repoText: "Source Code",
            statusReq: "Master Seed and Service Name are required.",
            statusGen: "Generated for",
            statusCopied: "Password Copied!",
            statusPhysicalMsg: "Physical entry mode: Ignore orange hyphens.",
            physicalTooltip: "Optimizes display for manual entry on other devices.",
            appName: "MindVault"
        },
        es: {
            seedLabel: "Semilla Maestra (Tu Secreto):",
            seedPlaceholder: "Tu frase contraseña...",
            serviceLabel: "Nombre del Servicio (Dominio):",
            servicePlaceholder: "ej: gmail.com",
            lengthLabel: "Longitud:",
            tooltipHtml: "La longitud estándar (16) funciona casi siempre. Cámbialo solo si es necesario. <br><strong>Importante:</strong> Debes recordar la longitud elegida para regenerar el password.",
            btnGenerate: "Generar Password",
            btnCopy: "Copiar",
            donateText: "Donar con PayPal",
            repoText: "Código Fuente",
            statusReq: "Falta la Semilla Maestra o el Servicio.",
            statusGen: "Generado para",
            statusCopied: "¡Copiado al portapapeles!",
            statusPhysicalMsg: "Modo físico: Ignorar guiones naranjas.",
            physicalTooltip: "Actívalo para copiar manualmente en otros dispositivos.",
            appName: "MindVault"
        }
    };

    // Default language (Auto-detect)
    const userLang = navigator.language || navigator.userLanguage;
    let currentLang = userLang.startsWith('es') ? 'es' : 'en';

    // --- STATE TRACKING FOR TRANSLATIONS ---
    let lastService = "";
    let lastLength = 16;
    let isGenerated = false;

    // --- FUNCTION: CHANGE LANGUAGE ---
    function setLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];

        document.querySelectorAll('[data-lang-key]').forEach(elem => {
            const key = elem.getAttribute('data-lang-key');
            if (t[key]) elem.innerHTML = t[key];
        });

        document.querySelectorAll('[data-lang-placeholder]').forEach(elem => {
            const key = elem.getAttribute('data-lang-placeholder');
            if (t[key]) elem.placeholder = t[key];
        });

        if (lang === 'es') {
            langEs.classList.add('active');
            langEn.classList.remove('active');
        } else {
            langEn.classList.add('active');
            langEs.classList.remove('active');
        }

        // Refresh dynamic status messages if they are visible
        if (isGenerated) {
            // Update main status if it's not the "copied" message
            if (status.textContent && status.textContent !== translations['en'].statusCopied && status.textContent !== translations['es'].statusCopied) {
                status.textContent = `${t.statusGen} ${lastService} (${lastLength})`;
            }

            // Update physical status if visible
            if (statusPhysical.textContent) {
                statusPhysical.textContent = t.statusPhysicalMsg;
            }
        }
    }

    langEs.addEventListener('click', () => setLanguage('es'));
    langEn.addEventListener('click', () => setLanguage('en'));

    // Initialize UI with detected language
    setLanguage(currentLang);

    // --- LOGIC: SHOW/HIDE PASSWORD WITH TIMER ---
    toggleSeed.addEventListener('click', () => {
        const isPassword = seedInput.type === 'password';

        if (isPassword) {
            seedInput.type = 'text';
            toggleSeed.innerHTML = svgEyeClosed;
            toggleSeed.style.opacity = "1";
            clearTimeout(hideTimeout);

            hideTimeout = setTimeout(() => {
                seedInput.type = 'password';
                toggleSeed.innerHTML = svgEyeOpen;
                toggleSeed.style.opacity = "0.6";
            }, 5000);

        } else {
            seedInput.type = 'password';
            toggleSeed.innerHTML = svgEyeOpen;
            toggleSeed.style.opacity = "0.6";
            clearTimeout(hideTimeout);
        }
    });

    // --- LOGIC: LENGTH CONTROLS (+/-) ---
    btnLess.addEventListener('click', () => {
        let val = parseInt(lengthInput.value);
        if (val > 4) {
            lengthInput.value = val - 1;
        }
    });

    btnMore.addEventListener('click', () => {
        let val = parseInt(lengthInput.value);
        if (val < 44) {
            lengthInput.value = val + 1;
        }
    });

    // --- CORE LOGIC: MAP HASH TO SAFE CHARACTERS ---
    function generatePasswordFromBuffer(buffer, length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*-_+=";
        let password = '';
        const bytes = new Uint8Array(buffer);

        for (let i = 0; i < length; i++) {
            const byte = bytes[i % bytes.length];
            const charIndex = byte % chars.length;
            password += chars[charIndex];
        }
        return password;
    }

    // --- SECURITY TIMERS (30s Visible Countdown) ---
    let uiResetInterval;
    let generationTimestamp = 0;
    const TIMEOUT_SECONDS = 30;

    function resetUI() {
        seedInput.value = '';
        serviceInput.value = '';
        passwordOutput.value = '';
        physicalPasswordOutput.innerHTML = '';
        status.textContent = '';
        statusPhysical.textContent = '';
        generationTimestamp = 0;
        isGenerated = false;

        // Reset Settings
        lengthInput.value = '16';
        if (togglePhysical.checked) {
            togglePhysical.checked = false;
            // Force reset of display mode logic visually
            physicalPasswordOutput.style.display = 'none';
            passwordOutput.style.display = 'block';
        }

        // Stop Timer
        if (uiResetInterval) clearInterval(uiResetInterval);
        if (timerContainer) timerContainer.style.display = 'none';

        // Reset visibility of password field
        seedInput.type = 'password';
        toggleSeed.innerHTML = svgEyeOpen;
        toggleSeed.style.opacity = "0.6";
    }

    function startCountdown(seconds) {
        if (uiResetInterval) clearInterval(uiResetInterval);

        let timeLeft = seconds;
        if (timerCount) timerCount.textContent = `${timeLeft}s`;
        if (timerContainer) timerContainer.style.display = 'flex';

        uiResetInterval = setInterval(() => {
            timeLeft--;
            if (timerCount) timerCount.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(uiResetInterval);
                resetUI();
            }
        }, 1000);
    }

    // Check on app resume (if user minimized app)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (generationTimestamp > 0) {
                const elapsed = Date.now() - generationTimestamp;
                const elapsedSeconds = Math.floor(elapsed / 1000);

                // Determine current timeout limit based on mode
                const currentLimit = togglePhysical.checked ? 90 : 30;

                if (elapsedSeconds >= currentLimit) {
                    resetUI();
                } else {
                    // Resume countdown with correct remaining time
                    startCountdown(currentLimit - elapsedSeconds);
                }
            }
        }
    });

    // --- EVENT: GENERATE PASSWORD ---
    btnGenerate.addEventListener('click', async () => {
        const seed = seedInput.value.trim();
        const service = serviceInput.value.trim().toLowerCase();

        let desiredLength = parseInt(lengthInput.value);
        if (!desiredLength || desiredLength < 4) desiredLength = 16;
        if (desiredLength > 64) desiredLength = 64;

        if (!seed || !service) {
            status.textContent = translations[currentLang].statusReq;
            status.style.color = "#e74c3c";
            return;
        }

        const compositeSeed = seed + "||" + service;
        const msgBuffer = new TextEncoder().encode(compositeSeed);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const password = generatePasswordFromBuffer(hashBuffer, desiredLength);

        passwordOutput.value = password;

        // Update State
        lastService = service;
        lastLength = desiredLength;
        isGenerated = true;

        status.textContent = `${translations[currentLang].statusGen} ${service} (${desiredLength})`;
        status.style.color = "#27ae60";

        // Update Visualization based on mode
        updatePasswordDisplay(password);

        // SECURITY: Start Timer (30s or 90s)
        const duration = togglePhysical.checked ? 90 : 30;

        generationTimestamp = Date.now();
        startCountdown(duration);
    });

    // --- LOGIC: PHYSICAL MODE TOGGLE ---
    function updatePasswordDisplay(password) {
        if (!password) return;

        if (togglePhysical.checked) {
            // Physical Mode: Show Div, Format Text
            passwordOutput.style.display = 'none';
            physicalPasswordOutput.style.display = 'flex';

            // Chunking into groups of 4
            const chunks = password.match(/.{1,4}/g) || [];
            physicalPasswordOutput.innerHTML = chunks.join('<span class="chunk-separator">-</span>');

            statusPhysical.textContent = translations[currentLang].statusPhysicalMsg;
        } else {
            // Normal Mode: Show Input
            physicalPasswordOutput.style.display = 'none';
            passwordOutput.style.display = 'block';
            statusPhysical.textContent = "";
        }
    }

    togglePhysical.addEventListener('change', () => {
        const password = passwordOutput.value;
        if (password) {
            updatePasswordDisplay(password);

            // Restart Timer with correct duration if active
            if (uiResetInterval) {
                const duration = togglePhysical.checked ? 90 : 30;
                generationTimestamp = Date.now(); // Reset timestamp too for consistency
                startCountdown(duration);
            }
        }
        // If no password, nothing happens visual-wise until generation
    });

    // --- EVENT: COPY TO CLIPBOARD ---
    btnCopy.addEventListener('click', () => {
        const password = passwordOutput.value;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                status.textContent = translations[currentLang].statusCopied;
                status.style.color = "#27ae60";

                // Clear message after 3 seconds
                setTimeout(() => {
                    if (status.textContent === translations[currentLang].statusCopied) {
                        status.textContent = "";
                    }
                }, 3000);
            });
        }
    });

    // --- EVENT: ALLOW 'ENTER' KEY TO TRIGGER GENERATE ---
    [seedInput, serviceInput, lengthInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') btnGenerate.click();
        });
    });
});
