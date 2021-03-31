import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  @Input() productData = { productsID :0, productCode : '', productDescriptionOriginal : '', productDescription : '', productCategory : '', productStatus  : '', productBarcode  : '', rowchecksum  : '' };

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addProduct() {
    
    this.rest.addProduct(this.productData).subscribe((result: { ProductID: number; }) => {
      this.router.navigate(['/product-details/'+result.ProductID]);
    }, (err: any) => {
      console.log(err);
    });
  }

}