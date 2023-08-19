const fs = require('fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// Replace this with the path to your input file
const inputPath = 'sto.json';

// Read in the list of strings from the input file
const strings = JSON.parse(fs.readFileSync(inputPath));

// Modify the strings by removing everything after the first "-"
const modifiedStrings = strings.map(str => str.split('-')[0]);

// Write the modified array back to the input file
fs.writeFileSync(inputPath, JSON.stringify(modifiedStrings));

console.log(`Modified strings saved to ${inputPath}`);