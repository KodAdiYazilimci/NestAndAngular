import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { DeleteProductComponent } from "./deleteproduct.component";

@Component({
    selector: "mainpage",
    templateUrl: "./mainpage.component.html",
    styleUrls: ["./mainpage.component.css"],
    providers: [ProductService]
})
export class MainPageComponent implements OnInit {
    constructor(private _productService: ProductService,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) {
    }
    private deleteProductComponent!: ComponentRef<DeleteProductComponent>;
    public products: Array<ProductModel> = new Array<ProductModel>();

    async ngOnInit() {
        this.products = await this._productService.getProducts();
    }

    public delete(id: number) {
        this.deleteProductComponent = this.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(DeleteProductComponent));
        this.deleteProductComponent.instance.visible = true;
        this.deleteProductComponent.instance.productId = id;
        this.deleteProductComponent.instance.onAnyClickedEvent.subscribe(async e => {
            this.deleteProductComponent.instance.visible = false;
            this.products = await this._productService.getProducts();
        });
        event?.preventDefault();
    }
}