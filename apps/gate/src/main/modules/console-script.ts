// import fs from 'fs';

// fs.watch('.', { recursive: true }, (eventType, filename) => {
//   console.log(`[${new Date().toISOString()}] ${filename} changed: ${eventType}`);
// });

console.log("✅ Console window is running!");

setInterval(() => {
  console.log("⏰ Tick at", new Date().toLocaleTimeString());
}, 2000);
