export type ChannelToArgsMap = {
    "serial/send": (_e: any, payload: { path: string; data: string }) => void,
    "serial/listing": () => { 
        standard: import("@serialport/bindings-interface").PortInfo, 
        input: import("@serialport/bindings-interface").PortInfo,
        output: import("@serialport/bindings-interface").PortInfo,
    },
    "serial/watch": { added: string[], removed: string[], current: string[] },
    "serial/status": any,
    "serial/data": { path: string, data: any }
}

export type Channel = keyof ChannelToArgsMap;
export type Handler<N extends Channel> = ChannelToArgsMap[N];