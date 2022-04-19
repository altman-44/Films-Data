export const API_BASE_URL = 'http://localhost:4000/films'
export const TIMEOUT_REMOVE_SUCCESS_ALERT = 5000
export const DEFAULT_ROWS_PER_PAGE =  25

export enum AlertMessageType {
    None = 'none',
    Error = 'error',
    Success = 'success',
    Warning = 'warning'
}

export interface IAlertMessage {
    type: AlertMessageType
    message: string
    display: boolean
}

export interface IFilm {
    _id: string
    titulo: string
    genero: string
    'año': number
    director: string
    actores: string[]
}