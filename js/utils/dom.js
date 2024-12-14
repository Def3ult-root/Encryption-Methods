// DOM manipulation utilities
const dom = {
    qs: (selector) => document.querySelector(selector),
    qsa: (selector) => document.querySelectorAll(selector),
    
    addClass(element, className) {
        element.classList.add(className);
    },
    
    removeClass(element, className) {
        element.classList.remove(className);
    },
    
    setContent(selector, content) {
        const element = this.qs(selector);
        if (element) {
            element.textContent = content;
        }
    },
    
    addListener(selector, event, handler) {
        const element = this.qs(selector);
        if (element) {
            element.addEventListener(event, handler);
        }
    }
};