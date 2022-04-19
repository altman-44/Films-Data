import React from 'react'
import SearchBox from './SearchBox'
import { IFilm } from '../utils/helpers'
import '../styles/films.css'

interface IFilmComponent {
    rowsPerPage: Number
    setRowsPerPage: React.Dispatch<React.SetStateAction<Number>>
    currentPage: Number
    setCurrentPage: React.Dispatch<React.SetStateAction<Number>>
    films: IFilm[]
    setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>
    deleteAllFilms: () => void
}

class Films extends React.Component<IFilmComponent> {
    rowsPerPage: Number

    constructor(props: any) {
        super(props)
        this.rowsPerPage = props.rowsPerPage
    }

    selectRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = Number(event.target.value)
        if (newValue > 0) {
            this.rowsPerPage = newValue
        }
    }

    setRowsPerPage = () => {
        this.props.setRowsPerPage(this.rowsPerPage)
    }

    changeValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
        
    }

    selectPage = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            let value = -1
            try {
                value = Number((event.target as HTMLInputElement).value)
                if (value > 0) this.props.setCurrentPage(value)
            } catch (err) { }
        }
    }

    render() {
        return (
            <div className="films-box-container">
                <SearchBox />
                <h2 className='subtitle'>Películas</h2>
                <div className='films-header mb-3'>
                    <div className="films-actions">
                        <button onClick={ this.props.deleteAllFilms } className='btn btn-danger py-1 px-3'>Delete all</button>
                    </div>
                    <div className="films-pages">
                        <div className="input-group d-flex">
                            <label className='current-page-label text-center'>Current Page</label>
                            <div className="input-group-prepend">
                                <button className="btn btn-outline-secondary" type="button">{ '<' }</button>
                            </div>
                            <input type="text" className="page-input" value={ this.props.currentPage.toString() } onChange={changeValue} onKeyUp={ this.selectPage } aria-label="Current page" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button">{ '>' }</button>
                            </div>
                        </div>
                    </div>
                    <div className="films-options">
                        <div className="input-group">
                            <select className="rows-per-page-select" id="select-rows-per-page" onChange={ this.selectRowsPerPage } defaultValue={ this.props.rowsPerPage.toString() }>
                                <option value="-1">Filas / Páginas</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button" onClick={ this.setRowsPerPage }>Aceptar</button>
                            </div>
                        </div>
                        <p className='m-0 row-per-page-text'>Actual: { this.props.rowsPerPage.toString() }</p>
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