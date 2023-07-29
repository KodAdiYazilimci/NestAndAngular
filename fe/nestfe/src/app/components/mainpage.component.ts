import { Component, OnInit } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { ProductService } from "../services/product.service";

@Component({
    selector: "mainpage",
    templateUrl: "./mainpage.component.html",
    styleUrls: ["./mainpage.component.css"],
    providers: [ProductService]
})
export class MainPageComponent implements OnInit {
    constructor(private _productService: ProductService) {
    }

    public products: Array<ProductModel> = new Array<ProductModel>();

    async ngOnInit() {
        this.products = await this._productService.getProducts();
    }
}