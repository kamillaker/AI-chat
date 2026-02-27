const sendBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messageList = document.getElementById('message-list');

sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (text === '') return;

  const message = document.createElement('div');
  message.classList.add('message');
  message.textContent = text;

  messageList.appendChild(message);
  messageInput.value = '';
  messageList.scrollTop = messageList.scrollHeight;
});
