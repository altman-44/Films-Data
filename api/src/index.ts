import os from 'os'
import express from 'express'
import formData from 'express-form-data'
import routes from './routes/films'

const app = express()
import './database'

app.set('PORT', process.env.PORT || 3000)

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// app.use(express.urlencoded({ extended: false }))

app.use('/films', routes)

app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`)
})