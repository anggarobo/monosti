import { app, BrowserWindow, globalShortcut, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import * as serial from './modules/serial';

const isDev = !app.isPackaged;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.whenReady().then(() => {
  console.log('App is ready');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    }
  });

  win.once('ready-to-show', () => {
    console.log('Window ready to show');
    win.show();
  });

  if (isDev) {
    console.log('Loading localhost...');
    win.loadURL('http://localhost:5173');
  } else {
    console.log('Loading local file...');
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  serial.init(win)
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


