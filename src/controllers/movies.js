import { MovieModel } from '../models/movies.js'
import { validateMovie, validatePartialMovie } from '../schemas/moviesSchema.js'

export class MovieController {
  static async searchAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.searchAll({ genre })
    return res.status(200).json(movies)
  }

  static async searchById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.searchById({ id })

    if (movie) return res.status(200).json(movie)

    return res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })
    return res.status(200).json(newMovie)
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })
    return res.json(updatedMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
