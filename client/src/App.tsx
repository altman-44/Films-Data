import { useState, useEffect } from 'react'
import axios from 'axios'
import FormUploadFilms from './components/FormUploadFilms'
import Alert from './components/Alert'
import Films from './components/Films'
import { AlertMessageType, IAlertMessage, IFilm } from './utils/helpers'
// import { fetchFilms } from './utils/globalFunctions'
import { API_BASE_URL, DEFAULT_ROWS_PER_PAGE } from './utils/helpers'
import './styles/App.css'

function App() {

  const API_DELETE_ALL_FILMS_URL = API_BASE_URL + '/all'
  const [films, setFilms] = useState<IFilm[]>([])
  const [alertMessage, setAlertMessage] = useState<IAlertMessage>({ type: AlertMessageType.None, message: '', display: false })
  const [filmsPerPage, setFilmsPerPage] = useState<Number>(DEFAULT_ROWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState<Number>(1)

  useEffect(() => {
    fetchFilms()
  }, [])

  async function fetchFilms() {
    const response = await axios.get(API_BASE_URL)
    let films: IFilm[]
    try {
      films = response.data.films as IFilm[]
    } catch (err) {
      films = []
    }
    console.log('films', films)
    setFilms(() => films)
  }

  async function deleteAllFilms() {
    const response = await axios.delete(API_DELETE_ALL_FILMS_URL)
    const alert: IAlertMessage = {
      type: AlertMessageType.Success,
      message: response.data,
      display: true
    }
    if (response.status >= 400) {
      alert.type = AlertMessageType.Error
    } else {
      fetchFilms()
    }
    setAlertMessage(() => alert)
  }

  return (
    <div className="bg-dark text-white">
      <Alert details={ alertMessage } setAlertMessage={ setAlertMessage } />
      {/* <FormUploadFilms cb={ uploadFilms } setAlertMessage={ setAlertMessage } /> */ }
      <FormUploadFilms setFilms={ setFilms } setAlertMessage={ setAlertMessage } fetchFilms={ fetchFilms } />
      <Films
        rowsPerPage={ filmsPerPage }
        setRowsPerPage={ setFilmsPerPage }
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
        films={ films }
        setFilms={ setFilms }
        deleteAllFilms={ deleteAllFilms } />
    </div>
  )
}

export default App
