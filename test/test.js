const {
    readFileSync
} = require("fs");
const path = require("path");

const {
    csv2json
} = require("../build/src/csv2json.js");

let CSV = readFileSync(path.resolve(__dirname, "./test.csv"), "utf-8");

console.dir(csv2json(CSV, 'Last Name'))