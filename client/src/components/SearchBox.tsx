import React from 'react'
import '../styles/searchBox.css'

class SearchBox extends React.Component {
    render() {
        return (
            <div className="input-group mb-4">
                <input type="text" className="form-control search-box-input" placeholder="Buscar película" aria-label="Buscar película" />
                <div className="input-group-append">
                    <button className="btn btn-secondary search-box-btn" type="button">Buscar</button>
                </div>
            </div>
        )
    }
}

export default SearchBox