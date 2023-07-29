export class ServiceResult {
    public success!: boolean;
}

export class ServiceResultData<T extends object> extends ServiceResult {
    public data!: T;
}