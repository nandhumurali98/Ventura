import { ProductService } from '../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?:Product[];
  currentProduct:Product={};
  currentIndex=-1;
  name='';
  category='';

  constructor(private productService:ProductService){}

  ngOnInit():void{
    this.retrieveProducts();
  }
  retrieveProducts():void{
    this.productService.getAll()
      .subscribe(
        data=>{
          this.products = data;
          console.log(data);
        },
        error =>{
          console.log(error);
        });
  }

  refreshList():void{
    this.retrieveProducts();
    this.currentProduct={};
    this.currentIndex=-1;
  }

  setActiveProduct(product:Product,index:number):void{
    this.currentProduct=product;
    this.currentIndex=index;
  }

  removeAllProducts():void{
    this.productService.deleteAll()
     .subscribe(
       response => {
         console.log(response);
         this.refreshList();
       },
       error => {
         console.log(error);
       });
  }
  searchName():void{
    this.currentProduct={};
    this.currentIndex=0;

    this.productService.findByName(this.name)
     .subscribe(
        data => {
          this.products=data;
            console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  searchCategory():void{
    this.currentProduct={};
    this.currentIndex=-1;

    this.productService.findByCategory(this.category)
     .subscribe(
        data => {
          this.products=data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  reload():void{
    window.location.href='http://localhost:8081/add'
  }
}
