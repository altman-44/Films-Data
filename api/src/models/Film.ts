import mongoose, { Schema, model } from 'mongoose'

export interface IFilm extends mongoose.Document {
    titulo: String,
    genero: String,
    'año': Number,
    director: String,
    actores: [String]
}

const FilmSchema = new Schema({
    titulo: String,
    genero: String,
    'año': Number,
    director: String,
    actores: [String]
})

export default model<IFilm>('Film', FilmSchema)