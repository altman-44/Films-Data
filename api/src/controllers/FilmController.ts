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
        const filter = { titulo: { $regex: new RegExp(req.params.filmName, 'i') } }
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
                            const result = await this.validateManyFilms(data)
                            data = result.data as IFilm[]
                            if (data.length > 0) {
                                Film.collection.insertMany(data, { ordered: false }, (err?: MongooseError, docs?: any) => {
                                    if (!err) {
                                        res.status(200)
                                        res.send(FILMS_UPLOADED_SUCCESSFULLY + (result.message ? '. ' + result.message : ''))
                                    } else {
                                        if (err.name == 'MongooseError') {
                                            res.status(500).send(DATABASE_ERROR)
                                        } else {
                                            res.status(400).send(UNABLE_TO_UPLOAD_FILMS + (result.message || ''))
                                        }
                                    }
                                })
                            } else {
                                res.status(400).send(result.message)
                            }
                        } catch (err: unknown) {
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

    public edit(req: Request, res: Response) {
        res.json({})
    }

    public deleteAll(req: Request, res: Response) {
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

    private async validateManyFilms(data: IFilm[]): Promise<any> {
        let message = ''
        if (data.length > 0) {
            const dataFilmTitles = data.map(f => f.titulo)
            data = data.filter(({titulo}, index) => !dataFilmTitles.includes(titulo, index + 1))
            const filmTitles: String[] = (await Film.find()).map(film => film.titulo.toLowerCase())
            if (filmTitles.length > 0) {
                let duplicateFilmTitles = []
                let i = data.length - 1
                const maxDuplicateFilmTitlesToDisplay = 5
                while (i >= 0) {
                    const currentFilmTitle = data[i].titulo.toLowerCase()
                    if (filmTitles.includes(currentFilmTitle)) {
                        data.splice(i, 1)
                        if (duplicateFilmTitles.length < maxDuplicateFilmTitlesToDisplay) {
                            duplicateFilmTitles.push(currentFilmTitle)
                        }
                    }
                    i--
                }
                if (duplicateFilmTitles.length > 0) {
                    if (data.length == 0) {
                        message = 'All film data that was tried to be uploaded had repeated film titles on the database!'
                    } else if (duplicateFilmTitles.length <= maxDuplicateFilmTitlesToDisplay) {
                        message = 'As duplicate film titles are not allowed, the following titles were added just once (despite being repeated in the file): ' + duplicateFilmTitles[duplicateFilmTitles.length - 1]
                        for (let i = duplicateFilmTitles.length - 2; i >= 0; i--) {
                            message += `, '${duplicateFilmTitles[i]}'`
                        }
                    } else {
                        message = 'Many film titles were on the database already! Duplicate film titles are not allowed'
                    }
                }
            }
        }
        return {data, message}
    }
}

export default new FilmController()