import {
  DEFAULT_ZOOM_STEP_PERCENT,
  ensureDefaultZoomStepPercent,
  loadZoomStepPercent,
} from './zoomStep';

class ZoomStepManager {
  private cachedStepPercent = DEFAULT_ZOOM_STEP_PERCENT;

  get currentStepPercent(): number {
    return this.cachedStepPercent;
  }

  async init(): Promise<void> {
    await ensureDefaultZoomStepPercent();
    await this.refresh();
  }

  async refresh(): Promise<void> {
    this.cachedStepPercent = await loadZoomStepPercent();
  }
}

export const zoomStepManager = new ZoomStepManager();
