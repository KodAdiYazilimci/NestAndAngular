import { Module } from '@nestjs/common';
import { AppService } from './Services/app.service';
import { ProductController } from './Controllers/product.controller';
import { ProductService } from './Services/product.service';
import { CacheModule } from "@nestjs/cache-manager";
import { ExceptionHandler } from './Util/handler.exceptions';
import { MethodExecution } from './Util/wrapper.methodexecution';

@Module({
  imports: [CacheModule.register()],
  controllers: [ProductController],
  providers: [AppService, ProductService, ExceptionHandler, MethodExecution],
})
export class AppModule { }
