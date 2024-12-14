// Playfair Cipher implementation
const playfairCipher = {
    generateMatrix(key) {
        const uniqueKey = Array.from(new Set(key.toUpperCase().replace(/J/g, 'I')));
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('');
        const matrix = [];
        
        let currentRow = [];
        uniqueKey.forEach(char => {
            if (currentRow.length === 5) {
                matrix.push(currentRow);
                currentRow = [];
            }
            currentRow.push(char);
            const index = alphabet.indexOf(char);
            if (index > -1) alphabet.splice(index, 1);
        });
        
        alphabet.forEach(char => {
            if (currentRow.length === 5) {
                matrix.push(currentRow);
                currentRow = [];
            }
            currentRow.push(char);
        });
        
        if (currentRow.length > 0) {
            matrix.push(currentRow);
        }
        
        return matrix;
    },

    findPosition(matrix, char) {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === char) {
                    return [i, j];
                }
            }
        }
        return null;
    },

    process(text, key, decrypt = false) {
        if (!validation.isValidText(text) || !validation.isValidKey(key)) {
            return '';
        }

        text = text.toUpperCase().replace(/J/g, 'I');
        let prepared = '';
        for (let i = 0; i < text.length; i++) {
            if (text[i].match(/[A-Z]/)) {
                prepared += text[i];
                if (i + 1 < text.length && text[i] === text[i + 1]) {
                    prepared += 'X';
                }
            }
        }
        if (prepared.length % 2 !== 0) prepared += 'X';

        const matrix = this.generateMatrix(key);
        let result = '';

        for (let i = 0; i < prepared.length; i += 2) {
            const [row1, col1] = this.findPosition(matrix, prepared[i]);
            const [row2, col2] = this.findPosition(matrix, prepared[i + 1]);

            if (row1 === row2) {
                // Same row
                const shift = decrypt ? 4 : 1;
                result += matrix[row1][(col1 + shift) % 5];
                result += matrix[row2][(col2 + shift) % 5];
            } else if (col1 === col2) {
                // Same column
                const shift = decrypt ? 4 : 1;
                result += matrix[(row1 + shift) % 5][col1];
                result += matrix[(row2 + shift) % 5][col2];
            } else {
                // Rectangle
                result += matrix[row1][col2];
                result += matrix[row2][col1];
            }
        }

        return result;
    },

    init() {
        const input = dom.qs('#playfair-input');
        const key = dom.qs('#playfair-key');
        const output = dom.qs('#playfair-output');

        const updateOutput = () => {
            const sanitizedInput = validation.sanitizeInput(input.value);
            const sanitizedKey = validation.sanitizeInput(key.value);
            const isDecrypting = operationToggle.getCurrentOperation('playfair') === 'decrypt';
            output.value = this.process(sanitizedInput, sanitizedKey, isDecrypting);
        };

        input.addEventListener('input', updateOutput);
        key.addEventListener('input', updateOutput);
    }
};