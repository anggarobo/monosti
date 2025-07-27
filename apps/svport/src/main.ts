import App from './App.svelte';
import { greet } from '@packages/utils';

console.log(greet('Svelte User'));

const app = new App({
  target: document.getElementById('app')!
});

export default app;
