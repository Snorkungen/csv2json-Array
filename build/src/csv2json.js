"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csv2json = void 0;
function fixFieldData(field) {
    // Removes extra qoutes
    field = field.replace(/['?"]+/g, "");
    // Returns number if field only contains number else returns field
    return !isNaN(Number(field)) ? Number(field) : field;
}
function csvRow(row) {
    return row.map(str => str.replace(/"([^"]+(?="))"/g, '$1')).join("");
}
function csv2json(csv, ...ignore) {
    // unnecessary Error checking
    if (!csv)
        throw "CSV Data seems to be bad";
    let csvArr = csv.split(/\r?\n/).filter((val) => val /* Removes Falsy values*/);
    let csvHeader = csvRow(csvArr.splice(0, 1)).split(",");
    return csvArr.filter((val) => val /* Removes Falsy values*/).map((row) => {
        let obj = {};
        let rowArr = row.split(",");
        rowArr.forEach((field, i) => {
            if (csvHeader[i] && !ignore.includes(csvHeader[i]))
                return obj[csvHeader[i]] = fixFieldData(field);
            return;
        });
        return obj;
    });
}
exports.csv2json = csv2json;
