(function () {
  'use strict';

  var header = document.querySelector('.header');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  var modal = document.getElementById('product-modal');
  var modalBackdrop = modal && modal.querySelector('.product-modal-backdrop');
  var modalClose = modal && modal.querySelector('.product-modal-close');
  var modalImg = document.getElementById('modal-img');
  var modalTitle = document.getElementById('modal-title');
  var modalPrice = document.getElementById('modal-price');
  var modalDesc = document.getElementById('modal-desc');
  var modalWhatsapp = document.getElementById('modal-whatsapp');
  var modalEmail = document.getElementById('modal-email');

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function toggleMenu() {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-label', navLinks.classList.contains('open') ? 'Close menu' : 'Open menu');
  }

  function closeMenuOnLinkClick() {
    if (!navLinks || !navLinks.classList.contains('open')) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function getWhatsAppNumber() {
    var a = document.querySelector('.contact-actions a[href^="https://wa.me/"]');
    if (!a) return '919849441529';
    var m = a.getAttribute('href').match(/wa\.me\/(\d+)/);
    return m ? m[1] : '919849441529';
  }

  function getEmail() {
    var a = document.querySelector('.contact-actions a[href^="mailto:"]');
    if (!a) return 'ritishabajaj0@gmail.com';
    return (a.getAttribute('href') || '').replace(/^mailto:/i, '').split('?')[0].trim() || 'hello@rishcorner.com';
  }

  function openProductModal(card) {
    if (!modal) return;
    var title = card.getAttribute('data-product-title') || '';
    var price = card.getAttribute('data-product-price') || '';
    var desc = card.getAttribute('data-product-desc') || '';
    var imgSrc = card.getAttribute('data-product-img') || '';

    modalTitle.textContent = title;
    modalPrice.textContent = price;
    modalDesc.textContent = desc;
    modalImg.src = imgSrc;
    modalImg.alt = title;

    var orderMessage = 'Hi! I\'d like to order: ' + title + ' (' + price + ')';
    modalWhatsapp.href = 'https://wa.me/' + getWhatsAppNumber() + '?text=' + encodeURIComponent(orderMessage);
    modalEmail.href = 'mailto:' + getEmail() + '?subject=' + encodeURIComponent('Order: ' + title) + '&body=' + encodeURIComponent(orderMessage);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeProductModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function onModalKeydown(e) {
    if (e.key !== 'Escape') return;
    closeProductModal();
  }

  if (modal) {
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);
    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    modal.addEventListener('keydown', onModalKeydown);
  }

  document.querySelectorAll('.product-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openProductModal(card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProductModal(card);
      }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', toggleMenu);
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenuOnLinkClick);
    });
  }
})();


