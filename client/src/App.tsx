import { useState, useEffect } from 'react'
import axios from 'axios'
import FormUploadFilms from './components/FormUploadFilms'
import Alert from './components/Alert'
import Films from './components/Films'
import { AlertMessageType, IAlertMessage, IFilm } from './utils/helpers'
// import { fetchFilms } from './utils/globalFunctions'
import { API_BASE_URL, DEFAULT_ROWS_PER_PAGE, FILMS_BY_TITLE_NOT_FOUND } from './utils/constants'
import './styles/App.css'
import { faUsersRectangle } from '@fortawesome/free-solid-svg-icons'

function App() {

  const API_DELETE_ALL_FILMS_URL = API_BASE_URL + '/all'
  const [films, setFilms] = useState<IFilm[]>([])
  const [alertMessage, setAlertMessage] = useState<IAlertMessage>({ type: AlertMessageType.None, message: '', display: false })
  const [filmsPerPage, setFilmsPerPage] = useState<number>(DEFAULT_ROWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limitPagesNumber, setLimitPagesNumber] = useState<number>(1)
  const [totalNumberOfFilms, setTotalNumberOfFilms] = useState<number>(0)
  const [searchedFilmTitle, setSearchedFilmTitle] = useState<string>('')
  const [searchFilmsByTitleFlag, setSearchFilmsByTitleFlag] = useState<boolean>(false)
  let currentPageWasValidated = false

  useEffect(() => {
    fetchFilms()
  }, [])

  useEffect(() => {
    if (currentPage == 0) {
      setCurrentPage(1)
    }
  }, [films])

  useEffect(() => {
    if (currentPage != 0) {
      // Si currentPage = 0, significa que el usuario borró el valor del input
      // para ingresar un nuevo número de página
      if (!currentPageWasValidated) {
        currentPageWasValidated = true
        setCurrentPageChecker()
      } else {
        currentPageWasValidated = false
      }
    }
  }, [currentPage])

  useEffect(() => {
    setCurrentPageChecker()
  }, [filmsPerPage, totalNumberOfFilms])

  useEffect(() => {
    if (searchFilmsByTitleFlag) searchFilmsByTitle(searchedFilmTitle)
    setSearchFilmsByTitleFlag(false)
  }, [searchFilmsByTitleFlag])

  function setCurrentPageChecker() {
    // Si la página seleccionada no es un número válido, se cambia a uno que lo sea 
    if (isNaN(currentPage) || currentPage <= 0) {
      setCurrentPage(1)
    } else {
      const limit = getLimitPage()
      if (currentPage > limit) {
        setCurrentPage(limit)
      } else {
        setCurrentPage(currentPage)
      }
      setLimitPagesNumber(limit)
    }
    if (searchedFilmTitle) {
      searchFilmsByTitle(searchedFilmTitle)
    } else {
      fetchFilms()
    }
  }

  function getLimitPage(): number {
    const result = totalNumberOfFilms / filmsPerPage
    const truncatedResult = Math.trunc(result)
    if (result == truncatedResult) {
      // el resultado dio un número sin decimales, es decir, se necesita esa cantidad de páginas
      return result
    } // sino, se necesita esa cantidad de páginas + 1 para abarcar todos los datos
    return truncatedResult + 1
  }

  async function fetchFilms() {
    setSearchedFilmTitle('')
    console.log(`fetching films (page: ${currentPage}) (rows: ${filmsPerPage})`)
    const response = await axios.get(API_BASE_URL + `/${filmsPerPage}/${currentPage}`)
    let filmsAux: IFilm[]
    try {
      filmsAux = response.data.films as IFilm[]
      setTotalNumberOfFilms(response.data.totalNumberOfFilms)
    } catch (err) {
      filmsAux = []
      setTotalNumberOfFilms(0)
    }
    setFilms(() => filmsAux)
  }

  async function searchFilmsByTitle(filmTitle: string) {
    if (filmTitle) {
      let numberOfFilms = 0
      let filmsAux: IFilm[] = []
      let alertMessage: any = null
      const response = await axios.get(API_BASE_URL + `/${filmTitle}/${filmsPerPage}/${currentPage}`)
      console.log(response)
      if (response.data.films && response.data.films.length > 0) {
        try {
          filmsAux = response.data.films as IFilm[]
          numberOfFilms = response.data.totalNumberOfFilms
        } catch {
          alertMessage = { type: AlertMessageType.Error, message: FILMS_BY_TITLE_NOT_FOUND, display: true }
        }
      } else {
        alertMessage = { type: AlertMessageType.Warning, message: FILMS_BY_TITLE_NOT_FOUND, display: true }
      }
      setFilms(() => filmsAux)
      setTotalNumberOfFilms(numberOfFilms)
      if (alertMessage) setAlertMessage(() => alertMessage)
    } else {
      fetchFilms()
    }
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
      <FormUploadFilms setFilms={ setFilms } setAlertMessage={ setAlertMessage } fetchFilms={ fetchFilms } />
      <Films
        filmsPerPage={ filmsPerPage }
        setFilmsPerPage={ setFilmsPerPage }
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
        limitPagesNumber={ limitPagesNumber }
        films={ films }
        setFilms={ setFilms }
        searchedFilmTitle={ searchedFilmTitle }
        setSearchedFilmTitle={ setSearchedFilmTitle }
        setSearchFilmsByTitleFlag={ setSearchFilmsByTitleFlag }
        deleteAllFilms={ deleteAllFilms }
        fetchFilms={ fetchFilms } />
    </div>
  )
}

export default App
