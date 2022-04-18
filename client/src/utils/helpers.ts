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

