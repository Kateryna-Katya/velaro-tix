document.addEventListener('DOMContentLoaded', () => {
  // 1. Плавный скролл
  const lenis = new Lenis();
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // 2. Инициализация иконок
  lucide.createIcons();

  // 3. Анимация заголовков SplitType + GSAP
  const titles = document.querySelectorAll('.section-title');
  titles.forEach(title => {
      const text = new SplitType(title, { types: 'words' });
      gsap.from(text.words, {
          scrollTrigger: {
              trigger: title,
              start: "top 85%",
          },
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
      });
  });

  // 4. Появление карточек при скролле
  gsap.from('.practice-card', {
      scrollTrigger: {
          trigger: '.practices',
          start: "top 70%",
      },
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
  });

  // 5. Анимация чисел в инновациях
  const counters = document.querySelectorAll('[data-gsap="count"] span');
  counters.forEach(counter => {
      const target = +counter.innerText;
      gsap.from(counter, {
          scrollTrigger: {
              trigger: '.innovation',
              start: "top 60%",
          },
          innerText: 0,
          duration: 2,
          snap: { innerText: 1 },
          ease: "expo.out"
      });
  });

  // 6. Мобильное меню (Полная логика)
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const body = document.body;

  burger.addEventListener('click', () => {
      burger.classList.toggle('burger--active');
      nav.classList.toggle('nav--active'); // Добавьте этот класс в CSS для display: flex
      body.style.overflow = nav.classList.contains('nav--active') ? 'hidden' : '';
  });

  // 7. Валидация телефона (только цифры)
  const phoneInput = document.getElementById('phone');
  if(phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
      });
  }

  // 8. Математическая капча и форма
  const captchaQ = document.getElementById('captcha-question');
  if(captchaQ) {
      const n1 = Math.floor(Math.random() * 10);
      const n2 = Math.floor(Math.random() * 5);
      const correct = n1 + n2;
      captchaQ.innerText = `${n1} + ${n2} = `;

      const form = document.getElementById('contact-form');
      form.addEventListener('submit', (e) => {
          e.preventDefault();
          const ans = parseInt(document.getElementById('captcha-answer').value);
          const msg = document.getElementById('form-message');

          if(ans !== correct) {
              msg.innerText = "Ошибка в расчетах!";
              msg.style.color = "var(--color-accent)";
              msg.style.display = "block";
              return;
          }

          msg.innerText = "Спасибо! Данные получены.";
          msg.style.color = "green";
          msg.style.display = "block";
          form.reset();
      });
  }

  // 9. Cookie Popup
  const cookieBtn = document.getElementById('cookie-accept');
  if(!localStorage.getItem('velaro_cookies')) {
      document.getElementById('cookie-popup').style.display = 'flex';
  }
  cookieBtn?.addEventListener('click', () => {
      localStorage.setItem('velaro_cookies', 'true');
      document.getElementById('cookie-popup').style.display = 'none';
  });
});