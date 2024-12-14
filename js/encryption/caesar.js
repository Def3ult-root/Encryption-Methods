// Caesar Cipher implementation
const caesarCipher = {
    process(text, shift, decrypt = false) {
        if (!validation.isValidText(text) || !validation.isValidShift(shift)) {
            return '';
        }

        // For decryption, reverse the shift
        if (decrypt) {
            shift = (26 - shift) % 26;
        }

        return text
            .split('')
            .map(char => {
                if (char.match(/[a-z]/i)) {
                    const code = char.charCodeAt(0);
                    const isUpperCase = code >= 65 && code <= 90;
                    const base = isUpperCase ? 65 : 97;
                    return String.fromCharCode(((code - base + shift) % 26) + base);
                }
                return char;
            })
            .join('');
    },

    init() {
        const input = dom.qs('#caesar-input');
        const shift = dom.qs('#caesar-shift');
        const output = dom.qs('#caesar-output');

        const updateOutput = () => {
            const sanitizedInput = validation.sanitizeInput(input.value);
            const shiftValue = parseInt(shift.value);
            const isDecrypting = operationToggle.getCurrentOperation('caesar') === 'decrypt';
            output.value = this.process(sanitizedInput, shiftValue, isDecrypting);
        };

        input.addEventListener('input', updateOutput);
        shift.addEventListener('input', updateOutput);
    }
};