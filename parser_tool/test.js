const parser = require('./parser.js');
// Need to export parseCellStringTokens in parser.js or just copy it, but wait, I can just require it if I expose it.
// Wait, parseCellStringTokens is not exported. Let me just read it and eval it.
const fs = require('fs');
let code = fs.readFileSync('parser.js', 'utf8');
code = code.replace('main();', 'console.log(parseCellStringTokens("PC1 (BT271)BTech III Biochem Tech Lab, (ANS, SMG)", 3, ["PC1"]));');
eval(code);
