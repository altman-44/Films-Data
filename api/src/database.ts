import mongoose from 'mongoose'
import { mongodb } from './keys'

mongoose.connect(mongodb.URI)
    .then(db => {
        console.log('DB is connected')
    })
    .catch(err => {
        console.log('Error connecting with the database:', err)
        console.log(err.message)
    })