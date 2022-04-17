import React from 'react'

interface IFormUploadFilmsComponent {
    cb: (file: File) => Promise<void>
}

class FormUploadFilms extends React.Component<IFormUploadFilmsComponent> {
    fileInput: React.RefObject<any>
    cb: IFormUploadFilmsComponent['cb']

    constructor(props: any) {
        super(props)
        console.log(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fileInput = React.createRef<any>()
        this.cb = props.cb
    }

    async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (this.fileInput.current.files.length > 0) {
            console.log(typeof this.fileInput.current.files[0])
            await this.cb(this.fileInput.current.files[0])
        }
    }

    render() {
        return (
            <div className="card bg-dark">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit} >
                        <h2 className='text-center'>Films uploader</h2>
                        <p>Ingrese un archivo .csv con las películas que desee!</p>
                        <p>Las columnas deben ser: Título, Género, Año, Director y Actores (separador: ";").</p>
                        <input type="file" name="filmsFile" ref={this.fileInput} id="filmsFile" className="form-control" />
                        <button className="btn btn-success w-100 mt-2">Enviar</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default FormUploadFilms