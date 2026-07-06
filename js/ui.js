import { State } from './state.js';

export const UI = {
  goTo(screenId) {
    document.querySelectorAll('.screen')
      .forEach(s => s.classList.remove('active'));

    document.getElementById(screenId).classList.add('active');
  },

  switchTab(tabId) {
    document.querySelectorAll('.tab')
      .forEach(t => t.classList.remove('active'));

    const tab = document.getElementById('tab-' + tabId);
    if (tab) tab.classList.add('active');

    document.querySelectorAll('.nav-btn')
      .forEach(b => b.classList.remove('active'));

    const btn = document.getElementById('nav-' + tabId);
    if (btn) btn.classList.add('active');

    // 🔥 delegación a módulos (ya existentes)
    if (tabId === 'home') Dashboard.load();
    if (tabId === 'menu') Menu.loadTab();
    if (tabId === 'orders') Orders.loadAll();
    if (tabId === 'users') Users.load();
    if (tabId === 'profile') Profile.render();
  },

  toast(msg, duration = 2000) {
    const el = document.getElementById('toast');
    if (!el) return;

    el.textContent = msg;
    el.classList.add('show');

    setTimeout(() => el.classList.remove('show'), duration);
  },

  openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
  },

  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
  },

  withLoading(button, fn) {
    if (!button) return;

    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '...';

    return Promise.resolve(fn()).finally(() => {
      button.disabled = false;
      button.innerHTML = original;
    });
  },

  initConnectionMonitor() {
    const bar = document.getElementById('conn-bar');
    const label = document.getElementById('conn-label');

    const update = () => {
      State.isOnline = navigator.onLine;

      if (!bar || !label) return;

      bar.className = 'conn-bar ' + (State.isOnline ? 'online' : 'offline');
      label.textContent = State.isOnline
        ? 'Conectado'
        : 'Sin conexión';
    };

    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update();
  }
};
