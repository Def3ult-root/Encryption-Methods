// Tab switching functionality
const tabs = {
    init() {
        const tabButtons = dom.qsa('.tab-btn');
        const contents = dom.qsa('.method-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const method = button.dataset.method;
                
                // Update active states
                tabButtons.forEach(btn => btn.classList.remove('active'));
                contents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                dom.qs(`#${method}`).classList.add('active');
            });
        });
    }
};