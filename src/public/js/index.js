import { html, render } from './preact.js';

import Application from './Application.js';

const mountPoint = document.getElementById('app');

render(html` <${Application} /> `, mountPoint);
