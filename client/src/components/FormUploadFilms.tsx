import React from 'react'
import axios from 'axios'
import { AlertMessageType, IAlertMessage, IFilm } from '../utils/helpers'
import { API_BASE_URL } from '../utils/constants'

interface IFormUploadFilmsComponent {
    setFilms: React.Dispatch<React.SetStateAction<IFilm[]>>
    setAlertMessage: React.Dispatch<React.SetStateAction<IAlertMessage>>
    fetchFilms: () => void
}

const NOT_FILE_TO_UPLOAD = 'You must choose a file before submitting'

class FormUploadFilms extends React.Component<IFormUploadFilmsComponent> {
    apiUploadUrl: string
    fileInput: React.RefObject<any>

    constructor(props: any) {
        super(props)
        this.apiUploadUrl = API_BASE_URL + '/upload'
        this.fileInput = React.createRef<any>()
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (this.fileInput.current.files.length > 0) {
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
                        <p>Upload a .csv file with the films you wish!</p>
                        <p>Columns must be these: Título, Género, Año, Director and Actores (separator: ";").</p>
                        <input type="file" name="filmsFile" ref={ this.fileInput } id="filmsFile" className="form-control" />
                        <button className="btn btn-success w-100 mt-2">Upload</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormUploadFilms