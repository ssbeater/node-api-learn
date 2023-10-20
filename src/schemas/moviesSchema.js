import * as z from 'zod'
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2077),
  director: z.string(),
  duration: z.number().int().positive(1),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller'])
  ),
  rate: z.number().min(0).max(10).default(0)
})

export function validateMovie (input) {
  return movieSchema.safeParse(input)
}
export function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}
