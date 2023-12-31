import express, { json } from 'express'
import cors from 'cors'

import { moviesRouter } from './routes/movies.js'

const app = express()
app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 4231

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
