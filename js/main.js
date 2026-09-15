/**
 * FABRIT - Passive Anti-Drone Protection
 * Industrial Landing Page Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Modal Logic
  const modalOverlay = document.getElementById('inquiryModal');
  const modalOpenBtns = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTargetInput = document.getElementById('modalTargetType');

  function openModal(targetType = '') {
    if (modalOverlay) {
      if (targetType && modalTargetInput) {
        modalTargetInput.value = targetType;
      }
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target-type') || '';
      openModal(target);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 2. Toast Notification Helper
  function showToast(message = 'Заявка успешно отправлена! Наш инженер свяжется с вами в течение 15 минут.') {
    const toast = document.getElementById('successToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  // 3. Modal Form Submission
  const modalForm = document.getElementById('modalLeadForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = modalForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'ОТПРАВКА ДАННЫХ...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
        modalForm.reset();
        showToast('Заявка принята! Инженер проектного отдела подготовит расчет.');
      }, 700);
    });
  }

  // 4. Calculator Form Interaction
  const calcOptionBtns = document.querySelectorAll('.calc-option-btn');
  const calcTypeInput = document.getElementById('calcObjectType');
  calcOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (calcTypeInput) {
        calcTypeInput.value = btn.getAttribute('data-value');
      }
    });
  });

  const calcForm = document.getElementById('calcForm');
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const calcSubmitBtn = calcForm.querySelector('button[type="submit"]');
      const originalText = calcSubmitBtn.textContent;
      calcSubmitBtn.textContent = 'РАСЧЕТ СМЕТЫ...';
      calcSubmitBtn.disabled = true;

      setTimeout(() => {
        calcSubmitBtn.textContent = originalText;
        calcSubmitBtn.disabled = false;
        calcForm.reset();
        showToast('Расчет сформирован! Коммерческое предложение отправлено на указанную почту.');
      }, 800);
    });
  }

  // 5. Mobile Navigation Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  if (mobileMenuToggle && mobileNavMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isVisible = mobileNavMenu.style.display === 'flex';
      mobileNavMenu.style.display = isVisible ? 'none' : 'flex';
    });

    const mobileNavLinks = mobileNavMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavMenu.style.display = 'none';
      });
    });
  }

  // 6. Smooth Scroll for Header Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Image Lightbox Viewer
  const lightboxModal = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox(imgSrc, title = '', caption = '') {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Просмотр чертежа / материала ЗОК';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  }

  document.querySelectorAll('.open-lightbox-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgSrc = btn.getAttribute('data-img');
      if (imgSrc) {
        const title = btn.getAttribute('data-title') || '';
        const caption = btn.getAttribute('data-caption') || '';
        openLightbox(imgSrc, title, caption);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 8. SP 542 Level Switcher
  const levelBtns = document.querySelectorAll('.sp542-level-btn');
  const infoBoxTitle = document.getElementById('infoBoxTitle');
  const infoBoxText = document.getElementById('infoBoxText');

  const levelDescriptions = {
    'all': {
      title: 'Сводная инженерная матрица СП 542 (Уровни 1–4)',
      text: 'Определяет соответствие между 7 ключевыми конструктивными элементами защитно-ограждающей конструкции (ЗОК) и 4 расчетными классами беспилотных аппаратов. Проектирование выполняется индивидуально под категорию опасности объекта Заказчика.'
    },
    '1': {
      title: '1-й Уровень Защиты — Максимальный комплекс безопасности',
      text: 'Предусматривает полный спектр инженерных решений: двухконтурные сетки, стальные тросы, демпфирующие тюфяки и противоосколочные стенки. Защищает резервуары и критические объекты от всех классов БПЛА, включая тяжелые аппараты с осколочным действием.'
    },
    '2': {
      title: '2-й Уровень Защиты — Усиленный периметр',
      text: 'Включает основные и дополнительные защитные сетки, тросовые ограждения, опоры, растяжки и амортизирующие маты. Предназначен для защиты технологических емкостей, колонн и подстанций от средних, легких и малых БПЛА.'
    },
    '3': {
      title: '3-й Уровень Защиты — Стандартный промышленный уровень',
      text: 'Включает основные и дублирующие сетки, тросовую обвязку, опорные мачты и вантовые растяжки. Эффективно защищает здания, склады и инфраструктуру от легких ударных БПЛА и FPV-дронов.'
    },
    '4': {
      title: '4-й Уровень Защиты — Базовый улавливающий периметр',
      text: 'Включает одноконтурную защитную сетку, опорные трубчатые стойки и тросовые растяжки. Предотвращает проникновение малых коммерческих БПЛА и сбросов легких боеприпасов.'
    }
  };

  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.getAttribute('data-level');
      levelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Highlight corresponding columns in both tables
      const allCols = document.querySelectorAll('.col-level');
      allCols.forEach(col => {
        const colLevel = col.getAttribute('data-col');
        if (level === 'all') {
          col.classList.remove('highlight-col');
        } else if (colLevel === level) {
          col.classList.add('highlight-col');
        } else {
          col.classList.remove('highlight-col');
        }
      });

      // Update info box text
      if (levelDescriptions[level] && infoBoxTitle && infoBoxText) {
        infoBoxTitle.textContent = levelDescriptions[level].title;
        infoBoxText.textContent = levelDescriptions[level].text;
      }
    });
  });
});

