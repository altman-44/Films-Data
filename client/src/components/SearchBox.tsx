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
            this.props.setSearchFilmsByTitleFlag(true)
        }
    }

    searchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setSearchedFilmTitle(event.target.value)
    }

    searchFilm = () => {
        this.props.setSearchFilmsByTitleFlag(true)
    }

    render() {
        return (
            <div className="input-group mb-4">
                <input type="text" className="form-control search-box-input" id="search-film-by-title-input" value={ this.props.searchedFilmTitle } onChange={this.searchOnChange} onKeyUp={ this.searchOnKeyUp } placeholder="Search for a film" aria-label="Search for a film" autoComplete="off" />
                <div className="input-group-append">
                    <button className="btn btn-secondary search-box-btn" type="button" onClick={ this.searchFilm }>Search</button>
                </div>
            </div>
        )
    }
}

export default SearchBox