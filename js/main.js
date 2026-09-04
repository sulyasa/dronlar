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
});
