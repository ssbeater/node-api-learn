import crypto from 'node:crypto'
import { readJSON } from '../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async searchAll ({ genre }) {
    if (!genre) { return movies }

    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )

    return filteredMovies
  }

  static async searchById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: crypto.randomUUID(), // uuidv4
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) {
      return null
    }

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }
}
