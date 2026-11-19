import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getCountdown, loadTargetDate } from './countdown.mjs';

const day = 24 * 60 * 60 * 1_000;
const target = Date.UTC(2027, 0, 15, 17);
const page = 'https://example.test/wiedersehen/';

test('chooses the stage at each boundary using unrounded remaining time', () => {
  for (const [days, stage] of [[21, 2], [14, 3], [7, 4], [1, 5], [0, 6]]) {
    const boundary = target - days * day;
    assert.equal(getCountdown(target, boundary - 1).stage, stage - 1, `before ${days} days`);
    assert.equal(getCountdown(target, boundary).stage, stage, `at ${days} days`);
    assert.equal(getCountdown(target, boundary + 1).stage, stage, `after ${days} days`);
  }
});

test('returns the display units and total values from the same remaining time', () => {
  const remainingMs = day + 2 * 3_600_000 + 3 * 60_000 + 4_000;
  const state = getCountdown(target, target - remainingMs);
  assert.deepEqual(state.units, { days: 1, hours: 2, minutes: 3, seconds: 4 });
  assert.deepEqual(state.totals, {
    days: remainingMs / day,
    hours: remainingMs / 3_600_000,
    minutes: remainingMs / 60_000,
    seconds: 93_784,
  });

  const justBefore = getCountdown(target, target - 1);
  assert.equal(justBefore.units.seconds, 1);
  assert.equal(justBefore.totals.seconds, 1);
  assert.ok(justBefore.progress < 1);

  const ended = getCountdown(target, target + day);
  const zeroes = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  assert.deepEqual(ended, { remainingMs: 0, units: zeroes, totals: zeroes, stage: 6, progress: 1 });
});

test('moves linearly over four weeks, including within a single stage', () => {
  for (const [days, progress] of [[35, 0], [28, 0], [21, 0.25], [14, 0.5], [7, 0.75], [0, 1], [-1, 1]]) {
    assert.equal(getCountdown(target, target - days * day).progress, progress);
  }
  assert.equal(getCountdown(target, target - 35 * day).units.days, 35);

  const earlier = getCountdown(target, target - 20 * day);
  const later = getCountdown(target, target - 18 * day);
  assert.equal(earlier.stage, later.stage);
  assert.ok(earlier.progress < later.progress);
});

test('fetches the relative config afresh on every call without a URL override', async () => {
  const configs = ['2027-01-15T18:00:00+01:00', '2027-01-16T17:00:00Z'];
  const calls = [];
  function fetchConfig(url, options) {
    calls.push([url.href, options.cache]);
    return Response.json({ targetDate: configs.shift() });
  }
  assert.deepEqual(await loadTargetDate(page, fetchConfig), { targetTime: target });
  assert.deepEqual(await loadTargetDate(page, fetchConfig), { targetTime: target + day });
  const configRequest = ['https://example.test/wiedersehen/countdown.json', 'no-store'];
  assert.deepEqual(calls, [configRequest, configRequest]);
});

test('accepts equivalent UTC and encoded-offset overrides and local browser times', async () => {
  let requests = 0;
  function fetchConfig() {
    requests += 1;
    return Response.json({ targetDate: null });
  }
  for (const value of ['2027-01-15T17:00:00Z', '2027-01-15T18:00:00%2B01:00']) {
    assert.deepEqual(await loadTargetDate(`${page}?date=${value}`, fetchConfig), { targetTime: target });
  }
  assert.deepEqual(await loadTargetDate(`${page}?date=2027-01-15T18:00`, fetchConfig), {
    targetTime: new Date(2027, 0, 15, 18).getTime(),
  });
  assert.equal(requests, 0);
});

test('distinguishes empty or invalid overrides from a valid expired target', async () => {
  for (const value of ['', 'morgen', '2027-02-30T18:00:00Z', '2027-01-15T18:00:00+01:00']) {
    assert.deepEqual(await loadTargetDate(`${page}?date=${value}&test=1#details`), {
      error: 'date',
      defaultUrl: `${page}?test=1#details`,
    });
  }
  const expired = await loadTargetDate(`${page}?date=2027-01-14T17:00:00Z`);
  assert.equal(getCountdown(expired.targetTime, target).stage, 6);
});

test('reports missing, unreadable, unset and invalid configs', async () => {
  const configs = [
    new Response(null, { status: 404 }),
    new Response('{'),
    Response.json(null),
    Response.json({}),
    Response.json({ targetDate: null }),
    Response.json({ targetDate: 0 }),
    Response.json({ targetDate: '2027-01-15T18:00:00' }),
    Response.json({ targetDate: '2027-02-30T18:00:00Z' }),
    Response.json({ targetDate: '2027-01-15T18:00:00+25:00' }),
    Response.json({ targetDate: '2027-01-15T18:00:00Z', extra: true }),
  ];
  for (const response of configs) {
    assert.deepEqual(await loadTargetDate(page, () => response), { error: 'config' });
  }
  assert.deepEqual(await loadTargetDate(page, () => Promise.reject(new Error('offline'))), { error: 'config' });
});
