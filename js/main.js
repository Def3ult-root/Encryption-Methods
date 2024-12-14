// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    tabs.init();
    operationToggle.init();
    
    // Initialize encryption methods
    caesarCipher.init();
    playfairCipher.init();
    vigenereCipher.init();
    transpositionCipher.init();
});