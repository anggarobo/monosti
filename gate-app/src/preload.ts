import { contextBridge, ipcRenderer } from "electron"
import { serial } from "./serial/preload"


console.log('[lrt desktop] preload.ts');

(async () => {
    contextBridge.exposeInMainWorld("api", {
        platform: () => ipcRenderer.invoke('platform'),
        // serial
    } satisfies Window["api"])
})()