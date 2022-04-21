import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import SearchBox from './SearchBox'
import { IFilm } from '../utils/helpers'
import '../styles/films.css'

interface IFilmComponent {
    filmsPerPage: number
    setFilmsPerPage: React.Dispatch<React.SetStateAction<number>>
    currentPage: number
    setCurrentPage: (value: number) => void
    currentPageInput: string
    setCurrentPageInput: React.Dispatch<React.SetStateAction<string>>
    limitPagesNumber: number
    films: IFilm[]
    setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>
    searchedFilmTitle: string
    setSearchedFilmTitle: (value: string) => void
    setSearchFilmsByTitleFlag: (value: boolean) => void
    deleteAllFilms: () => void
    fetchAllFilms: () => void
}

class Films extends React.Component<IFilmComponent> {
    filmsPerPage: number
    numberPageInput: string

    constructor(props: any) {
        super(props)
        this.filmsPerPage = props.filmsPerPage
        this.numberPageInput = props.currentPage.toString()
    }

    selectRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = Number(event.target.value)
        if (newValue > 0) {
            this.filmsPerPage = newValue
        }
    }

    setRowsPerPage = () => {
        this.props.setFilmsPerPage(this.filmsPerPage)
    }

    currentPageInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (!this.validateNumberPageInput(event.target.value)) value = this.numberPageInput
        this.props.setCurrentPageInput(value)
    }

    currentPageInputOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            if (this.props.currentPageInput) {
                this.props.setCurrentPage(Number(this.props.currentPageInput))
            }
        } else {
            if (this.validateNumberPageInput((event.target as HTMLInputElement).value)) {
                this.numberPageInput = this.props.currentPageInput
            }
        }
    }

    nextPage = () => {
        // let value = this.props.currentPage + 1
        // if (value > this.props.limitPagesNumber) value--
        this.props.setCurrentPage(this.props.currentPage + 1)
    }

    previousPage = () => {
        // let value = this.props.currentPage - 1
        // if (value <= 0) value = 1
        console.log('previous')
        this.props.setCurrentPage(this.props.currentPage - 1)
    }

    validateNumberPageInput = (value: string) => {
        return !isNaN(Number(value))
    }

    render() {
        return (
            <div className="films-box-container">
                <SearchBox searchedFilmTitle={ this.props.searchedFilmTitle } setSearchedFilmTitle={this.props.setSearchedFilmTitle} setSearchFilmsByTitleFlag={this.props.setSearchFilmsByTitleFlag} />
                <h2 className='subtitle'>Films</h2>
                <div className='films-header mb-3'>
                    <div className="films-actions">
                        <button onClick={ this.props.deleteAllFilms } className='btn btn-danger py-1 px-3'>Delete all</button>
                        <button onClick={this.props.fetchAllFilms} className='icon-btn'>
                            <FontAwesomeIcon icon={ faArrowRotateRight } title='Reload all films' />
                        </button>
                    </div>
                    <div className="films-options">
                        <div>
                            <div className="input-group">
                                <label htmlFor="select-rows-per-page" className='option-label'>Rows / Page: </label>
                                <select className="rows-per-page-select" id="select-rows-per-page" onChange={ this.selectRowsPerPage } defaultValue={ this.props.filmsPerPage.toString() }>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="500">500</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-secondary" type="button" onClick={ this.setRowsPerPage }>Accept</button>
                                </div>
                            </div>
                        </div>
                        <div className="films-pages">
                            <div className="input-group">
                                <label htmlFor='page-input' className='option-label'>Current Page (Max: { this.props.limitPagesNumber }):</label>
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary" type="button" onClick={ this.previousPage }>{ '<' }</button>
                                </div>
                                <input type="text" id="page-input" className="page-input" value={ this.props.currentPageInput } onChange={ this.currentPageInputOnChange } onKeyUp={ this.currentPageInputOnKeyUp } aria-label="Current page" title="Enter a page number to select a page" autoComplete='off' />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={ this.nextPage }>{ '>' }</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                { (this.props.films && this.props.films.length > 0) ?
                    (
                        <div className="films-container">
                            { (this.props.films.map((film: IFilm) => (
                                <div className='card card-body bg-secondary text-dark'>
                                    <p key={ film._id } className="film-card-title">{ film.titulo } ({ film['año'] })</p>
                                    <details>
                                        <summary>Más detalles</summary>
                                        <p>Director: { film.director }</p>
                                        <p>Actores: { film.actores }</p>
                                    </details>
                                </div>
                            ))) }
                        </div>
                    ) :
                    (
                        <div className="films-container films-container-empty">
                            <p className='m-0'>There is not any film data</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Films