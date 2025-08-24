import { exec } from 'child_process';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function openConsoleWindow() {
    const platform = os.platform(); // 'win32', 'linux', 'darwin'
    const scriptPath = path.join(__dirname, './console-script.js');

    console.log(`[console] Platform: ${platform}`);
    console.log(`[console] Script path: ${scriptPath}`);

    if (platform === 'win32') {
        // ✅ Windows: Open Command Prompt and run the Node script
        exec(`start cmd.exe /k node "${scriptPath}"`, (err) => {
        if (err) console.error(`[console] Failed to open CMD: ${err.message}`);
        });

    } else if (platform === 'linux') {
        // ✅ Linux: Check for available terminal emulators in order of preference
        const terminals = [
        {
            name: 'GNOME Terminal',
            command: `gnome-terminal -- bash -c "node '${scriptPath}'; exec bash"`,
            detect: 'which gnome-terminal'
        },
        {
            name: 'Konsole (KDE)',
            command: `konsole -e node '${scriptPath}'`,
            detect: 'which konsole'
        },
        {
            name: 'XFCE Terminal',
            command: `xfce4-terminal --command="bash -c 'node \\"${scriptPath}\\"; exec $SHELL'"`,
            detect: 'which xfce4-terminal'
        },
        {
            name: 'xterm',
            command: `xterm -hold -e "node '${scriptPath}'"`,
            detect: 'which xterm'
        }
        ];

        const tryNext = (index: number) => {
        if (index >= terminals.length) {
            console.error('[console] No supported terminal emulator found.');
            return;
        }

        const term = terminals[index];
        exec(term.detect, (err, stdout) => {
            if (!err && stdout) {
            console.log(`[console] Using terminal: ${term.name}`);
            exec(term.command, (termErr) => {
                if (termErr) {
                console.error(`[console] Failed to launch ${term.name}: ${termErr.message}`);
                tryNext(index + 1);
                }
            });
            } else {
            tryNext(index + 1);
            }
        });
        };

        tryNext(0);

    } else {
        console.log(`[console] Unsupported platform: ${platform}`);
    }
}
