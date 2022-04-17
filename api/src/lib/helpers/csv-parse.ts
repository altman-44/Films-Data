import fs from 'fs'
import assert, { AssertionError } from 'assert'
import { parse, CsvError } from 'csv-parse'

interface cbReadCSV { (err?: any, records?: any[]) : void }

const ERR_VERIFYING_COLUMN_NAMES = 'There was a problem verifying the column names'

function parseErrMessage(err: CsvError) : string {
    let msg = ''
    switch (err.code) {
        case 'CSV_INVALID_CLOSING_QUOTE':
            
            break
        case 'CSV_RECORD_INCONSISTENT_COLUMNS':

            break
    }
    return msg
}

function readCSV(path: string, cb: cbReadCSV, columnNames?: string[]) {
    const parser = parse({columns: true, delimiter: ';'}, (err?: CsvError | any, records?: any[]) => {
        console.log('records', records)
        if (err) {
            console.log('err.message: ', err.message)
            // err.message = parseErrMessage(err)
        } else if (records && records.length > 0) {
            if (columnNames) err = verifyColumnNames(records[0], columnNames)
        }
        console.log('error', err)
        cb(err, records)
    })
    fs.createReadStream(path).pipe(parser)
}

function verifyColumnNames(firstRecord: any, columnNames: string[]) : WebAssembly.RuntimeError | void {
    let err = undefined
    try {
        assert.deepStrictEqual(Object.keys(firstRecord), columnNames)
    } catch (wrongColumnNamesErr: unknown) {
        err = new WebAssembly.RuntimeError()
        if (wrongColumnNamesErr instanceof AssertionError) {
            err.message = `The first row must be the column names of the dataset. These are: ${columnNames}` 
        } else {
            err.message = ERR_VERIFYING_COLUMN_NAMES
        }
    }
    return err
}

export {
    readCSV
}