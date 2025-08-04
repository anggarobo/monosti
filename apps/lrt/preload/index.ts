import { contextBridge, ipcRenderer } from "electron";
import print from "../helper/log";
import type { Platform } from "../types";

(async () => {
    print.log("Preload is run!")
    const platform = () => ipcRenderer.invoke('platform') as Promise<Platform>
    contextBridge.exposeInMainWorld("api", {
        platform,
        serial: {
            list: () => ipcRenderer.invoke("serial-list")
        }
    } satisfies Window["api"])
})()