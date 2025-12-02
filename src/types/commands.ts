export const ZOOM_COMMANDS = ['zoom_in_fine', 'zoom_out_fine'] as const;

export type ZoomCommand = (typeof ZOOM_COMMANDS)[number];

export const isZoomCommand = (command: string): command is ZoomCommand =>
  ZOOM_COMMANDS.includes(command as ZoomCommand);

export const SHORTCUT_ELEMENT_IDS: Record<ZoomCommand, string> = {
  zoom_in_fine: 'shortcut-zoom-in',
  zoom_out_fine: 'shortcut-zoom-out',
};
