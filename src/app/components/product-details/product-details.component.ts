import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct:Product={
    category:'',
    name:'',
    image_path:'',
    price:''
  };
  message='';
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.message='';
    this.getProduct(this.route.snapshot.params.id);
  }

  getProduct(name:string):void{
    this.productService.get(name)
      .subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  updateProduct():void{
    this.message='';
    this.productService.update(this.currentProduct.name, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'Product Updated!!';
        },
        error =>{
          console.log(error);
        });
  }
  deleteProduct(): void {
    this.productService.delete(this.currentProduct.name)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }
}
