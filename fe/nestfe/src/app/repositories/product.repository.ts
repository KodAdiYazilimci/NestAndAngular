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
}