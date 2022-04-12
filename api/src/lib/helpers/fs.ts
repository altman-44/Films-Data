import fs from 'fs'
import { parse } from 'csv-parse'

function readCSV(path: string) : any[] {
    let data: any = []
    const parser = parse({columns: true, delimiter: ';'}, (err, records) => {
        if (!err) {
            data = records
        }
    })
    fs.createReadStream(path).pipe(parser)
    parser.end()
    return data
}

export {
    readCSV
}