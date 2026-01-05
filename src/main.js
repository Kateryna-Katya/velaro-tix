document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация плавного скролла Lenis
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Инициализация иконок Lucide
    lucide.createIcons();

    // 3. ФИКС: Анимация карточек через forEach
    // Секция ПРАКТИКИ
    document.querySelectorAll('.practice-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,      // Триггер — сама карточка
                start: "top 90%",   // Начинать, когда карточка на 90% внизу экрана
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1 // Небольшая задержка для эффекта очереди
        });
    });

    // Секция ОБУЧЕНИЕ (Steps)
    document.querySelectorAll('.edu-step').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: "top 90%",
            },
            opacity: 0,
            x: index % 2 === 0 ? -30 : 30, // Вылет слева или справа
            duration: 1,
            ease: "expo.out"
        });
    });

    // 4. Анимация заголовков через SplitType
    document.querySelectorAll('.section-title').forEach(title => {
        const text = new SplitType(title, { types: 'words' });
        gsap.from(text.words, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.6
        });
    });

    // 5. Валидация телефона (только цифры)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // 6. Математическая капча
    const captchaQ = document.getElementById('captcha-question');
    const n1 = Math.floor(Math.random() * 10);
    const n2 = Math.floor(Math.random() * 5);
    const result = n1 + n2;
    if (captchaQ) captchaQ.innerText = `${n1} + ${n2} = `;

    // 7. Обработка формы Контактов
    const form = document.getElementById('contact-form');
    const formMsg = document.getElementById('form-message');

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const userAns = parseInt(document.getElementById('captcha-answer').value);
        
        if (userAns !== result) {
            formMsg.innerText = "Неверный ответ капчи!";
            formMsg.style.color = "var(--color-accent)";
            formMsg.style.display = "block";
            return;
        }

        formMsg.innerText = "Отправка...";
        formMsg.style.display = "block";
        formMsg.style.color = "var(--color-text)";

        // Имитация AJAX
        setTimeout(() => {
            formMsg.innerText = "Успешно отправлено! Мы свяжемся с вами.";
            formMsg.style.color = "green";
            form.reset();
        }, 1500);
    });

    // 8. Cookie Popup
    if (!localStorage.getItem('velaro_cookies')) {
        const popup = document.getElementById('cookie-popup');
        if (popup) popup.style.display = 'flex';
        document.getElementById('cookie-accept')?.addEventListener('click', () => {
            localStorage.setItem('velaro_cookies', 'true');
            popup.style.display = 'none';
        });
    }
});