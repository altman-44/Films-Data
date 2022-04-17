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
        const films: IFilm[] = await Film.find()
        res.json({
            films
        })
    }

    public uploadFilms(req: any, res: Response) {
        if (req.files && req.files.uploadFilms) {
            readCSV(req.files.uploadFilms.path, async (err?: any, data?: any[]) => {
                if (!err) {
                    if (data && data.length > 0) {
                        Film.collection.insertMany(data, {ordered: false}, (err, docs) => {
                            if (!err) {
                                console.log('docs', docs)
                                res.status(200)
                                res.send(FILMS_UPLOADED_SUCCESSFULLY)
                            } else {
                                res.status(400).send(UNABLE_TO_UPLOAD_FILMS)
                            }
                        })
                    } else {
                        res.status(400).send(EMPTY_FILE)
                    }
                } else {
                    res.status(400).send(err.message || UNABLE_TO_READ_FILE)
                }
            }, Object.keys(Film.schema.obj))
        } else {
            res.status(400).send(FILE_NOT_UPLOADED)
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