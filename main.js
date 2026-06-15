// =========================================
// KOTO Store — JavaScript
// =========================================

// --- NAV SCROLL ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// --- MOBILE MENU ---
const toggle = document.querySelector('.nav__toggle');
const mobileMenu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = toggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

document.querySelectorAll('.close-menu').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = toggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  });
});

// --- CART ---
let cartCount = 0;
const cartCountEl = document.querySelector('.nav__cart-count');

function addToCart(btn) {
  cartCount++;
  const name = btn.dataset.name;
  cartCountEl.textContent = cartCount;
  cartCountEl.classList.add('visible');
  showToast(`"${name}" added to cart`);
}

// --- TOAST ---
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');
let toastTimer;

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// --- FILTERS ---
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- NEWSLETTER ---
function handleSubscribe(btn) {
  const input = btn.previousElementSibling;
  const val = input.value.trim();
  if (!val || !val.includes('@')) {
    showToast('Please enter a valid email.');
    return;
  }
  showToast('You\'re on the list — watch your inbox.');
  input.value = '';
}

// --- SCROLL REVEAL ---
const revealEls = document.querySelectorAll('.product-card, .story__text, .story__visual, .section-header');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  observer.observe(el);
});
