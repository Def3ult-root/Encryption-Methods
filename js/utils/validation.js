// Input validation utilities
const validation = {
    isValidText(text) {
        return typeof text === 'string' && text.length > 0;
    },

    isValidShift(shift) {
        const num = parseInt(shift);
        return !isNaN(num) && num >= 1 && num <= 25;
    },

    sanitizeInput(input) {
        return input.replace(/<[^>]*>/g, '').trim();
    },

    isValidKey(key) {
        return /^[A-Za-z]+$/.test(key);
    }
};