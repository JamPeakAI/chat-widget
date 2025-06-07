// Chat Widget Script (Custom Design)
(function () {
  // Create and inject styles
  const styles = `
    .n8n-chat-widget {
      --chat--color-primary: var(--n8n-chat-primary-color, #0ea5e9);
      --chat--color-secondary: var(--n8n-chat-secondary-color, #0369a1);
      --chat--color-background: var(--n8n-chat-background-color, #f8fafc);
      --chat--color-font: var(--n8n-chat-font-color, #1e293b);
      font-family: 'Inter', sans-serif;
    }

    .n8n-chat-widget .chat-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
      width: 360px;
      height: 580px;
      background: var(--chat--color-background);
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      overflow: hidden;
      display: none;
      flex-direction: column;
      border: 1px solid #e2e8f0;
    }

    .n8n-chat-widget .chat-container.open {
      display: flex;
    }

    .n8n-chat-widget .brand-header {
      background: var(--chat--color-primary);
      color: white;
      display: flex;
      align-items: center;
      padding: 16px;
      position: relative;
    }

    .n8n-chat-widget .brand-header img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      border-radius: 50%;
    }

    .n8n-chat-widget .brand-header span {
      font-size: 18px;
      font-weight: 600;
    }

    .n8n-chat-widget .close-button {
      position: absolute;
      top: 16px;
      right: 16px;
      background: none;
      border: none;
      font-size: 18px;
      color: white;
      cursor: pointer;
      opacity: 0.8;
    }

    .n8n-chat-widget .new-conversation,
    .n8n-chat-widget .chat-interface {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;
      text-align: center;
    }

    .n8n-chat-widget .welcome-text {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 20px;
      color: var(--chat--color-font);
    }

    .n8n-chat-widget .new-chat-btn {
      background: var(--chat--color-primary);
      color: white;
      border: none;
      padding: 14px 24px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
      transition: background 0.3s;
    }

    .n8n-chat-widget .new-chat-btn:hover {
      background: var(--chat--color-secondary);
    }

    .n8n-chat-widget .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .n8n-chat-widget .chat-message {
      max-width: 75%;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.4;
    }

    .n8n-chat-widget .chat-message.user {
      background: var(--chat--color-primary);
      color: white;
      align-self: flex-end;
    }

    .n8n-chat-widget .chat-message.bot {
      background: #e2e8f0;
      color: #1e293b;
      align-self: flex-start;
    }

    .n8n-chat-widget .chat-input {
      padding: 12px;
      display: flex;
      border-top: 1px solid #e2e8f0;
      gap: 8px;
    }

    .n8n-chat-widget .chat-input textarea {
      flex: 1;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      padding: 10px;
      font-size: 14px;
      resize: none;
    }

    .n8n-chat-widget .chat-input button {
      background: var(--chat--color-primary);
      color: white;
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      cursor: pointer;
    }

    .n8n-chat-widget .chat-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--chat--color-primary);
      color: white;
      border: none;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  `;

  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
  document.head.appendChild(fontLink);

  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  const config = window.ChatWidgetConfig || { branding: {}, style: {}, webhook: {} };
  let sessionId = '';

  const widget = document.createElement("div");
  widget.className = "n8n-chat-widget";

  const container = document.createElement("div");
  container.className = "chat-container";

  const interfaceHTML = `
    <div class="brand-header">
      <img src="${config.branding.logo || ''}" alt="logo">
      <span>${config.branding.name || 'ChatBot'}</span>
      <button class="close-button">&times;</button>
    </div>
    <div class="new-conversation">
      <h2 class="welcome-text">${config.branding.welcomeText || 'Hallo! Waarmee kan ik helpen?'}</h2>
      <button class="new-chat-btn">Start Gesprek</button>
    </div>
    <div class="chat-interface" style="display: none;">
      <div class="chat-messages"></div>
      <div class="chat-input">
        <textarea rows="1" placeholder="Typ een bericht..."></textarea>
        <button type="submit">Verzend</button>
      </div>
    </div>
  `;

  container.innerHTML = interfaceHTML;
  widget.appendChild(container);

  const toggle = document.createElement("button");
  toggle.className = "chat-toggle";
  toggle.innerHTML = `💬`;
  widget.appendChild(toggle);

  document.body.appendChild(widget);

  // DOM refs
  const newConversation = container.querySelector(".new-conversation");
  const chatInterface = container.querySelector(".chat-interface");
  const messages = container.querySelector(".chat-messages");
  const input = container.querySelector("textarea");
  const sendBtn = container.querySelector("button[type='submit']");

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function appendMessage(type, content) {
    const div = document.createElement("div");
    div.className = `chat-message ${type}`;
    div.innerHTML = content;
    messages.appendChild(div);
    scrollToBottom();
  }

  function startChat() {
    sessionId = crypto.randomUUID();
    newConversation.style.display = 'none';
    chatInterface.style.display = 'flex';
    appendMessage('bot', config.branding.welcomeText || 'Hallo! Waarmee kan ik helpen?');
  }

  async function sendMessage(msg) {
    appendMessage('user', msg);
    input.value = '';
    scrollToBottom();
    try {
      const response = await fetch(config.webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "sendMessage",
          sessionId,
          route: config.webhook.route,
          chatInput: msg
        })
      });
      const data = await response.json();
      appendMessage('bot', data.output);
    } catch (e) {
      appendMessage('bot', 'Er is iets misgegaan. Probeer opnieuw.');
    }
  }

  toggle.addEventListener("click", () => {
    container.classList.toggle("open");
  });

  container.querySelector(".close-button").addEventListener("click", () => {
    container.classList.remove("open");
  });

  container.querySelector(".new-chat-btn").addEventListener("click", startChat);

  sendBtn.addEventListener("click", () => {
    const msg = input.value.trim();
    if (msg) sendMessage(msg);
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const msg = input.value.trim();
      if (msg) sendMessage(msg);
    }
  });
})();
