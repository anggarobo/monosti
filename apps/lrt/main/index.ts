import { app, BrowserWindow, globalShortcut } from 'electron';
import { log, path } from '../helper';


app.whenReady().then(() => {
    const PRELOAD__PATH = path.readdir("../preload/")
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
        preload: PRELOAD__PATH,
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false,
        }
    })

    mainWindow.once('ready-to-show', () => {
        print.log('Window ready to show');
        mainWindow.show();
    });
})

app.on("will-quit", () => {
    globalShortcut.unregisterAll()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})