import { clamp } from './common';

export const ZOOM_STEP_KEY = 'zoomStepPercent';
export const DEFAULT_ZOOM_STEP_PERCENT = 5;
export const MIN_ZOOM_STEP_PERCENT = 1;
export const MAX_ZOOM_STEP_PERCENT = 10;

function coerceToNumber(value: unknown): number | undefined {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function parseStoredStep(value: unknown): number | undefined {
  const numeric = coerceToNumber(value);
  if (numeric === undefined) {
    return undefined;
  }

  const rounded = Math.round(numeric);
  if (rounded < MIN_ZOOM_STEP_PERCENT || rounded > MAX_ZOOM_STEP_PERCENT) {
    return undefined;
  }

  return rounded;
}

export function sanitizeZoomStep(value: unknown): number {
  const numeric = coerceToNumber(value);
  if (numeric === undefined) {
    return DEFAULT_ZOOM_STEP_PERCENT;
  }

  return clamp(Math.round(numeric), MIN_ZOOM_STEP_PERCENT, MAX_ZOOM_STEP_PERCENT);
}

export async function loadZoomStepPercent(): Promise<number> {
  try {
    const data = await chrome.storage.sync.get(ZOOM_STEP_KEY);
    const mostRecent = parseStoredStep(data[ZOOM_STEP_KEY]);
    return mostRecent ?? DEFAULT_ZOOM_STEP_PERCENT;
  } catch (error) {
    console.error('Failed to load zoom step percent:', error);
    return DEFAULT_ZOOM_STEP_PERCENT;
  }
}

export async function saveZoomStepPercent(value: number): Promise<void> {
  try {
    await chrome.storage.sync.set({ [ZOOM_STEP_KEY]: value });
  } catch (error) {
    console.error('Failed to save zoom step percent:', error);
  }
}

export async function ensureDefaultZoomStepPercent(): Promise<void> {
  try {
    const data = await chrome.storage.sync.get(ZOOM_STEP_KEY);
    if (data[ZOOM_STEP_KEY] === undefined) {
      await chrome.storage.sync.set({ [ZOOM_STEP_KEY]: DEFAULT_ZOOM_STEP_PERCENT });
    }
  } catch (error) {
    console.error('Failed to ensure default zoom step percent', error);
  }
}
