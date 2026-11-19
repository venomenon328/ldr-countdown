import { getCountdown, loadTargetDate } from './countdown.mjs';

const status = document.getElementById('status');
const countdown = document.getElementById('countdown');
const defaultLink = document.getElementById('default-link');
const wholeNumber = new Intl.NumberFormat('de-DE');
const decimalNumber = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

function readFields(group) {
  return Object.fromEntries(
    Array.from(countdown.querySelectorAll(`[data-${group}]`), element => [
      element.getAttribute(`data-${group}`),
      element,
    ]),
  );
}

const result = await loadTargetDate(window.location.href);
if (result.error === 'date') {
  status.textContent = 'Der URL-Parameter „date“ ist leer oder enthält keinen gültigen Termin.';
  defaultLink.href = result.defaultUrl;
  defaultLink.hidden = false;
} else if (result.error === 'config') {
  status.textContent = 'In countdown.json fehlt ein gültiger Termin im Feld „targetDate“.';
} else {
  startCountdown(result.targetTime);
}

function startCountdown(targetTime) {
  const units = readFields('unit');
  const totals = readFields('total');
  let timer;

  function render() {
    clearTimeout(timer);
    const state = getCountdown(targetTime, Date.now());

    for (const unit of Object.keys(units)) {
      units[unit].textContent = wholeNumber.format(state.units[unit]);
      const formatter = unit === 'seconds' ? wholeNumber : decimalNumber;
      totals[unit].textContent = formatter.format(state.totals[unit]);
    }

    countdown.dataset.stage = state.stage;
    countdown.dataset.progress = state.progress;
    countdown.hidden = false;
    status.textContent = state.remainingMs === 0 ? 'Wiedersehen!' : '';

    if (state.remainingMs > 0) {
      timer = setTimeout(render, state.remainingMs % 1_000 || 1_000);
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) render();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) render();
  });
  render();
}
