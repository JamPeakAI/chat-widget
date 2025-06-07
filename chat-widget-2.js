.n8n-chat-widget {
    --chat--color-primary: var(--n8n-chat-primary-color, #854fff); /* Violet */
    --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4); /* Paars */
    --chat--color-background: var(--n8n-chat-background-color, #ffffff); /* Wit */
    --chat--color-font: var(--n8n-chat-font-color, #333333); /* Donkergrijs */
    font-family: 'Inter', sans-serif;
}

/* Chat container - aangepaste hoeken, subtiele schaduwen */
.n8n-chat-widget .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: none;
    width: 380px;
    height: 600px;
    background: var(--chat--color-background);
    border-radius: 16px;  /* Strakkere randen */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);  /* Zachte schaduw */
    border: none;
    overflow: hidden;
    font-family: inherit;
    transform: scale(1); /* Start met normale grootte */
    transition: transform 0.3s ease, opacity 0.3s ease-in-out;  /* Mooie transities */
}

/* Stijl voor het open- en dichtklappen */
.n8n-chat-widget .chat-container.open {
    display: flex;
    flex-direction: column;
    transform: scale(1.05);  /* Lichte vergroting bij openen */
}

/* Header - Modern logo en brandname */
.n8n-chat-widget .brand-header {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(133, 79, 255, 0.2);  /* Lichte onderrand */
    position: relative;
    background: #f4f4f4;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

/* Verander logo naar dynamische logo */
.n8n-chat-widget .brand-header img {
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;  /* Cirkelvormig logo */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Lichte schaduw */
}

/* Stijl van de nieuwe chat button */
.n8n-chat-widget .new-chat-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 18px 24px;
    background: linear-gradient(135deg, #ff76c6, #854fff); /* Zachte kleurgradients */
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.n8n-chat-widget .new-chat-btn:hover {
    transform: scale(1.05);  /* Mooie vergroting bij hover */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Schaduw bij hover */
}

/* Chat messages - Maak het moderner met ronde hoeken */
.n8n-chat-widget .chat-message {
    padding: 14px 18px;
    margin: 8px 0;
    border-radius: 16px;
    max-width: 80%;
    word-wrap: break-word;
    font-size: 15px;
    line-height: 1.6;
    background: #f9f9f9;
}

/* Stijl voor gebruikers- en chatbotberichten */
.n8n-chat-widget .chat-message.user {
    background: linear-gradient(135deg, #76ff5b, #5bcbff); /* Zachte gradient voor gebruiker */
    color: white;
    align-self: flex-end;
    box-shadow: 0 4px 16px rgba(133, 79, 255, 0.3); /* Schaduw effect */
}

.n8n-chat-widget .chat-message.bot {
    background: #e9e9e9;
    border: 1px solid #ddd;
    color: var(--chat--color-font);
    align-self: flex-start;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* Verbeterde invoerveldstijl */
.n8n-chat-widget .chat-input textarea {
    flex: 1;
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f4f4f4;
    color: #333;
    resize: none;
    font-size: 16px;
    transition: border-color 0.3s;
}

.n8n-chat-widget .chat-input textarea:focus {
    border-color: #854fff; /* Focus effect */
}

/* Footer met moderne stijl */
.n8n-chat-widget .chat-footer {
    padding: 10px;
    background: var(--chat--color-background);
    border-top: 1px solid #ddd;
    text-align: center;
}

.n8n-chat-widget .chat-footer a {
    color: #854fff;
    text-decoration: none;
    font-size: 14px;
    opacity: 0.8;
    transition: opacity 0.2s;
}

.n8n-chat-widget .chat-footer a:hover {
    opacity: 1;
}

