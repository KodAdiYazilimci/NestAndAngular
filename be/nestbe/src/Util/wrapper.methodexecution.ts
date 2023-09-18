import { ServiceResultDataModel, ServiceResultModel } from "src/Models/serviceresult.model";
import { ExceptionHandler } from "./handler.exceptions";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MethodExecution {
    constructor(private readonly exceptionHandler: ExceptionHandler) {
    }

    public async executeServiceResultModel(func: () => Promise<void>): Promise<ServiceResultModel> {
        try {
            await func();
            const serviceResultModel: ServiceResultModel = new ServiceResultModel();
            serviceResultModel.success = true;
            return serviceResultModel;
        }
        catch (e) {
            return this.exceptionHandler.HandleServiceResultModel(e);
        }
    }

    public async executeServiceResultDataModel<T extends object>(func: () => Promise<T>): Promise<ServiceResultDataModel<T>> {
        try {
            const serviceResultDataModel: ServiceResultDataModel<T> = new ServiceResultDataModel<T>();
            serviceResultDataModel.success = true;
            serviceResultDataModel.data = await func();
            return serviceResultDataModel;
        }
        catch (e) {
            return this.exceptionHandler.HandleServiceResultDataModel<T>(e);
        }
    }
}