import { AssertionError } from 'assert'
import { Request, Response } from 'express'
import { readCSV } from '../lib/helpers/csv-parse'
import Film, { IFilm } from '../models/Film'

const EMPTY_FILE = 'The file was empty!'
const FILE_NOT_UPLOADED = "File wasn't uploaded or there was a problem uploading it"
const UNABLE_TO_READ_FILE = "The file was uploaded but we couldn't read it! Please, check if the format is correct."
const FILMS_UPLOADED_SUCCESSFULLY = 'Film data uploaded successfully!'
const UNABLE_TO_UPLOAD_FILMS = "Film data couldn't be uploaded! Please, check if the format is correct."
const DELETED_ALL_FILMS_SUCCESSFULLY = 'All film data was deleted'
const UNABLE_TO_DELETE_ALL_FILMS = "Couldn't delete the film data"

class FilmController {
    
    public async index (req: Request, res: Response) {
        res.json({
            films: await Film.find()
        })
    }

    public uploadFilms(req: any, res: Response) {
        if (req.files && req.files.uploadFilms) {
            readCSV(req.files.uploadFilms.path, async (err: any, data: IFilm[]) => {
                if (!err) {
                    if (data.length > 0) {
                        Film.collection.insertMany(data, {ordered: false}, (err, docs) => {
                            if (!err) {
                                console.log('docs', docs)
                                res.status(200)
                                res.send(FILMS_UPLOADED_SUCCESSFULLY)
                            } else {
                                res.status(400)
                                res.send(UNABLE_TO_UPLOAD_FILMS)
                            }
                        })
                    } else {
                        res.status(400)
                        res.send(EMPTY_FILE)
                    }
                } else {
                    res.status(400)
                    if (err instanceof AssertionError) {
                        res.send(err.message)
                    } else {
                        res.send(UNABLE_TO_READ_FILE)
                    }
                }
            }, Object.keys(Film.schema.obj))
        } else {
            res.status(400)
            res.send(FILE_NOT_UPLOADED)
        }
    }

    public edit (req: Request, res: Response) {
        res.json({})
    }

    public deleteAll (req: Request, res: Response) {
        Film.deleteMany({}, err => {
            if (err) {
                res.send(UNABLE_TO_DELETE_ALL_FILMS)
            } else {
                res.send(DELETED_ALL_FILMS_SUCCESSFULLY)
            }
        })
    }

    public deleteByTitle(req: Request, res: Response) {

    }
}

export default new FilmController()