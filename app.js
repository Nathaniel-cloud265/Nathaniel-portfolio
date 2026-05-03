    // 1. Mobile Menu - DEBUGGED
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
      });
    });

    // 2. Dark/Light Mode - DEBUGGED + localStorage
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // 3. Skill Bar Animation on Scroll + Hover - DEBUGGED
    const skillCards = document.querySelectorAll('.skill-card');
    let animated = false;

    function animateSkills() {
      skillCards.forEach(card => {
        const percent = card.getAttribute('data-percent');
        const progress = card.querySelector('.skill-progress');
        const percentText = card.querySelector('.skill-percent');
        let current = 0;
        
        const interval = setInterval(() => {
          if (current >= percent) {
            clearInterval(interval);
          } else {
            current++;
            progress.style.width = current + '%';
            percentText.textContent = current + '%';
          }
        }, 15);
      });
    }

    // Animate on scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateSkills();
          animated = true;
        }
      });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);

    // Animate on hover - reset and replay
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const percent = card.getAttribute('data-percent');
        const progress = card.querySelector('.skill-progress');
        const percentText = card.querySelector('.skill-percent');
        progress.style.width = '0%';
        percentText.textContent = '0%';
        
        setTimeout(() => {
          let current = 0;
          const interval = setInterval(() => {
            if (current >= percent) {
              clearInterval(interval);
            } else {
              current++;
              progress.style.width = current + '%';
              percentText.textContent = current + '%';
            }
          }, 15);
        }, 100);
      });
    });

    // 4. Contact Form - DEBUGGED
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email');
        return;
      }
      
      alert(`Thanks ${name}! I'll reply to ${email}  as soon as possible.`);
      form.reset();
    });