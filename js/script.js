/* =========================================================
   Contare Contabilidade e Gestão — JavaScript
   ========================================================= */

// ---------- Constantes de contato (altere em um único lugar) ----------
const WHATSAPP_NUMBER = '5500900000000';
const PHONE_DISPLAY = '(00) 0000-0000';
const EMAIL_DISPLAY = 'contato@exemplo-contabilidade.com.br';

const MESSAGES = {
  header: 'Olá! Gostaria de solicitar atendimento contábil.',
  hero: 'Olá! Gostaria de solicitar atendimento contábil.',
  escritorio: 'Olá! Gostaria de falar com o escritório.',
  mei: 'Olá! Sou MEI e gostaria de ajuda com a contabilidade do meu negócio.',
  empresas: 'Olá! Gostaria de uma proposta de acompanhamento contábil para minha empresa.',
  abertura: 'Olá! Gostaria de falar sobre abertura ou regularização de empresa.',
  troca: 'Olá! Gostaria de saber como trocar de contador.',
  faq: 'Olá! Tenho uma dúvida e gostaria de falar com o escritório.',
  ctaFinal: 'Olá! Gostaria de organizar a contabilidade do meu negócio.',
  contato: 'Olá! Gostaria de solicitar atendimento contábil.',
};

function whatsappLink(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

function setWhatsappLinks() {
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    const key = el.getAttribute('data-wa');
    const msg = MESSAGES[key] || MESSAGES.contato;
    el.setAttribute('href', whatsappLink(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => { if (window.scrollY > 40) header.classList.add('is-scrolled'); else header.classList.remove('is-scrolled'); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initActiveNav() {
  const links = document.querySelectorAll('.nav-link-custom[href^="#"]');
  const sections = [];
  links.forEach((l) => { const id = l.getAttribute('href').slice(1); const sec = document.getElementById(id); if (sec) sections.push({ id, el: sec, link: l }); });
  if (!sections.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { links.forEach((l) => l.classList.remove('active')); const match = sections.find((s) => s.el === e.target); if (match) match.link.classList.add('active'); } });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  sections.forEach((s) => io.observe(s.el));
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
  els.forEach((el) => io.observe(el));
}

function initCharts() {
  const bars = document.querySelectorAll('.chart-bar');
  if (!bars.length) return;
  const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } }); }, { threshold: 0.3 });
  bars.forEach((b) => io.observe(b));
}

function initMobileMenuClose() {
  const collapse = document.getElementById('mainNav');
  if (!collapse) return;
  collapse.querySelectorAll('a').forEach((a) => { a.addEventListener('click', () => { if (collapse.classList.contains('show')) { const toggler = document.querySelector('.navbar-toggler'); if (toggler) toggler.click(); } }); });
}

function initServiceChips() {
  const group = document.getElementById('serviceChips');
  if (!group) return;
  const chips = group.querySelectorAll('.service-chip');
  const waBtn = document.getElementById('contactWaBtn');
  const messagesBySubject = {
    'Abrir empresa': 'Olá! Gostaria de falar sobre abertura ou regularização de empresa.',
    'MEI': 'Olá! Sou MEI e gostaria de ajuda com a contabilidade do meu negócio.',
    'Contabilidade mensal': 'Olá! Gostaria de uma proposta de acompanhamento contábil para minha empresa.',
    'Folha de pagamento': 'Olá! Gostaria de saber mais sobre folha de pagamento.',
    'Trocar de contador': 'Olá! Gostaria de saber como trocar de contador.',
    'Outro': 'Olá! Gostaria de solicitar atendimento contábil.',
  };
  let selected = 'Abrir empresa';
  chips.forEach((chip) => { chip.addEventListener('click', () => { chips.forEach((c) => c.classList.remove('active')); chip.classList.add('active'); selected = chip.getAttribute('data-subject'); updateContactWa(); }); });
  function updateContactWa() { if (waBtn) { waBtn.setAttribute('href', whatsappLink(messagesBySubject[selected] || MESSAGES.contato)); waBtn.setAttribute('target','_blank'); waBtn.setAttribute('rel','noopener noreferrer'); } }
  updateContactWa();
}

function initServiceModals() {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;
  modal.addEventListener('show.bs.modal', (e) => {
    const trigger = e.relatedTarget;
    if (!trigger) return;
    const title = trigger.getAttribute('data-service-title') || 'serviço';
    const desc = trigger.getAttribute('data-service-desc') || '';
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');
    const modalWa = modal.querySelector('.modal-wa-btn');
    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = desc;
    if (modalWa) { modalWa.setAttribute('href', whatsappLink('Olá! Gostaria de saber mais sobre ' + title + '.')); modalWa.setAttribute('target','_blank'); modalWa.setAttribute('rel','noopener noreferrer'); }
  });
}
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const onScroll = () => { if (window.scrollY > 400) btn.classList.add('visible'); else btn.classList.remove('visible'); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initFabWhatsapp() {
  const fab = document.getElementById('fabWhatsapp');
  if (!fab) return;
  const onScroll = () => { if (window.scrollY > 200) fab.classList.add('visible'); else fab.classList.remove('visible'); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  setWhatsappLinks();
  initHeaderScroll();
  initActiveNav();
  initReveal();
  initCharts();
  initMobileMenuClose();
  initServiceChips();
  initServiceModals();
  initBackToTop();
  initFabWhatsapp();
  initYear();
});