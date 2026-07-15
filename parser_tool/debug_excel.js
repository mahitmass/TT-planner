const XLSX = require('xlsx');
const path = require('path');
const filePath = path.join(__dirname, '../raw_data/62.xlsx');
const workbook = XLSX.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Check column 3 of row 1
const cell = sheet[XLSX.utils.encode_cell({ r: 1, c: 3 })];
console.log('Row 1 Col 3:', cell ? JSON.stringify(cell) : 'EMPTY');

// Check if column 3 is merged
const merges = sheet['!merges'] || [];
merges.forEach(m => {
    if (m.s.r <= 1 && m.e.r >= 1 && m.s.c <= 3 && m.e.c >= 3) {
        console.log(`  Merge covering R1C3: R${m.s.r}C${m.s.c} -> R${m.e.r}C${m.e.c}`);
    }
});

// Check all cells in row 1
console.log('\nAll cells in row 1:');
for (let C = 0; C <= 10; C++) {
    const c = sheet[XLSX.utils.encode_cell({ r: 1, c: C })];
    console.log(`  Col ${C}: ${c ? JSON.stringify(c.v) : 'EMPTY'}`);
}
