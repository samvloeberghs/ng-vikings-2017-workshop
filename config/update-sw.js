'use strict';
const fs = require('fs');
const path = require('path');

const serviceWorker = path.join(process.cwd(), 'src/service-worker.js');

// Read `package.json` contents
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));

// Read `service-worker.js` contents and replace the version
let contents = fs.readFileSync(serviceWorker, 'utf8');
contents = contents.replace(/^const VERSION = (?:.*?)$/m, `const VERSION = 'v${pkg.version}';`);

// Overwrite `service-worker.js`
fs.writeFileSync(serviceWorker, contents, 'utf8');

console.log('Service worker version updated');
