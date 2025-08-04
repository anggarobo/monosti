export {}

export interface Platform {
    platform: "win32" | "linux" | "darwin";
    username: string
}

interface SerialApi {
    list: () => Promise<import("serialport").PortInfo[]>
}

interface WindowApi {
    platform: () => Promise<Platform>
    serial: SerialApi
}

declare global {
    interface Window {
        api: WindowApi
    }
}