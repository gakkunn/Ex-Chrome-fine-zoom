import { clamp } from '../utils/common';
import { ZOOM_STEP_KEY } from '../utils/zoomStep';
import { zoomStepManager } from '../utils/zoomStepManager';
import type { ZoomCommand } from '../types/global';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 5.0;

async function handleZoomCommand(command: ZoomCommand): Promise<void> {
  if (command !== 'zoom_in_fine' && command !== 'zoom_out_fine') {
    return;
  }

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (!tab || typeof tab.id !== 'number') {
      return;
    }

    const currentZoom = await chrome.tabs.getZoom(tab.id);
    const stepPercent = zoomStepManager.currentStepPercent;
    const delta = stepPercent / 100;
    const nextZoom = command === 'zoom_in_fine' ? currentZoom + delta : currentZoom - delta;

    await chrome.tabs.setZoom(tab.id, clamp(nextZoom, MIN_ZOOM, MAX_ZOOM));
  } catch (error) {
    console.error('Failed to handle zoom command:', error);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  void zoomStepManager.init();
});

void zoomStepManager.init();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') {
    return;
  }

  if (ZOOM_STEP_KEY in changes) {
    void zoomStepManager.refresh();
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (isZoomCommand(command)) {
    void handleZoomCommand(command);
  }
});

const zoomCommandNames: ZoomCommand[] = ['zoom_in_fine', 'zoom_out_fine'];

function isZoomCommand(command: string): command is ZoomCommand {
  return zoomCommandNames.includes(command as ZoomCommand);
}
