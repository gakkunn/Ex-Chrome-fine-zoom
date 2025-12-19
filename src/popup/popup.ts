import { SHORTCUT_ELEMENT_IDS, type ZoomCommand } from '../types/commands';
import {
  MAX_ZOOM_STEP_PERCENT,
  MIN_ZOOM_STEP_PERCENT,
  loadZoomStepPercent,
  saveZoomStepPercent,
  sanitizeZoomStep,
} from '../utils/zoomStep';

const SHORTCUT_SETTINGS_URL = 'chrome://extensions/shortcuts';

function getElement<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function setElementText(id: string, text: string): void {
  const element = getElement<HTMLElement>(id);
  if (element) {
    element.textContent = text;
  }
}

function getMessage(key: string): string {
  return chrome.i18n.getMessage(key) || '';
}

function applyI18n(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
  for (const element of elements) {
    const key = element.dataset.i18n;
    if (key) {
      const message = getMessage(key);
      if (message) {
        element.textContent = message;
      }
    }
  }
}

function renderStepLabels(step: number): void {
  const text = String(step);
  setElementText('current-step-value', text);
  setElementText('selected-step-value', text);
}

function createDebouncedSaver(delay = 250): (value: number) => void {
  let timer: number | undefined;
  return (value: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      void saveZoomStepPercent(value);
    }, delay);
  };
}

async function loadShortcuts(): Promise<void> {
  try {
    const commands = await chrome.commands.getAll();
    const entries = Object.entries(SHORTCUT_ELEMENT_IDS) as [ZoomCommand, string][];
    const defaultLabel = getMessage('popup_shortcut_not_set');
    for (const [commandName, elementId] of entries) {
      const shortcut = commands.find((command) => command.name === commandName)?.shortcut;
      setElementText(elementId, shortcut ?? defaultLabel);
    }
  } catch (error) {
    console.error('Failed to load shortcuts:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  applyI18n();

  const range = getElement<HTMLInputElement>('zoom-step-range');
  if (!range) {
    return;
  }

  range.min = String(MIN_ZOOM_STEP_PERCENT);
  range.max = String(MAX_ZOOM_STEP_PERCENT);

  void loadShortcuts();

  const defaultStep = await loadZoomStepPercent();
  range.value = String(defaultStep);
  renderStepLabels(defaultStep);

  const scheduleSaveZoomStepPercent = createDebouncedSaver();

  range.addEventListener('input', () => {
    const sanitizedStep = sanitizeZoomStep(range.value);
    range.value = String(sanitizedStep);
    renderStepLabels(sanitizedStep);
    scheduleSaveZoomStepPercent(sanitizedStep);
  });

  const shortcutSettingsLink = getElement<HTMLAnchorElement>('open-shortcut-settings');
  if (shortcutSettingsLink) {
    shortcutSettingsLink.addEventListener('click', (event) => {
      event.preventDefault();
      try {
        chrome.tabs.create({ url: SHORTCUT_SETTINGS_URL });
      } catch (error) {
        console.error('Failed to open shortcuts settings page:', error);
      }
    });
  }
});
