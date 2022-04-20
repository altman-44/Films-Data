import React from 'react'
import { IAlertMessage, AlertMessageType } from '../utils/helpers'

interface IAlertComponent {
    details?: IAlertMessage
    setAlertMessage: React.Dispatch<React.SetStateAction<IAlertMessage>>
}

class Alert extends React.Component<IAlertComponent> {

    constructor(props: any) {
        super(props)
    }

    getClassNameByType(): string {
        let className = 'danger'
        switch (this.props.details?.type) {
            case AlertMessageType.Success:
                className = 'success'
                break
            case AlertMessageType.Warning:
                className = 'warning'
                break;
        }
        return className
    }

    hideAlert = (): void => {
        this.props.setAlertMessage(() => ({
            type: AlertMessageType.None,
            message: '',
            display: false
        }))
    }

    render() {
        return (
            (this.props.details?.display) ? (
                <div id='alert-box' className={ 'd-flex justify-content-between align-items-center alert alert-' + this.getClassNameByType() }>
                    { this.props.details?.message }
                    <button className="close btn-close-alert" onClick={ this.hideAlert }>&times;</button>
                </div>
            ) : null
        )
    }
}

export default Alert