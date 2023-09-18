import { Injectable } from "@nestjs/common";
import { DbException } from "src/Exceptions/dbexception.exception";
import { ServiceResultDataModel, ServiceResultModel } from "src/Models/serviceresult.model";

@Injectable()
export class ExceptionHandler {
    public HandleServiceResultModel(e: any): ServiceResultModel {
        const serviceResultModel: ServiceResultModel = new ServiceResultModel();
        if (e instanceof DbException) {
            const dbexception: DbException = e as DbException;
            serviceResultModel.success = false;
            serviceResultModel.error = dbexception.message;
        } else {
            serviceResultModel.success = false;
        }
        return serviceResultModel;
    }

    public HandleServiceResultDataModel<T extends object>(e: any): ServiceResultDataModel<T> {
        const serviceResultDataModel = new ServiceResultDataModel<T>();

        if (e instanceof DbException) {
            const dbexception: DbException = e as DbException;
            serviceResultDataModel.success = false;
            serviceResultDataModel.error = dbexception.message;
        } else {
            serviceResultDataModel.success = false;
        }
        return serviceResultDataModel;
    }
}