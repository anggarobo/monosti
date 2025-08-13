/// <reference types="vite/client" />

interface Process extends NodeJS.Process {
    env: {
        VITE_DEV_SERVER_URL?: string;
        VITE_APP_VERSION?: string;
    };
}

declare var process: Process
