class ChatMessage extends HTMLElement {
    connectedCallback() {
        const role = this.getAttribute("role");

        this.classList.add("p-2", "flex", "rounded-lg", "shadow", "max-w-xs");

        if (role === "user") {
            this.classList.add("self-end", "bg-blue-400", "text-white");
        } else if (role === "assistant") {
            this.classList.add("self-start", "bg-white", "text-gray-800");
        }
    }
}

customElements.define("chat-message", ChatMessage);

