# Verificación: Modo de Entrada Físico

He implementado y verificado la nueva funcionalidad. Aquí tienes una demostración visual de cómo funciona.

## Demo Visual

![Physical Mode Demo](file:///C:/Users/guill/.gemini/antigravity/brain/e434665f-fee4-4d68-b15f-573c05c7626d/mind_vault_physical_mode_test_1765131797023.webp)

## Detalles de la Verificación

1.  **Generación Normal**: Se genera la contraseña estándar.
2.  **Activación Toggle**: Al activar el interruptor:
    *   La contraseña cambia a formato segmentado (4 caracteres).
    *   Los guiones aparecen en negrita como separadores visuales.
    *   El mensaje de advertencia "Physical entry mode: ignore hyphens" aparece (en inglés/español según configuración).
    *   El temporizador se reinicia y se extiende a 90 segundos.
3.  **Botón Copiar**: Sigue copiando la contraseña "limpia" (sin guiones) al portapapeles.
