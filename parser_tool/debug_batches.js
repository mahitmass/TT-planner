const fs = require('fs');
const c = fs.readFileSync('js/data.js', 'utf8');
const m = c.match(/"([^"]+)":\s*\[/g);
if (m) {
    m.forEach(x => {
        const name = x.replace(/"\s*:\s*\[/, '').replace(/"/g, '');
        console.log(name);
    });
}
