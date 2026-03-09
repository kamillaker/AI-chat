class ChatMessage extends HTMLElement {
    connectedCallback() {
        const role = this.getAttribute('role');
        this.classList.add(
            'p-2',
            'flex',
            role === 'user' ? 'justify-end' : 'justify-start',
            role === 'user' ? 'bg-blue-400 text-white' : 'bg-white text-gray-800',
            'rounded-lg',
            'shadow',
            'max-w-xs',
        );
    }
}

customElements.define('chat-message', ChatMessage);
