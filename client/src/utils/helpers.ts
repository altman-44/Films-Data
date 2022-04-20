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