import fs from 'fs'
import { parse, CsvError } from 'csv-parse'

interface cbReadCSV { (err?: any, records?: any[]) : void }
interface checkColumnNames {(columnNames: string[]): WebAssembly.RuntimeError | void}

function readCSV(path: string, cb: cbReadCSV, checkColumnNames?: checkColumnNames) {
    const parser = parse({columns: true, delimiter: ';'}, (err?: CsvError | any, records?: any[]) => {
        if (!err && records && records.length > 0) {
            if (checkColumnNames) err = checkColumnNames(Object.keys(records[0]))
        }
        cb(err, records)
    })
    fs.createReadStream(path).pipe(parser)
}

export {
    readCSV
}