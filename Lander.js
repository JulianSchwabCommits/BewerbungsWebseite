document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    function switchSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        document.getElementById(sectionId).classList.add('active');
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            switchSection(sectionId);
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const language = btn.getAttribute('data-language');

            projectCards.forEach(card => {
                if (language === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 0);
                } else {
                    const cardLanguages = card.getAttribute('data-languages').split(' ');
                    if (cardLanguages.includes(language)) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 0);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });

    // Messenger functionality
    const messageArea = document.getElementById('messageArea');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const presetBtns = document.querySelectorAll('.preset-btn');

    const responses = {
        "What's your GitHub?": "Here's my GitHub profile: <a href='https://github.com/JulianSchwabCommits' target='_blank'>JulianSchwabCommits</a>",
        "How can I contact you?": "You can reach me via email at julian.schwab@swisscom.com",
        "What are your main skills?": "My main skills include JavaScript, Python, HTML/CSS, and I'm currently learning React and Machine Learning with Python."
    };

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = text;
        messageArea.appendChild(messageDiv);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    function handleQuestion(question) {
        addMessage(question, true);
        setTimeout(() => {
            const response = responses[question] || "I'm not sure about that. Try asking one of the preset questions!";
            addMessage(response);
        }, 500);
    }

    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleQuestion(btn.textContent);
        });
    });

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            handleQuestion(message);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = messageInput.value.trim();
            if (message) {
                handleQuestion(message);
                messageInput.value = '';
            }
        }
    });
});