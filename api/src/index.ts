import os from 'os'
import express from 'express'
import cors from 'cors'
import path from 'path'
import formData from 'express-form-data'
import routes from './routes/films'

const buildPath = '../../../client/build'

const app = express()
import './database'

app.set('PORT', process.env.PORT || 3000)

const corsOptions = {
    origin: '*'
}
app.use(cors(corsOptions))
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
// parse data with connect-multiparty. 
app.use(formData.parse(options));
app.use(express.static(path.join(__dirname, buildPath)))

app.use('/films', routes)
// Si ninguna ruta matchea con las de arriba, va al cliente, al index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'))
})

app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`)
})