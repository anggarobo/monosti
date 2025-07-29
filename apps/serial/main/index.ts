import { app, BrowserWindow, globalShortcut, ipcMain, WebFrameMain } from 'electron';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
// import os from 'os';
import * as serial from './modules/serial.js';
import { createMenu } from './modules/menu.js';
import __path from './utils/path.js'
import __platform from './utils/platform.js'
import so from './modules/shared-object.js';

const isDev = !app.isPackaged;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.whenReady().then(() => {
  const preload_path = path.join(__dirname, '../preload/index.js')
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      preload: preload_path,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    }
  });

  win.once('ready-to-show', () => {
    console.log('Window ready to show');
    // console.log(process.env)
    win.show();
  });

  if (isDev) {
    console.log('Loading localhost...');
    win.loadURL('http://localhost:5173');
  } else {
    console.log('Loading local file...');
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // Coba panggil fungsi dari .so/.dll
  console.log('[nativeffi] Datetime:', so.getCurrentDatetime());
  console.log('[nativeffi] InputParam:', so.getInputParam(12345));
  serial.init(win)
  createMenu(win, isDev)
  ipcMain.handle("platform", (e) => {
    if (e.senderFrame) validateEventFrame(e.senderFrame);
    return __platform
  });

  // Global Keyboard Shortcut
  globalShortcut.register("CmdOrCtrl+R", () => {
    win.reload();
  });

  globalShortcut.register("CmdOrCtrl+I", () => {
    win.webContents.toggleDevTools();
  });
});

app.on("will-quit", () => {
  // unregister all shortcut when app quits
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  serial.close();
  if (process.platform !== "darwin") {
    app.quit();
  }
});


export function validateEventFrame(frame: WebFrameMain) {
  if (isDev && new URL(frame.url).host === "localhost:5173") {
    return;
  }
  if (frame.url !== pathToFileURL(__path.RENDERER_PATH).toString()) {
    throw new Error("Malicious event");
  }
}


