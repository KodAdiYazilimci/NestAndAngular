import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { ProductModel } from "../models/product.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "update-product",
    templateUrl: "./updateproduct.component.html",
    styleUrls: ["./updateproduct.component.css"],
    providers: [ProductService]
})
export class UpdateProductComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private productService: ProductService) {
    }

    public product!: ProductModel;

    async ngOnInit() {
        let parameters = {};
        this.route.queryParams.subscribe(async params => {
            parameters = params;
            this.product = await this.productService.getProduct(params["id"]);
        });

        console.log(parameters);
    }
}