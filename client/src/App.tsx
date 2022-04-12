import React, { Fragment, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  interface IFilm {
    title: string
    genre: string
    year: number
    director: string
    actors: string[]
  }

  const [films, setFilms] = useState<IFilm[]>([
    { title: 'Titanic', genre: 'Drama', year: 1990, director: 'Peter', actors: ['Sophie'] },
    { title: 'Forrest Gump', genre: 'Comedy', year: 1987, director: 'Alfred', actors: ['Rodrigo', 'Noah'] }
  ])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    uploadFilms()
  }

  async function fetchFilms() {
    const films = await axios.get(`https://jsonplaceholder.typicode.com/users`)
    console.log(typeof films)
  }

  async function uploadFilms() {
    
  }

  function updateFilms(data: IFilm[]) {
    
  }

  return (
    <div className="bg-dark text-white">
      <div className="card bg-dark">
        <div className="card-body">
          <form onSubmit={ handleSubmit }>
            <h2 className='text-center'>Films uploader</h2>
            <p>Ingrese un archivo .csv con las películas que desee!</p>
            <p>Las columnas deben ser: Título, Género, Año, Director y Actores (separador: ";").</p>
            <input type="file" name="filmsFile" id="filmsFile" className="form-control" />
            <button className="btn btn-success w-100 mt-2">Enviar</button>
          </form>
        </div>
      </div>
      <div className="container py-4 px-0">
        <h2 className='subtitle'>Películas</h2>
        <div className="container px-0 d-flex">
          { films.map((film: IFilm) => (
            <div className='card card-body bg-secondary text-dark'>
              <h3 key={ film.title }>{ film.title }</h3>
            </div>
          )) }
        </div>
      </div>
    </div>
  )
}

export default App
