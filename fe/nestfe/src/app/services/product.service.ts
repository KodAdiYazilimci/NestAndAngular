import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { ProductRepository } from "../repositories/product.repository";
import { Observable, catchError, throwError } from "rxjs";
import { ProductModel } from "../models/product.model";
import { ServiceResult, ServiceResultData } from "../models/serviceresult.model";

@Injectable()
export class ProductService implements OnInit, HttpInterceptor {
    constructor(private _productRepository: ProductRepository) {
    }

    ngOnInit(): void {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            return throwError(error);
        }));
    }

    public async getProducts(): Promise<Array<ProductModel>> {
        let result: ServiceResultData<Array<ProductModel>> = await this._productRepository.getProducts();
        if (result.success == false) {
            throw new Error("Error");
        }

        return result.data;
    }

    public async getProduct(id:number):Promise<ProductModel>{
        let result: ServiceResultData<ProductModel> = await this._productRepository.getProduct(id);

        if (result.success == false) {
            throw new Error("Error");
        }

        return result.data;
    }

    public async deleteProduct(id:number):Promise<boolean>{
        let result: ServiceResult = await this._productRepository.deleteProduct(id);

        if (result.success == false) {
            throw new Error("Error");
        }

        return true;
    }
    
    public async updateProduct(product:ProductModel):Promise<boolean>{
        let result: ServiceResult = await this._productRepository.updateProduct(product);

        if (result.success == false) {
            throw new Error("Error");
        }

        return true;
    }
}