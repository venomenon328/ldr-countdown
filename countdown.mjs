const SECOND = 1_000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const APPROACH_DURATION = 28 * DAY;

const STAGE_BOUNDARIES = [21 * DAY, 14 * DAY, 7 * DAY, DAY, 0];
const ISO_DATE_TIME = /^(\d{4})-(\d{2})-(\d{2})(?:T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(Z|[+-](?:[01]\d|2[0-3]):?[0-5]\d)?)?$/;

function parseDate(value, requireOffset) {
  if (typeof value !== 'string') return null;

  const match = ISO_DATE_TIME.exec(value);
  if (!match || match[0] !== value) return null;

  const [, year, month, day, offset] = match;
  if (requireOffset && !offset) return null;

  // Date.parse can normalize dates such as February 30.
  const monthEnd = new Date(0);
  monthEnd.setUTCFullYear(Number(year), Number(month), 0);
  if (Number(month) < 1 || Number(month) > 12 ||
      Number(day) < 1 || Number(day) > monthEnd.getUTCDate()) {
    return null;
  }

  const dateTime = value.length === 10 ? `${value}T00:00` : value;
  const timestamp = Date.parse(dateTime);
  return Number.isFinite(timestamp) ? timestamp : null;
}

export async function loadTargetDate(pageUrl, fetchConfig = fetch) {
  const url = new URL(pageUrl);
  if (url.searchParams.has('date')) {
    const targetTime = parseDate(url.searchParams.get('date'), false);
    if (targetTime !== null) return { targetTime };

    url.searchParams.delete('date');
    return { error: 'date', defaultUrl: url.href };
  }

  try {
    const response = await fetchConfig(new URL('./countdown.json', url), { cache: 'no-store' });
    if (response.ok) {
      const config = await response.json();
      if (config && typeof config === 'object' && Object.keys(config).length === 1) {
        const targetTime = parseDate(config.targetDate, true);
        if (targetTime !== null) return { targetTime };
      }
    }
  } catch {
    return { error: 'config' };
  }

  return { error: 'config' };
}

export function getCountdown(targetTime, now) {
  const remainingMs = Math.max(0, targetTime - now);
  // Keep a second visible until the actual target instant.
  const totalSeconds = Math.ceil(remainingMs / SECOND);
  const passedBoundaries = STAGE_BOUNDARIES.filter(boundary => remainingMs <= boundary);

  return {
    remainingMs,
    units: {
      days: Math.floor(totalSeconds / 86_400),
      hours: Math.floor(totalSeconds / 3_600) % 24,
      minutes: Math.floor(totalSeconds / 60) % 60,
      seconds: totalSeconds % 60,
    },
    stage: 1 + passedBoundaries.length,
    progress: 1 - Math.min(remainingMs / APPROACH_DURATION, 1),
  };
}
