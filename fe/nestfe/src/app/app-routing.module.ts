import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/mainpage.component';
import { UpdateProductComponent } from './components/updateproduct.component';

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: MainPageComponent },
  { path: "update", component: UpdateProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
