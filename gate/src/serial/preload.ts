import { ipcRenderer } from 'electron';

export interface SerialApi {
  listing: () => Promise<import("@serialport/bindings-interface").PortInfo[]>;
  connect: (path: string, baudRate?: number) => void;
  onData: (callback: (data: any) => void) => void;
  onStatus: (callback: (data: string) => void) => void;
  sendData: (data: { path: string; data: string }) => void;
  onPortListChanged: (
    callback: (info: {
      added: string[];
      removed: string[];
      current: string[];
    }) => void,
  ) => void;
}

export const serial: SerialApi = {
    connect: (path: string, baudRate: number = 9600) => {
    return ipcRenderer.invoke("serial-connect", path, baudRate).then(() => {
        ipcRenderer.invoke("serial-setupEvents");
    });
    },
    listing: () => ipcRenderer.invoke("serial-list"),
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
}