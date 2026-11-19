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
const stages = [
  { pair: '01', status: 'Georgia und Tobias vermissen einander sehr.' },
  { pair: '02', status: 'Georgia und Tobias blicken traurig zueinander.' },
  { pair: '03-foto', status: 'Georgia drückt ein Foto von Tobias an sich. Tobias streicht über den Rand eines Fotos von Georgia.' },
  { pair: '03', status: 'Georgia legt die Hand ans Herz. Tobias lächelt zaghaft zurück.' },
  { pair: '05-handykuss', status: 'Georgia schickt Tobias einen Handkuss per Handy. Tobias wird rot.' },
  { pair: '04', status: 'Georgia und Tobias freuen sich mit offenen Armen aufeinander.' },
  { pair: '07-controller', status: 'Georgia neigt den Kopf, hält die Hände hinter dem Rücken und lächelt versonnen. Tobias grinst zufrieden, eine Hand in der Hosentasche.' },
  { pair: '08-platz-fuer-zwei', status: 'Georgia legt mit leuchtenden Augen die Hände unter dem Kinn zusammen. Tobias lehnt sich leicht nach vorn, hebt die Brauen und strahlt.' },
  { pair: '05', status: 'Georgia und Tobias können das Treffen kaum erwarten.' },
  { pair: '10-kofferpacken', status: 'Tobias drückt einen weißen Pulli in den offenen beigen Rollkoffer. Georgia schüttelt das zweite Kopfkissen auf.' },
  { pair: '11-aufbruch', status: 'Tobias bindet sich im Stehen den Schuh. Georgia schaut auf die Uhr und wippt auf den Zehenspitzen.' },
  { pair: '12-anreise', status: 'Tobias zieht seinen geschlossenen beigen Rollkoffer hinter sich her. Georgia hält lächelnd nach ihm Ausschau.' },
  { couple: '06-wiedersehen', status: 'Wiedersehen. Georgia und Tobias umarmen sich.' },
];

function stageImages({ pair, couple }) {
  const directory = './assets/characters/stages/';
  return couple
    ? [`${directory}${couple}.png`]
    : [`${directory}${pair}-georgia.png`, `${directory}${pair}-tobias.png`];
}

function showStage(stage) {
  const current = stages[stage - 1];
  const finale = Boolean(current.couple);
  const images = stageImages(current);
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
  status.textContent = current.status;

  const next = stages[stage];
  if (next) {
    for (const src of stageImages(next)) {
      const nextImage = new Image();
      nextImage.src = src;
    }
  }
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
  const fields = countdown.querySelectorAll('[data-unit]');
  const dayField = countdown.querySelector('[data-unit="days"]');
  let timer;
  let lastStage;
  let lastDayLength;

  function render() {
    clearTimeout(timer);
    const state = getCountdown(targetTime, Date.now());

    for (const field of fields) {
      field.textContent = clockNumber.format(state.units[field.dataset.unit]);
    }

    const dayLength = dayField.textContent.length;
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
