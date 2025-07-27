import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('api', {
    platform: async () => {
        return await ipcRenderer.invoke('get-platform');
    }
});
