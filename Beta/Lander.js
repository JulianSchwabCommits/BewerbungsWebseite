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
        document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
    }

    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            switchSection(sectionId);
        });
    });
    // Redirection on 5 clicks for Play link
    document.addEventListener('DOMContentLoaded', () => {
        const playLink = document.getElementById("play-link");
        
        if (playLink) { // Ensure the element exists
            let playClickCount = 0;
    
            // Add event listener to the Play link
            playLink.addEventListener('click', () => {
                playClickCount++;
                console.log(playClickCount);
                if (playClickCount === 5) {
                    window.location.href = "";
                }
            });
        } else {
            console.error("Element with id 'play-link' not found in the DOM.");
        }
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
        "What are your main skills?": "My main skills include JavaScript, Python, HTML/CSS, and I'm currently learning React and Machine Learning with Python.",
        "What are your Softskills?": "My friends say I'm reliable, interested, and have a high intellect in economics and machine learning.",
        "Beta": "Here's the Beta of this Website <a href='/Beta/index.html' target='_blank'>Beta</a>",
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

    // Custom Scrollbar Funktionalität
    const main = document.querySelector('main');
    const scrollbar = document.querySelector('.custom-scrollbar');
    const scrollbarThumb = document.querySelector('.custom-scrollbar-thumb');
    let isDragging = false;
    let startY;
    let scrollStartY;

    // Scrollbar-Thumb-Größe aktualisieren
    function updateScrollbarThumb() {
        const scrollRatio = main.clientHeight / main.scrollHeight;
        const thumbHeight = Math.max(scrollbar.clientHeight * scrollRatio, 40);
        scrollbarThumb.style.height = `${thumbHeight}px`;
    }

    // Scrollbar-Thumb-Position aktualisieren
    function updateThumbPosition() {
        const scrollRatio = main.scrollTop / (main.scrollHeight - main.clientHeight);
        const maxTop = scrollbar.clientHeight - scrollbarThumb.clientHeight;
        const thumbTop = scrollRatio * maxTop;
        scrollbarThumb.style.top = `${thumbTop}px`;
    }

    // Event Listeners für Scrollbar-Interaktionen
    scrollbarThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY - scrollbarThumb.offsetTop;
        scrollStartY = main.scrollTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const y = e.clientY - scrollbar.getBoundingClientRect().top;
        const scrollRatio = y - startY;
        const scrollbarHeight = scrollbar.clientHeight - scrollbarThumb.clientHeight;
        const scrollContentHeight = main.scrollHeight - main.clientHeight;
        
        const newScrollTop = (scrollRatio / scrollbarHeight) * scrollContentHeight;
        main.scrollTop = Math.max(0, Math.min(scrollContentHeight, newScrollTop));
        
        e.preventDefault();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    main.addEventListener('scroll', () => {
        updateThumbPosition();
    });

    window.addEventListener('resize', () => {
        updateScrollbarThumb();
        updateThumbPosition();
    });

    // Initiale Aktualisierung
    updateScrollbarThumb();
    updateThumbPosition();

    // Scroll Indicator Logik
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    scrollIndicator.addEventListener('click', () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});