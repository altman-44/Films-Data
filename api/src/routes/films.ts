import { Router } from 'express'
import FilmController from '../controllers/FilmController'

const router: Router = Router()

router.get('/', FilmController.index)
router.post('/upload', FilmController.uploadFilms)
router.delete('/all', FilmController.deleteAll)

export default router