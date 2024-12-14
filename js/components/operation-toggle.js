// Operation toggle functionality
const operationToggle = {
    init() {
        const toggleContainers = dom.qsa('.operation-toggle');
        
        toggleContainers.forEach(container => {
            const buttons = container.querySelectorAll('.toggle-btn');
            const methodId = container.closest('.method-content').id;
            
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active states
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Trigger update
                    const operation = button.dataset.operation;
                    const input = dom.qs(`#${methodId}-input`);
                    input.dispatchEvent(new Event('input'));
                });
            });
        });
    },

    getCurrentOperation(methodId) {
        const container = dom.qs(`#${methodId} .operation-toggle`);
        const activeButton = container.querySelector('.toggle-btn.active');
        return activeButton.dataset.operation;
    }
};