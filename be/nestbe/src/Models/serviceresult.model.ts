export class ServiceResultModel {
    public success: boolean;
    public error: string;
}

export class ServiceResultDataModel<T extends object> extends ServiceResultModel {
    public data: T;
}