import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FormUploadFilms from './components/FormUploadFilms'
import Alert from './components/Alert'
import {AlertMessageType, IAlertMessage} from './utils/helpers'
import './App.css'

function App() {

  const API_BASE_URL = 'http://localhost:5000/films'
  const API_URL_UPLOAD = API_BASE_URL + '/upload'
  const TIMEOUT_ALERT_MESSAGE = 3000

  interface IFilm {
    _id: string
    titulo: string
    genero: string
    'año': number
    director: string
    actores: string[]
  }

  const [films, setFilms] = useState<IFilm[]>([])
  // const [filmsUpdated, setFilmsUpdated] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<IAlertMessage>({type: undefined, message: undefined})

  useEffect(() => {
    console.log('times')
    fetchFilms()
  }, [])

  useEffect(() => {
    console.log('changed', alertMessage)
  }, [alertMessage])

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // e.preventDefault()
    // if (fileInput.current && fileInput.current.files && fileInput.current.files.length > 0) {
    //   uploadFilms(fileInput.current.files[0].name)
    // } else {
    //   console.log(fileInput.current)
    // }
  // }

  async function fetchFilms() {
    // if (!filmsUpdated) {
    const response = await axios.get(API_BASE_URL)
    let films: IFilm[]
    try {
      films = response.data.films as IFilm[]
    } catch (err) {
      films = []
    }
    console.log('films', films)
    setFilms(films)
      // setFilmsUpdated(true)
    // }
  }

  async function uploadFilms(file: File) {
    console.log('f', file)
    try {
      const formData = new FormData()
      formData.append('uploadFilms', file)
      const response = await axios.post(API_URL_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('r', response)
      fetchFilms()
    } catch (err: any) {
      let message = 'There was a problem trying to upload the file'
      if (err.response && err.response.data) {
        message = err.response.data
      }
      console.log('setting alert message')
      // setAlertMessage({
      //   type: AlertMessageType.Error,
      //   message
      // })
      alertMessage.type = AlertMessageType.Error
      alertMessage.message = message
      console.log(alertMessage?.message)
      // setTimeout(() => {
      //   setAlertMessage(undefined)
      // }, TIMEOUT_ALERT_MESSAGE)
    }
  }

  return (
    <div className="bg-dark text-white">
      <Alert details={{type: AlertMessageType.Error, message: 'Hola'}} />
      <FormUploadFilms cb={uploadFilms} />
      <div className="container py-4 px-0">
        <h2 className='subtitle'>Películas</h2>
        <div className="container px-0 d-flex">
          {(films && films.length > 0) ?
            (films.map((film: IFilm) => (
              <div className='card card-body bg-secondary text-dark'>
                <h3 key={film._id}>{film.titulo}</h3>
              </div>
            ))) : null
          }
        </div>
      </div>
    </div>
  )
}

export default App
