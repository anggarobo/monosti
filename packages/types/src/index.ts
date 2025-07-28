export {};

type OsPlatform = {
  platform: "win32" | "linux" | "darwin";
  isMac: boolean;
  isLinux: boolean;
  isWindows: boolean;
  username: string;
  homepath: string;
};

interface SerialApi {
  listPorts: () => Promise<import("@serialport/bindings-interface").PortInfo[]>;
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

declare global {
  interface Window {
    api: {
      platform: OsPlatform
      serial: SerialApi;
    };
  }
}
