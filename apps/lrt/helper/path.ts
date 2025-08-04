import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getCurrentPath() {
    return path.join(__dirname, "")
}

export default {
    getCurrentPath,
    readdir: (dir: string) => path.join(__dirname, dir),
    path
}