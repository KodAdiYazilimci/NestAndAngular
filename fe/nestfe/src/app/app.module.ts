import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MainPageComponent } from './components/mainpage.component';
import { RouterModule } from '@angular/router';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ProductRepository, { provide: HTTP_INTERCEPTORS, useClass: ProductService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
