import { Component, OnInit } from '@angular/core';
import { RestService, Product } from '../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
@Component({
  selector: 'app-product',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductlistComponent  implements OnInit {

  products: Product[] = [];
  selectedProduct!: Product;
  closeResult = '';
  isEditable = false;
 
  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    public rest: RestService,
    private router: Router) { }

    @Input() productData: Product = {  productsID: 0,
      productCode: '',
      productDescriptionOriginal: '',
      productDescription: '',
      productCategory: '',
      productStatus: '',
      productBarcode: '',
      rowchecksum: ''};
    
      @Input() modalTittle: string = '';
  ngOnInit(): void {
    console.log("inside ngOnInit");
    this.getProducts();
  }

  getProducts(): void {
    this.rest.getProducts().subscribe((resp: any) => {
      this.products = resp;
    });
  }

  add(): void {
    this.router.navigate(['/productadd']);
  }

  openEdit(content: any, Product : Product) {
    console.log("Product Edit : ", Product);
    this.productData = Product;
    this.modalTittle = 'Edit Product';
    this.isEditable = true;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
      this.updateProduct();

    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openView(content: any, Product : Product) {
    this.productData = Product;
    this.modalTittle = 'Product Details'
    this.isEditable = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
    
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  openDelete(content: any, Product : Product) {
    this.productData = Product;
    this.modalTittle = 'Press continue to DELETE this product';
    this.isEditable = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
    console.log("del ",result);
    if(result == 'Continue click'){
      this.delete(this.productData.productsID);
    }
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete(id: number): void {
    console.log("id ", id);
    this.rest.deleteProduct(id)
      .subscribe(() => {
          this.getProducts();
        }, (err: any) => {
          console.log(err);
        }
      );
  }

  updateProduct() {
    this.rest.updateProduct(this.productData.productsID, this.productData).subscribe((result) => {
      this.router.navigate(['/product-details/'+result._id]);
    }, (err) => {
      console.log(err);
    });
  }


}
