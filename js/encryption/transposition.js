// Transposition Matrix implementation
const transpositionCipher = {
    process(text, key, decrypt = false) {
        if (!validation.isValidText(text)) {
            return '';
        }

        const numColumns = parseInt(key);
        if (isNaN(numColumns) || numColumns < 2) {
            return '';
        }

        text = text.toUpperCase().replace(/[^A-Z]/g, '');

        if (decrypt) {
            // For decryption
            const numRows = Math.ceil(text.length / numColumns);
            const matrix = Array(numRows).fill().map(() => Array(numColumns).fill(''));
            
            // Fill matrix by columns (how it was encrypted)
            let textIndex = 0;
            for (let col = 0; col < numColumns; col++) {
                for (let row = 0; row < numRows && textIndex < text.length; row++) {
                    matrix[row][col] = text[textIndex++];
                }
            }
            
            // Read matrix by rows to get original text
            return matrix.map(row => row.join('')).join('');
        } else {
            // For encryption
            while (text.length % numColumns !== 0) {
                text += 'X';
            }

            const numRows = Math.ceil(text.length / numColumns);
            const matrix = [];
            let textIndex = 0;

            // Fill matrix by rows
            for (let i = 0; i < numRows; i++) {
                const row = [];
                for (let j = 0; j < numColumns; j++) {
                    row.push(text[textIndex++]);
                }
                matrix.push(row);
            }

            // Read by columns
            let result = '';
            for (let col = 0; col < numColumns; col++) {
                for (let row = 0; row < numRows; row++) {
                    result += matrix[row][col];
                }
            }

            return result;
        }
    },

    init() {
        const input = dom.qs('#transposition-input');
        const key = dom.qs('#transposition-key');
        const output = dom.qs('#transposition-output');

        const updateOutput = () => {
            const sanitizedInput = validation.sanitizeInput(input.value);
            const keyValue = parseInt(key.value);
            const isDecrypting = operationToggle.getCurrentOperation('transposition') === 'decrypt';
            output.value = this.process(sanitizedInput, keyValue, isDecrypting);
        };

        input.addEventListener('input', updateOutput);
        key.addEventListener('input', updateOutput);
    }
};