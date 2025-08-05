import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './ui/App';

const init = async (): Promise<void> => {
    const store = {}
    const container = document.getElementById("root")

    await readyStateChangeDocument()

    if (!container) {
        throw new Error("cannot find the container node for react");
    }

    const root = createRoot(container)
    
    root.render(createElement(App, { store }))
    
    window.addEventListener('beforeunload', () => {
        root.unmount()
    })
}

function readyStateChangeDocument(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
      return;
    }

    const handleReadyStateChange = () => {
      if (document.readyState !== "complete") {
        return;
      }

      document.removeEventListener("readystatechange", handleReadyStateChange);
      resolve();
    };

    document.addEventListener("readystatechange", handleReadyStateChange);
  });
}

init()