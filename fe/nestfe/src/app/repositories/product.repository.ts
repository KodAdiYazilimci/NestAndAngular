import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { BaseRepository } from "./base.repository";
import { ProductModel } from "../models/product.model";
import { ServiceResult, ServiceResultData } from "../models/serviceresult.model";
import { Observable, lastValueFrom } from "rxjs";

@Injectable()
export class ProductRepository extends BaseRepository implements OnInit {
    constructor(private _http: HttpClient) {
        super();
    }
    ngOnInit(): void {
    }

    public async getProducts(): Promise<ServiceResultData<Array<ProductModel>>> {
        let getResult: Observable<ServiceResultData<Array<ProductModel>>> = await this._http.get<ServiceResultData<Array<ProductModel>>>(
            this.baseUrl + "/product/getproducts", {
            headers: this.getDefaultHeaders()
        });
        let result = await lastValueFrom(getResult);
        return result;
    }

    public async getProduct(id: number): Promise<ServiceResultData<ProductModel>> {
        let getResult: Observable<ServiceResultData<ProductModel>> = await this._http.get<ServiceResultData<ProductModel>>(
            this.baseUrl + "/product/getproduct?id=" + id, {
            headers: this.getDefaultHeaders()
        });

        let result = await lastValueFrom(getResult);
        return result;
    }

    public async deleteProduct(id: number): Promise<ServiceResult> {
        let deleteResult: Observable<ServiceResult> = await this._http.delete<ServiceResult>(
            this.baseUrl + "/product/deleteproduct?id= " + id, {
            headers: this.getDefaultHeaders()
        });

        let result = await lastValueFrom(deleteResult);
        return result;
    }

    public async updateProduct(product: ProductModel): Promise<ServiceResult> {
        let postResult: Observable<ServiceResult> = await this._http.post<ServiceResult>(
            this.baseUrl + "/product/updateproduct?id=" + product.Id, {
            "Id": product.Id,
            "Name": product.Name
        }, {
            headers: this.getDefaultHeaders()
        });

        let result = await lastValueFrom(postResult);
        return result;
    }
}