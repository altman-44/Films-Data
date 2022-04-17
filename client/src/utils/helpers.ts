export enum AlertMessageType {
    Error = 'error',
    Success = 'success',
    Warning = 'warning'
}

export interface IAlertMessage {
    type?: AlertMessageType
    message?: string
}

