import { ProductService } from './../../_services/product.service';
import { Product } from './../../_models/product.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  product:Product={
    category:'',
    name:'',
    image_path:'',
    price:''
  };
  submitted = false;

  constructor(private productService:ProductService) { }


  saveProduct():void{
    const data = {
      category:this.product.category,
      name:this.product.name,
      image_path:this.product.image_path,
      price:this.product.price
    };
    this.productService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newProduct():void{
    this.submitted = false;
    this.product={
      category:'',
      name:'',
      image_path:'',
      price:''
    };
  }
}
