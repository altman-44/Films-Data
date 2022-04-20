import { Router } from 'express'
import FilmController from '../controllers/FilmController'

const router: Router = Router()

router.get('/:rows/:page', FilmController.index)
router.get('/:filmName/:rows/:page', FilmController.findFilmByTitle)
router.post('/upload', FilmController.uploadFilms)
router.delete('/all', FilmController.deleteAll)

export default router