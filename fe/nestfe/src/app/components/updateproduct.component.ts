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
    constructor(private route: ActivatedRoute) {
    }

    public product!: ProductModel;

    ngOnInit(): void {
        let parameters = {};
        this.route.queryParams.subscribe(params => {
            parameters = params;

            this.product = new ProductModel();
            this.product.Id = params["productid"];
            this.product.Name = "test";
        });

        console.log(parameters);
    }
}