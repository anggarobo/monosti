import { BrowserWindow, WebPreferences } from "electron";
import { createModuleRunner } from "./modules/runner";
import { createWindowManagerModule } from "./modules/windowManager";
import type { AppInitConfig } from "./modules/types";
import { disallowMultipleAppInstance } from "./modules/instance";
import { terminateAppOnLastWindowClose } from "./modules/terminate";
import { hardwareAccelerationMode } from "./modules/hardwareAcceleration";
import { fileURLToPath } from 'node:url';

const webPreferences: WebPreferences = {
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false,
}

let __mainWindow: BrowserWindow | null = null;
const platformTitleBarStyle = process.platform === 'darwin' ? 'hidden' : 'default';

export const getMainWindow = (): Promise<BrowserWindow> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      __mainWindow ? resolve(__mainWindow) : reject(new Error());
    }, 300);
  });

export const createMainWindow = (): void => {
  __mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 400,
    minHeight: 400,
    titleBarStyle: platformTitleBarStyle,
    backgroundColor: '#2f343d',
    show: false,
    webPreferences,
  });

  __mainWindow.addListener('close', (event: any) => {
    event.preventDefault();
  });
}

async function initApp(initConfig: AppInitConfig) {
    const init = createModuleRunner()
        .init(createWindowManagerModule({ initConfig, openDevTools: import.meta.env.DEV }))
        .init(disallowMultipleAppInstance())
        .init(terminateAppOnLastWindowClose())
        .init(hardwareAccelerationMode({enable: false}))
    
    await init
}


initApp({
  preload: {
    path: fileURLToPath(import.meta.resolve("./preload"))
  },
  renderer: process.env.VITE_APP_VERSION || !!process.env.VITE_DEV_SERVER_URL ? new URL(import.meta.env.VITE_DEV_SERVER_URL!) : {
    path: fileURLToPath(import.meta.resolve("./renderer"))
  }
})