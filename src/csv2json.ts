function fixFieldData(field: string) {
    // Removes extra qoutes
    field = field.replace(/['?"]+/g, "");
    // Returns number if field only contains number else returns field
    return !isNaN(Number(field)) ? Number(field) : field;
}

function csvRow(row: string[]) {
    return row.map(str => str.replace(/"([^"]+(?="))"/g, '$1')).join("")
}

function csv2json(csv: string, ...ignore: string[]) {
    // unnecessary Error checking
    if (!csv) throw "CSV Data seems to be bad"

    let csvArr: string[] = csv.split(/\r?\n/).filter((val: string) => val /* Removes Falsy values*/);
    let csvHeader: string[] = csvRow(csvArr.splice(0, 1)).split(",");
    return csvArr.filter((val: string) => val /* Removes Falsy values*/).map((row: string) => {
        let obj: any = {};
        let rowArr = row.split(",");
        rowArr.forEach((field: string, i: number) => {
            if (csvHeader[i] && !ignore.includes(csvHeader[i])) return obj[csvHeader[i]] = fixFieldData(field); return;
        })
        return obj;
    });
}

export {
    csv2json
}