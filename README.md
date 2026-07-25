# ncSender Pendant Plugin

`com.ncsender.pendant`

Adds a **Pendant** tool-menu entry to ncSender for managing the wireless pendant:

- **Activation** — enter your Installation ID to license the connected pendant (and deactivate it).
- **Firmware** — check for updates, flash the latest firmware over the air, or flash a `.bin` from file.
- **Status** — shows whether the pendant is connected (USB or via the Wireless USB dongle) and its firmware version.

Pendant **communication** (DRO, jog, serial) stays in the core app. **Pairing / unpairing**
lives in the core **Wireless USB** dialog, not here.

## How it works

This is a UI-only plugin. It opens `config.html` in a dialog and calls the core endpoints:

- `GET  /api/pendant/status`
- `POST /api/pendant/activate-usb` · `POST /api/pendant/deactivate-usb`
- `GET  /api/pendant/firmware/check`
- `POST /api/pendant/firmware/update` · `POST /api/pendant/firmware/flash-file` · `POST /api/pendant/firmware/cancel`

## License

GPL-3.0 — see [LICENSE-GPL-3.0](LICENSE-GPL-3.0).
