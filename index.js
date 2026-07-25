import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolveServerPort = (pluginSettings = {}, appSettings = {}) => {
  const appPort = Number.parseInt(appSettings?.senderPort, 10);
  if (Number.isFinite(appPort)) return appPort;
  const pluginPort = Number.parseInt(pluginSettings?.port, 10);
  if (Number.isFinite(pluginPort)) return pluginPort;
  return 8090;
};

export async function onLoad(ctx) {
  ctx.log('Pendant plugin loaded');

  // UI-only plugin: opens a dialog that drives the core /api/pendant/* endpoints
  // (activation + firmware). Pendant communication (DRO/jog/serial) stays in core;
  // pairing/unpairing lives in the core Wireless USB dialog.
  ctx.registerToolMenu('Pendant', async () => {
    const storedSettings = ctx.getSettings() || {};
    const appSettings = ctx.getAppSettings() || {};
    const serverPort = resolveServerPort(storedSettings, appSettings);

    let html = readFileSync(join(__dirname, 'config.html'), 'utf-8');
    html = html.replace('__SERVER_PORT__', String(serverPort));

    ctx.showDialog('Pendant', html, { closable: true, width: '560px' });
  }, { icon: 'icon.png' });
}

export function onUnload() {
  console.log('[PLUGIN:com.ncsender.pendant] Pendant plugin unloaded');
}
