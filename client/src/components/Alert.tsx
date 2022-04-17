import React from 'react'
import { IAlertMessage, AlertMessageType } from '../utils/helpers'

interface IAlertComponent {
    details?: IAlertMessage
}

class Alert extends React.Component<IAlertComponent> {
    details?: IAlertComponent['details']
    display: boolean

    constructor(props: any) {
        super(props)
        if (props.details) {
            this.details = props.details
            this.display = true
        } else {
            this.display = false
        }
    }

    getClassNameByType(): string {
        let className = 'danger'
        switch (this.details?.type) {
            case AlertMessageType.Success:
                className = 'success'
                break
            case AlertMessageType.Warning:
                className = 'warning'
                break;
        }
        return className
    }

    render() {
        return (
            (this.details?.type && this.details.message) ? (
                <div className={'d-flex justify-content-between alert alert-dismissible alert-' + this.getClassNameByType()}>
                    {this.details?.message}
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                </div>
            ) : null
        )
    }
}

export default Alert