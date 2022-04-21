import { useState, useEffect } from 'react'
import axios from 'axios'
import FormUploadFilms from './components/FormUploadFilms'
import Alert from './components/Alert'
import Films from './components/Films'
import { AlertMessageType, IAlertMessage, IFilm } from './utils/helpers'
// import { fetchFilms } from './utils/globalFunctions'
import { API_BASE_URL, DEFAULT_ROWS_PER_PAGE, FILMS_BY_TITLE_NOT_FOUND } from './utils/constants'
import './styles/App.css'

function App() {

  const API_DELETE_ALL_FILMS_URL = API_BASE_URL + '/all'
  const [films, setFilms] = useState<IFilm[]>([])
  const [alertMessage, setAlertMessage] = useState<IAlertMessage>({ type: AlertMessageType.None, message: '', display: false })
  const [filmsPerPage, setFilmsPerPage] = useState<number>(DEFAULT_ROWS_PER_PAGE)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [currentPageInput, setCurrentPageInput] = useState<string>('')
  const [limitPagesNumber, setLimitPagesNumber] = useState<number>(0)
  const [totalNumberOfFilms, setTotalNumberOfFilms] = useState<number>(0)
  const [searchedFilmTitle, setSearchedFilmTitle] = useState<string>('')
  const [searchFilmsByTitleFlag, setSearchFilmsByTitleFlag] = useState<boolean>(false)
  // let currentPageWasValidated = false
  let minNumberOfPage = 0

  useEffect(() => {
    console.log('one time')
    fetchFilms()
  }, [])

  useEffect(() => {
    if (films && films.length > 0) {
      minNumberOfPage = 1
      setLimitPagesNumber(getLimitPage())
      if (currentPage == 0) {
        setCurrentPage(minNumberOfPage)
      }
    }
  }, [films])

  useEffect(() => {
    setCurrentPageChecker(currentPage)
  }, [filmsPerPage, totalNumberOfFilms])

  useEffect(() => {
    fetchFilms()
  }, [currentPage, filmsPerPage, totalNumberOfFilms])

  useEffect(() => {
    if (searchFilmsByTitleFlag) searchFilmsByTitle(searchedFilmTitle)
    setSearchFilmsByTitleFlag(false)
  }, [searchFilmsByTitleFlag])

  function fetchFilms() {
    if (searchedFilmTitle) {
      searchFilmsByTitle(searchedFilmTitle)
    } else {
      fetchAllFilms()
    }
  }

  function setCurrentPageChecker(value: number) {
    // Si la página seleccionada no es un número válido, se cambia a uno que lo sea 
    if (isNaN(value) || value < minNumberOfPage) {
      updateCurrentPage(minNumberOfPage)
    } else {
      const limit = getLimitPage()
      setLimitPagesNumber(limit)
      if (value > limit) {
        updateCurrentPage(limit)
      } else {
        updateCurrentPage(value)
      }
    }
  }

  function updateCurrentPage(value: number) {
    setCurrentPage(value)
    setCurrentPageInput(value.toString())
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

  async function fetchAllFilms() {
    setSearchedFilmTitle('')
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
      fetchAllFilms()
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
        setCurrentPage={ setCurrentPageChecker }
        currentPageInput={currentPageInput}
        setCurrentPageInput={setCurrentPageInput}
        limitPagesNumber={ limitPagesNumber }
        films={ films }
        setFilms={ setFilms }
        searchedFilmTitle={ searchedFilmTitle }
        setSearchedFilmTitle={ setSearchedFilmTitle }
        setSearchFilmsByTitleFlag={ setSearchFilmsByTitleFlag }
        deleteAllFilms={ deleteAllFilms }
        fetchAllFilms={ fetchAllFilms } />
    </div>
  )
}

export default App
