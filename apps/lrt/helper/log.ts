import { app } from "electron";
import fs from "fs";
import path from "path";

const logPath = path.join(app.getPath("userData"), "serial.log");
const logStream = fs.createWriteStream(logPath, { flags: "a" });

const logMessage = (msg: string) => `[${new Date().toISOString()}] ${msg}`

export default {
  log: (msg: string) => {
    console.log(logMessage(msg));
    logStream.write(logMessage(msg) + "\n")
  },
  error: (msg: string) => {
    console.error(logMessage(msg));
    logStream.write(logMessage(msg) + "\n")
  }
}