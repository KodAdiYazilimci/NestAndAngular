import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { AppService } from '../Services/app.service';
import { ServiceResultDataModel } from 'src/Models/serviceresult.model';

describe('ProductController', () => {
    let productController: ProductController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [AppService],
        }).compile();

        // productController = app.get<ProductController>(ProductController);
    });

    describe('root', () => {
        it('should return "Hello World!"', async () => {
            expect(await productController.getProducts()).toBe(new ServiceResultDataModel().success)
        });
    });
});
