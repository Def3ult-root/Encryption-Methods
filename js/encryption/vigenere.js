// Vigenère Cipher implementation
const vigenereCipher = {
    process(text, key, decrypt = false) {
        if (!validation.isValidText(text) || !validation.isValidKey(key)) {
            return '';
        }

        text = text.toUpperCase();
        key = key.toUpperCase();
        let result = '';
        let keyIndex = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i].match(/[A-Z]/)) {
                const textChar = text[i].charCodeAt(0) - 65;
                const keyChar = key[keyIndex % key.length].charCodeAt(0) - 65;
                
                // For decryption, subtract instead of add
                const shift = decrypt ? (textChar - keyChar + 26) % 26 : (textChar + keyChar) % 26;
                const encryptedChar = String.fromCharCode(shift + 65);
                
                result += encryptedChar;
                keyIndex++;
            } else {
                result += text[i];
            }
        }

        return result;
    },

    init() {
        const input = dom.qs('#vigenere-input');
        const key = dom.qs('#vigenere-key');
        const output = dom.qs('#vigenere-output');

        const updateOutput = () => {
            const sanitizedInput = validation.sanitizeInput(input.value);
            const sanitizedKey = validation.sanitizeInput(key.value);
            const isDecrypting = operationToggle.getCurrentOperation('vigenere') === 'decrypt';
            output.value = this.process(sanitizedInput, sanitizedKey, isDecrypting);
        };

        input.addEventListener('input', updateOutput);
        key.addEventListener('input', updateOutput);
    }
};