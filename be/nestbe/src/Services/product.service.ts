/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { ProductModel } from "src/Models/productmodel.model";
import { Schema, ObjectId } from "mongoose";
import mongoose from "mongoose";
import { IProductEntity } from "src/Entities/product.entity";
import { DbException } from "src/Exceptions/dbexception.exception";

@Injectable()
export class ProductService {

    private getSchema(): Schema<IProductEntity> {
        const productSchema = new Schema<IProductEntity>({
            Id: { type: Number, required: true },
            Name: { type: String, required: true }
        });

        return productSchema;
    };

    private async getLastId(): Promise<number> {
        const connection = mongoose.createConnection("mongodb://127.0.0.1/test");

        const productModel = connection.model("Product", this.getSchema());

        // let lastId: number = -1;

        const idEntities = await productModel.find({}).select("Id").sort({ Id: -1 }).limit(1);

        let lastId = 0;

        idEntities.map(function (id: any) {
            const _model: { _id: ObjectId, Id: number, Name: string } = id._doc;
            lastId = _model.Id;
        });

        return lastId;
    }

    public async getProducts(): Promise<Array<ProductModel>> {

        const connection = mongoose.createConnection("mongodb://127.0.0.1/test");

        const productModel = connection.model("Product", this.getSchema());

        const products: Array<ProductModel> = [];

        const productEntities = await productModel.find({});

        productEntities.map(function (prod: any) {
            const _model: { _id: ObjectId, Id: number, Name: string } = prod._doc;
            const productItem = new ProductModel();
            productItem.Id = _model.Id;
            productItem.Name = _model.Name;

            products.push(productItem);
        });

        return products;
    }

    public async createProduct(product: ProductModel): Promise<void> {
        const connection = mongoose.createConnection("mongodb://127.0.0.1/test");

        const productModel = connection.model("Product", this.getSchema());

        let lastId = await this.getLastId();
        lastId += 1;

        await productModel.create({
            Id: lastId,
            Name: product.Name
        });
    }

    public async updateProduct(productId: number, product: ProductModel): Promise<ProductModel> {
        const connection = mongoose.createConnection("mongodb://127.0.0.1/test");

        const productModel = connection.model("Product", this.getSchema());

        const updatedEntity = await productModel.findOneAndUpdate({ Id: productId }, product);

        if (updatedEntity == null) {
            throw new DbException("Kayıt bulunamadı");
        }

        const result: ProductModel = new ProductModel();
        result.Id = updatedEntity.Id;
        result.Name = updatedEntity.Name;

        return result;
    }

    public async deleteProduct(productId: number): Promise<void> {
        const connection = mongoose.createConnection("mongodb://127.0.0.1/test");

        const productModel = connection.model("Product", this.getSchema());

        const deleteItem: { acknowledged: boolean, deletedCount: number } = await productModel.deleteOne({ Id: productId });

        if (deleteItem.deletedCount == 0){
            throw new DbException("Silinecek kayıt bulunamadı");
        }
    }
}