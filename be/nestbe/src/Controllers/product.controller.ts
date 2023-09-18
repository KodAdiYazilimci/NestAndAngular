import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Body, Controller, Delete, Get, Post, Put, Query, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";
import { DbException } from "src/Exceptions/dbexception.exception";
import { ProductModel } from "src/Models/productmodel.model";
import { ServiceResultDataModel, ServiceResultModel } from "src/Models/serviceresult.model";
import { ProductService } from "src/Services/product.service";
import { MethodExecution } from "src/Util/wrapper.methodexecution";

@Controller("product")
export class ProductController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly productService: ProductService,
        private readonly methodExecution: MethodExecution) {
    }

    @Get("getproducts")
    async getProducts(): Promise<ServiceResultDataModel<Array<ProductModel>>> {
        return await this.methodExecution.executeServiceResultDataModel<Array<ProductModel>>(async () => {
            let cachedData: string = await this.cacheManager.get("cachedProducts");

            if (cachedData != null) {
                const deserialized: Array<ProductModel> = JSON.parse(cachedData);
                return deserialized;
            }

            const data: Array<ProductModel> = await this.productService.getProducts();

            cachedData = JSON.stringify(data);
            await this.cacheManager.set("cachedProducts", cachedData, 0);

            return data;
        });
    }

    @Get("getProduct")
    async getProduct(@Query("id") id: number): Promise<ServiceResultDataModel<ProductModel>> {
        return await this.methodExecution.executeServiceResultDataModel<ProductModel>(async () => {
            let cachedData: string = await this.cacheManager.get("cachedProducts");

            if (cachedData == null) {
                const data: Array<ProductModel> = await this.productService.getProducts();
                cachedData = JSON.stringify(data);
                await this.cacheManager.set("cachedProducts", cachedData, 0);
            }

            const deserialized: Array<ProductModel> = JSON.parse(cachedData);

            const product = deserialized.find(x => x.Id == id);

            if (product != null) {
                return product;
            }

            throw new DbException("Not found");
        });
    };

    @Put("createProduct")
    async createProduct(@Body() product: ProductModel): Promise<ServiceResultModel> {
        return await this.methodExecution.executeServiceResultModel(async () => {
            await this.productService.createProduct(product);
            await this.cacheManager.del("cachedProducts");
        });
    }

    @Post("updateProduct")
    async updateProduct(@Body() product: ProductModel, @Query("id") id: number): Promise<ServiceResultDataModel<ProductModel>> {
        return await this.methodExecution.executeServiceResultDataModel<ProductModel>(async () => {
            const result: ProductModel = await this.productService.updateProduct(id, product);
            await this.cacheManager.del("cachedProducts");
            return result;
        });
    }

    @Delete("deleteProduct")
    async deleteProduct(@Query("id") id: number): Promise<ServiceResultModel> {
        return await this.methodExecution.executeServiceResultModel(async () => {
            await this.productService.deleteProduct(id);
            await this.cacheManager.del("cachedProducts");
        });
    }
}