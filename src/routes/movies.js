import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.searchAll)
moviesRouter.get('/:id', MovieController.searchById)
moviesRouter.post('/', MovieController.create)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
