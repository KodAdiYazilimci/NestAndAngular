import { Component, Input, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { ProductModel } from "../models/product.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "update-product",
    templateUrl: "./updateproduct.component.html",
    styleUrls: ["./updateproduct.component.css"],
    providers: [ProductService]
})
export class UpdateProductComponent implements OnInit {
    constructor(private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService) {
    }

    public product!: ProductModel;

    @Input()
    public productName!: string;

    async ngOnInit() {
        let parameters = {};
        this.route.queryParams.subscribe(async params => {
            parameters = params;
            this.product = await this.productService.getProduct(params["id"]);
            this.productName = this.product.Name;
        });

        console.log(parameters);
    }

    public async updateProduct() {
        this.product.Name = this.productName;
        await this.productService.updateProduct(this.product);
        this.router.navigate(["/index"]);
    }
}