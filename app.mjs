import { getCountdown, loadTargetDate } from './countdown.mjs';

const scene = document.getElementById('scene');
const status = document.getElementById('status');
const countdown = document.getElementById('countdown');
const defaultLink = document.getElementById('default-link');
const placeholder = document.getElementById('placeholder');
const characters = document.getElementById('characters');
const georgia = characters.querySelector('.character--georgia img');
const tobias = characters.querySelector('.character--tobias img');
const couple = characters.querySelector('.character--couple img');
const clockNumber = new Intl.NumberFormat('de-DE', { minimumIntegerDigits: 2 });
const wholeNumber = new Intl.NumberFormat('de-DE');
const decimalNumber = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});
const moods = [
  'Georgia und Tobias vermissen einander sehr.',
  'Georgia und Tobias blicken traurig zueinander.',
  'Georgia und Tobias lächeln einander zaghaft zu.',
  'Georgia und Tobias freuen sich aufeinander.',
  'Georgia und Tobias können das Treffen kaum erwarten.',
  'Wiedersehen. Georgia und Tobias umarmen sich.',
];

function stageImages(stage) {
  const directory = './assets/characters/stages/';
  return stage === 6
    ? [directory + '06-wiedersehen.png']
    : [directory + `0${stage}-georgia.png`, directory + `0${stage}-tobias.png`];
}

function showStage(stage) {
  const finale = stage === 6;
  const images = stageImages(stage);
  if (finale) {
    [couple.src] = images;
  } else {
    [georgia.src, tobias.src] = images;
  }
  georgia.parentElement.hidden = finale;
  tobias.parentElement.hidden = finale;
  couple.parentElement.hidden = !finale;
  characters.hidden = false;
  scene.dataset.state = finale ? 'finale' : 'running';
  countdown.dataset.stage = stage;
  status.textContent = moods[stage - 1];

  if (!finale) {
    for (const src of stageImages(stage + 1)) {
      const nextImage = new Image();
      nextImage.src = src;
    }
  }
}

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
  scene.dataset.state = 'error';
  status.textContent = 'Der URL-Parameter „date“ ist leer oder enthält keinen gültigen Termin.';
  defaultLink.href = result.defaultUrl;
  defaultLink.hidden = false;
} else if (result.error === 'config') {
  scene.dataset.state = 'error';
  status.textContent = 'In countdown.json fehlt ein gültiger Termin im Feld „targetDate“.';
} else {
  placeholder.hidden = true;
  startCountdown(result.targetTime);
}

function startCountdown(targetTime) {
  const units = readFields('unit');
  const totals = readFields('total');
  const unitNames = Object.keys(units);
  let timer;
  let lastStage;
  let lastDayLength;

  function render() {
    clearTimeout(timer);
    const state = getCountdown(targetTime, Date.now());

    for (const unit of unitNames) {
      units[unit].textContent = clockNumber.format(state.units[unit]);
      const formatter = unit === 'seconds' ? wholeNumber : decimalNumber;
      totals[unit].textContent = formatter.format(state.totals[unit]);
    }

    const dayLength = units.days.textContent.length;
    if (dayLength !== lastDayLength) {
      scene.style.setProperty('--day-length', dayLength);
      lastDayLength = dayLength;
    }
    scene.style.setProperty('--progress', state.progress);
    countdown.dataset.progress = state.progress;
    countdown.hidden = false;
    if (state.stage !== lastStage) {
      showStage(state.stage);
      lastStage = state.stage;
    }

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
