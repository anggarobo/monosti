import { contextBridge, ipcRenderer } from 'electron';

(async () => {
  console.log("PRELOAD!!!\n")
  const platform = () => ipcRenderer.invoke('platform');
  contextBridge.exposeInMainWorld('api', {
    platform,
    serial: {
      connect: (path: string, baudRate: number = 9600) => {
        return ipcRenderer.invoke("serial-connect", path, baudRate).then(() => {
          ipcRenderer.invoke("serial-setupEvents");
        });
      },
      listPorts: () => ipcRenderer.invoke("serial-list"),
      sendData: (data: any) => {
        console.log("send data", { data })
        ipcRenderer.send("serial-send", data)
      },
      onData: (callback: (info: { path: string; data: string; }) => void) => ipcRenderer.on("serial-data", (_e, info) => {
        console.log("preload", { info })
        callback(info)
      }),
      onStatus: (callback: (status: string) => void) => ipcRenderer.on("serial-status", (_, status) => callback(status)),
      onPortListChanged: (
        callback: (info: {
          added: string[];
          removed: string[];
          current: string[];
        }) => void
      ) => ipcRenderer.on("serial-ports-updated", (_e, info) => callback(info)),
    },
  } satisfies Window["api"] ) 
})()
