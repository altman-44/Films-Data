import React from 'react'
import axios from 'axios'
import { AlertMessageType, IAlertMessage, API_BASE_URL, IFilm } from '../utils/helpers'
// import { fetchFilms } from '../utils/globalFunctions'
import { TIMEOUT_REMOVE_SUCCESS_ALERT } from '../utils/helpers'

interface IFormUploadFilmsComponent {
    // cb: (file: File) => Promise<void>
    setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>
    setAlertMessage: React.Dispatch<React.SetStateAction<IAlertMessage>>
    fetchFilms: () => void
}

const NOT_FILE_TO_UPLOAD = 'You must choose a file before submitting'

class FormUploadFilms extends React.Component<IFormUploadFilmsComponent> {
    apiUploadUrl: string
    fileInput: React.RefObject<any>
    // cb: IFormUploadFilmsComponent['cb']

    constructor(props: any) {
        super(props)
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.apiUploadUrl = API_BASE_URL + '/upload'
        this.fileInput = React.createRef<any>()
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (this.fileInput.current.files.length > 0) {
            // await this.cb(this.fileInput.current.files[0])
            await this.uploadFilms(this.fileInput.current.files[0])
        } else {
            this.props.setAlertMessage(() => ({
                type: AlertMessageType.Error,
                message: NOT_FILE_TO_UPLOAD,
                display: true
            }))
        }
    }

    uploadFilms = async (file: File) => {
        console.log('f', file)
        try {
            const formData = new FormData()
            formData.append('uploadFilms', file)
            const response = await axios.post(this.apiUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (response.status == 200) {
                this.props.fetchFilms()
                this.props.setAlertMessage(() => ({
                    type: AlertMessageType.Success,
                    message: response.data,
                    display: true
                }))
            }
        } catch (err: any) {
            let message = 'There was a problem trying to upload the file'
            if (err.response && err.response.data) {
                message = err.response.data
            }
            this.props.setAlertMessage(() => ({
                type: AlertMessageType.Error,
                message,
                display: true
            }))
        }
    }

    render() {
        return (
            <div className="card bg-dark">
                <div className="card-body">
                    <form onSubmit={ this.handleSubmit } >
                        <h2 className='text-center'>Films uploader</h2>
                        <p>Ingrese un archivo .csv con las películas que desee!</p>
                        <p>Las columnas deben ser: Título, Género, Año, Director y Actores (separador: ";").</p>
                        <input type="file" name="filmsFile" ref={ this.fileInput } id="filmsFile" className="form-control" />
                        <button className="btn btn-success w-100 mt-2">Enviar</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormUploadFilms