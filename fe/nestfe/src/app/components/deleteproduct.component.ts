import { Component, EventEmitter } from "@angular/core";
import { ProductService } from "../services/product.service";

@Component({
    selector: 'deleteproduct',
    templateUrl: './deleteproduct.component.html',
    styleUrls: ['./deleteproduct.component.css'],
    providers: [ProductService]
})
export class DeleteProductComponent {
    constructor(private productService: ProductService) {
    }

    public productId!: number;
    public visible: boolean = false;
    public onAnyClickedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    public async onYesClicked() {

        await this.productService.deleteProduct(this.productId);

        this.onAnyClickedEvent.emit(true);
    }

    public onNoClicked() {
        this.onAnyClickedEvent.emit(false);
    }
}