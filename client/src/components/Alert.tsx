import React from 'react'
import { IAlertMessage, AlertMessageType } from '../utils/helpers'

interface IAlertComponent {
    details?: IAlertMessage
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

    render() {
        return (
            (this.props.details?.display) ? (
                <div>
                    <div className={'d-flex justify-content-between alert alert-dismissible alert-' + this.getClassNameByType()}>
                    {this.props.details?.message}
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                </div>
                </div>
            ) : null
        )
    }
}

export default Alert