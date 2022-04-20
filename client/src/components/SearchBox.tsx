import React from 'react'
import '../styles/searchBox.css'

interface ISearchBox {
    searchedFilmTitle: string
    setSearchedFilmTitle: (value: string) => void
    setSearchFilmsByTitleFlag: (value: boolean) => void
}

class SearchBox extends React.Component<ISearchBox> {

    searchOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            // this.props.setSearchedFilmTitle((event.target as HTMLInputElement).value)
            this.props.setSearchFilmsByTitleFlag(true)
        }
    }

    searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setSearchedFilmTitle(event.target.value)
    }

    searchFilm = () => {
        // this.props.setSearchedFilmTitle((document.querySelector('#search-film-by-title-input') as HTMLInputElement).value)
        this.props.setSearchFilmsByTitleFlag(true)
    }

    render() {
        return (
            <div className="input-group mb-4">
                <input type="text" className="form-control search-box-input" id="search-film-by-title-input" value={ this.props.searchedFilmTitle } onChange={this.searchOnChange} onKeyUp={ this.searchOnKeyUp } placeholder="Buscar película" aria-label="Buscar película" autoComplete="off" />
                <div className="input-group-append">
                    <button className="btn btn-secondary search-box-btn" type="button" onClick={ this.searchFilm }>Buscar</button>
                </div>
            </div>
        )
    }
}

export default SearchBox