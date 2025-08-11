export {}

type Platform = {
  platform: "win32" | "linux" | "darwin";
  username: string;
  homepath: string;
};


declare global {
  interface Window {
    api: {
      platform: () => Promise<Platform>;
      // serial: SerialApi;
    }
  }
}
