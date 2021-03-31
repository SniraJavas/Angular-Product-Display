import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductlistComponent} from './components/productlist/product-list.component';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
const routes: Routes = [
  {path: 'productlist', component: ProductlistComponent} ,
  {path: 'productdetail', component: ProductDetailComponent},
  {path: 'productadd', component: ProductAddComponent},
  {path: 'productedit' , component: ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
