const express = require('express')
const crypto = require('node:crypto')
const cors = require('cors')

const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemes/moviesSchema')

const app = express()
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

// movies resource use /movies as the base path
app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (!genre) { return res.json(movies) }

  const filteredMovies = movies.filter(
    movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
  )
  return res.json(filteredMovies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) { res.json(movie) }
  return res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const validation = validateMovie(req.body)

  if (!validation.success) {
    return res.status(400).json({ error: JSON.parse(validation.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(), // uuidv4
    ...validation.data
  }

  movies.push(newMovie)

  return res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const validation = validatePartialMovie(req.body)
  if (!validation.success) {
    return res.status(400).json({ error: JSON.parse(validation.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  // update movie
  const updatedMovie = {
    ...movies[movieIndex],
    ...validation.data
  }
  movies[movieIndex] = updatedMovie

  return res.json(updatedMovie)
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
