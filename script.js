const tabs = [...document.querySelectorAll('.screen-tab')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function selectTab(tab, focus = false) {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== tab.getAttribute('aria-controls');
  });

  if (focus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectTab(tabs[nextIndex], true);
  });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: .08 });

  document.documentElement.classList.add('reveal-ready');
  revealItems.forEach((item) => observer.observe(item));
}
