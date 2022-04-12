import { Request, Response } from 'express'
import { readCSV } from '../lib/helpers/fs'

class FilmController {
    
    public index (req: Request, res: Response) {
        res.json({
            films: [
                {
                    title: 'I am legend',
                    genre: 'Suspense',
                    year: 2012,
                    director: 'Francis Lawrence',
                    actors: ['Will Smith', 'Dog']
                },
                {
                    title: 'Titanic',
                    genre: 'Drama',
                    year: 2005,
                    director: 'James Cameron',
                    actors: ['Leonardo DiCaprio', 'Kate Winslet']
                }
            ]
        })
    }

    public uploadFilms(req: any, res: Response) {
        if (req.files && req.files.uploadFilms) {
            const data = readCSV(req.files.uploadFilms.path)
            if (data) {
                // Store in database
                
                res.status(200)
                res.send('Films uploaded successfully!')
            }
        }
        res.status(400)
        res.send("We couldn't read the file! Please, check if the format is correct.")
    }

    public edit (req: Request, res: Response) {
        res.json({})
    }

    public delete (req: Request, res: Response) {
        res.json({})
    }
}

export default new FilmController()