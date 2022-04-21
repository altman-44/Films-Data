import { Request, Response } from 'express'
import { MongooseError } from 'mongoose'
import assert, { AssertionError } from 'assert'
import { readCSV } from '../lib/helpers/csv-parse'
import Film, { IFilm, neededColumnNames } from '../models/Film'

const EMPTY_FILE = 'The file was empty!'
const FILE_NOT_UPLOADED = "File wasn't uploaded or there was a problem uploading it"
const UNABLE_TO_READ_FILE = "The file was uploaded but we couldn't read it! Please, check if the format is correct."
const FILMS_UPLOADED_SUCCESSFULLY = 'Film data uploaded successfully!'
const UNABLE_TO_UPLOAD_FILMS = "Film data couldn't be uploaded! Please, check if the format is correct."
const DELETED_ALL_FILMS_SUCCESSFULLY = 'All film data was deleted'
const UNABLE_TO_DELETE_ALL_FILMS_BECAUSE_NO_FILMS_IN_DATABASE = "Couldn't delete any film because there wasn't any"
const UNABLE_TO_DELETE_ALL_FILMS = "Couldn't delete the film data"
const DATABASE_ERROR = 'There was a problem uploading the data to the database'
const ERR_VERIFYING_COLUMN_NAMES = 'There was a problem verifying the column names'
const DUPLICATE_KEY_TITLE = 'Titles can not be duplicate!'

class FilmController {

    public index = async (req: Request, res: Response) => {
        let totalNumberOfFilms = await Film.count()
        const films: IFilm[] = await Film.find({}, null, this.getLimitAndSkip(req.params))
        res.json({
            films,
            totalNumberOfFilms
        })
    }

    public findFilmByTitle = async (req: Request, res: Response) => {
        const filter = {titulo: {$regex: new RegExp(req.params.filmName, 'i')}}
        const totalNumberOfFilms = await Film.count(filter)
        const films: IFilm[] = await Film.find(filter, null, this.getLimitAndSkip(req.params))
        res.json({
            films,
            totalNumberOfFilms
        })
    }

    public uploadFilms = (req: any, res: Response) => {
        if (req.files && req.files.uploadFilms) {
            readCSV(req.files.uploadFilms.path, async (err?: any, data?: any[]) => {
                if (!err) {
                    if (data && data.length > 0) {
                        try {
                            if (await this.validateManyFilms(data)) {
                                Film.collection.insertMany(data, {ordered: false}, (err?: MongooseError, docs?: any) => {
                                    if (!err) {
                                        res.status(200)
                                        res.send(FILMS_UPLOADED_SUCCESSFULLY)
                                    } else {
                                        if (err.name == 'MongooseError') {
                                            res.status(500).send(DATABASE_ERROR)
                                        } else {
                                            res.status(400).send(UNABLE_TO_UPLOAD_FILMS)
                                        }
                                    }
                                })
                            } else {
                                res.status(400).send(DUPLICATE_KEY_TITLE)
                            }
                        } catch(err: unknown) {
                            res.status(400).send(UNABLE_TO_UPLOAD_FILMS)
                        }
                        
                    } else {
                        res.status(400).send(EMPTY_FILE)
                    }
                } else {
                    res.status(400).send(err.message || UNABLE_TO_READ_FILE)
                }
            }, this.checkColumnNames)
        } else {
            res.status(400).send(FILE_NOT_UPLOADED)
        }
    }

    public edit (req: Request, res: Response) {
        res.json({})
    }

    public deleteAll (req: Request, res: Response) {
        Film.deleteMany({}, (err: any, response: any) => {
            if (err) {
                res.status(500).send(UNABLE_TO_DELETE_ALL_FILMS)
            } else {
                if (response.deletedCount > 0) {
                    res.status(200).send(DELETED_ALL_FILMS_SUCCESSFULLY + `. ${response.deletedCount} films were deleted`)
                } else {
                    res.status(200).send(UNABLE_TO_DELETE_ALL_FILMS_BECAUSE_NO_FILMS_IN_DATABASE)
                }
            }
        })
    }

    public deleteById(req: Request, res: Response) {

    }

    private checkColumnNames(fileColumnNames: string[]): WebAssembly.RuntimeError | void {
        let err = undefined
        try {
            assert.deepStrictEqual(fileColumnNames, neededColumnNames)
        } catch (wrongColumnNamesErr: unknown) {
            err = new WebAssembly.RuntimeError()
            if (wrongColumnNamesErr instanceof AssertionError) {
                err.message = `The first row must be the column names of the dataset. These are: ${neededColumnNames}` 
            } else {
                err.message = ERR_VERIFYING_COLUMN_NAMES
            }
        }
        return err
    }

    private getLimitAndSkip(params: any): any {
        const rows = Number(params.rows)
        let page = Number(params.page)
        if (page <= 0) page = 1
        return {
            limit: rows,
            skip: (page - 1) * rows
        }
    }

    private async validateManyFilms(data: IFilm[]) {
        let found = false
        const dataLength = data.length
        if (dataLength > 0) {
            const filmTitles: String[] = (await Film.find()).map(film => film.titulo.toLowerCase())
            if (filmTitles.length > 0) {
                let i = 0
                while(!found && i < dataLength) {
                    found = filmTitles.includes(data[i].titulo.toLowerCase()) 
                    i++
                }
            }
        }
        return !found
    }
}

export default new FilmController()