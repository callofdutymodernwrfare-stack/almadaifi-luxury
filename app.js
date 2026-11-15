document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Animated KPI Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countUp = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = Math.ceil(target / (duration / 25));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          stat.textContent = target.toLocaleString('ar-SA') + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = current.toLocaleString('ar-SA') + suffix;
        }
      }, 25);
    });
  };

  const statsSection = document.querySelector('.stats-ribbon');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        countUp();
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // Pillar Tabs Switcher (About Section)
  const pillarBtns = document.querySelectorAll('.pillar-btn');
  const pillarTexts = {
    '01': {
      title: 'رؤيتنا الاستراتيجية',
      text: 'نحن فريق العمل لدينا الخبرة في تطبيق أعلى المواصفات ومعايير الجودة في جميع أنشطتنا المختلفة في نطاق بيئتنا المحلية كما أننا ملتزمون بتحقيق التوافق المثالي بين الخبرة في مجال الأعمال المختلفة والكفاءة المهنية والحلول التكنولوجية ومصممون على خدمة عملائنا في بيئة تلتزم بأعلى المعايير الأخلاقية والتي حث عليها ديننا الحنيف ، ونطمح أن نكون شركة متميزة على مستوى المحلي ، كما أن طموحنا يهدف إلى أن نكون أفضل شركة استثمارية في المملكة .'
    },
    '02': {
      title: 'أهدافنا وثقافة السلامة المهنية',
      text: 'إن للسلامة أهمية كبيرة وأساسية وجزء من ثقافتنا في الشركة على المدى الطويل من مسيرة الشركة ، وإلتزامنا نحن شركة المضايفي بأعلى معايير أداء السلامة وضعنا في تصنيف الشركات الكبرى ، وقد تم تطوير برنامج السلامة بإنتظام وفاعلية لكل موقع وعمل ، حيث أن إدارتنا من أولوياتها تأهيل القائمين على الإشراف المباشر على سجلات السلامة لتوفير بيئة عمل آمنه والتقيد بسياسات السلامة هو شرط من شروط العمل .'
    },
    '03': {
      title: 'رسالتنا وتطوير رأس المال البشري',
      text: 'إلتزام الشركة بتقديم أعلى المستويات من الخدمات والمنتجات طبقاً لمعايير الجودة العالمية ساعدنا في إقامة علاقات قوية مبنية على الثقة المتبادلة والمصداقية مع عملائنا . إن اعتقاد الشركة الراسخ بأن عملية تطوير الشركة ترتبط بمواردها البشرية ، كما تشجع شركتنا العاملين فيها وتحرص على تدريبهم وتأهليهم وتطوير قدراتهم بما يتناسب مع احتياجات العمل وذلك بسبب تاريخ الشركة في مجال المقاولات كما تساهم شركتنا في خدمة المجتمع كجزء من واجبها الديني والاجتماعي .'
    }
  };

  pillarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillarBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pillarKey = btn.getAttribute('data-pillar');
      const data = pillarTexts[pillarKey];
      const box = document.getElementById('pillar-content-display');
      if (box && data) {
        box.style.opacity = '0';
        setTimeout(() => {
          box.innerHTML = `
            <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--gold-light); margin-bottom: 10px;">${data.title}</h4>
            <p>${data.text}</p>
          `;
          box.style.opacity = '1';
        }, 200);
      }
    });
  });

  // Projects Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Multi-step Career Application Form
  let currentStep = 1;
  const totalSteps = 3;

  window.goToNextStep = () => {
    if (currentStep === 1) {
      // Basic validation for Step 1
      const fName = document.getElementById('applicant-fname').value.trim();
      const phone = document.getElementById('applicant-phone').value.trim();
      const nationalId = document.getElementById('applicant-id').value.trim();
      if (!fName || !phone || !nationalId) {
        showToast('يرجى تعبئة الحقول الأساسية (الاسم، الجوال، رقم الهوية) للمتابعة');
        return;
      }
    }

    if (currentStep < totalSteps) {
      document.getElementById(`step-content-${currentStep}`).style.display = 'none';
      document.getElementById(`step-indicator-${currentStep}`).classList.remove('active');
      document.getElementById(`step-indicator-${currentStep}`).classList.add('completed');

      currentStep++;
      document.getElementById(`step-content-${currentStep}`).style.display = 'block';
      document.getElementById(`step-indicator-${currentStep}`).classList.add('active');
    }
  };

  window.goToPrevStep = () => {
    if (currentStep > 1) {
      document.getElementById(`step-content-${currentStep}`).style.display = 'none';
      document.getElementById(`step-indicator-${currentStep}`).classList.remove('active');

      currentStep--;
      document.getElementById(`step-content-${currentStep}`).style.display = 'block';
      document.getElementById(`step-indicator-${currentStep}`).classList.add('active');
      document.getElementById(`step-indicator-${currentStep}`).classList.remove('completed');
    }
  };

  window.submitCareerForm = (e) => {
    e.preventDefault();
    const appCode = 'MAD-' + Math.floor(100000 + Math.random() * 900000);
    showToast(`تم استلام طلب التوظيف بنجاح! رقم المرجع: ${appCode}`);

    document.getElementById('step-content-3').innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <i class="fa-solid fa-circle-check" style="font-size: 4rem; color: var(--gold-primary); margin-bottom: 20px;"></i>
        <h3 style="font-size: 1.8rem; font-weight: 700; color: var(--text-main); margin-bottom: 12px;">تم تقديم طلبكم بنجاح</h3>
        <p style="color: var(--text-secondary); font-size: 1.05rem; margin-bottom: 25px; line-height: 1.8;">
          شكراً لاهتمامكم بالانضمام إلى فريق عمل شركة المضايفي للمقاولات المحدودة.<br>
          تم تسجيل بياناتكم في قاعدة بيانات الموارد البشرية برقم طلب: 
          <strong style="color: var(--gold-light); font-size: 1.2rem;">${appCode}</strong>
        </p>
        <button class="btn-luxury-outline" onclick="location.reload()">تقديم طلب جديد</button>
      </div>
    `;
    document.getElementById(`step-indicator-3`).classList.remove('active');
    document.getElementById(`step-indicator-3`).classList.add('completed');
  };

  // Generic Toast Notification
  window.showToast = (message) => {
    let toast = document.getElementById('luxury-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'luxury-toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-bell" style="color: var(--gold-primary)"></i> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // Modals for Projects and Quote
  window.openProjectModal = (title, category, client, desc) => {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-category').textContent = category;
    document.getElementById('modal-client').textContent = client;
    document.getElementById('modal-desc').textContent = desc;
    modal.classList.add('open');
  };

  window.closeModal = (modalId) => {
    document.getElementById(modalId).classList.remove('open');
  };

  // Contact form submission
  const contactForm = document.getElementById('direct-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('شكراً لتواصلك مع شركة المضايفي. سيقوم ممثل الإدارة بالتواصل معك قريباً.');
      contactForm.reset();
    });
  }

  // File Upload Preview Mock
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', (e) => {
      const fileName = e.target.files[0]?.name;
      if (fileName) {
        const preview = input.parentElement.querySelector('.file-name-preview');
        if (preview) {
          preview.textContent = `تم اختيار: ${fileName}`;
          preview.style.color = 'var(--gold-light)';
        }
      }
    });
  });
});
