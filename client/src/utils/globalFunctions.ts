import React from "react"
import axios from "axios"
import { IFilm, API_BASE_URL } from "./helpers"

// export async function fetchFilms(rows: Number, setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>) {
//     const response = await axios.get(API_BASE_URL)
//     let films: IFilm[]
//     try {
//       films = response.data.films as IFilm[]
//     } catch (err) {
//       films = []
//     }
//     console.log('films', films)
//     setFilms(() => films)
// }