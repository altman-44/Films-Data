import mongoose, { Schema, model } from 'mongoose'

export interface IFilm extends mongoose.Document {
    _id: String,
    titulo: String,
    genero: String,
    'año': Number,
    director: String,
    actores: [String]
}

const FilmSchema = new Schema({
    _id: String,
    titulo: {
        type: String,
        unique: true
    },
    genero: String,
    'año': Number,
    director: String,
    actores: [String]
})

const neededColumnNames = Object.keys(FilmSchema.obj)
neededColumnNames.splice(neededColumnNames.indexOf('_id'), 1)

export { neededColumnNames }

export default model<IFilm>('Film', FilmSchema)