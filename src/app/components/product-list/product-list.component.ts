import { ProductService } from '../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?:Product[];
  currentProduct:Product={
    category:'',
    name:'',
    image_path:'',
    price:''
  };
  currentIndex=-1;
  name='';
  category='';
  message='';
  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private router:Router){}

  ngOnInit():void{
    this.retrieveProducts();
    this.message='';
    this.getProduct(this.route.snapshot.params.id);
  }
  getProduct(id:string):void{
    this.productService.get(id)
      .subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
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

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }

  refreshList():void{
    this.retrieveProducts();
    this.currentProduct={};
    this.currentIndex=-1;
  }

  updateProduct():void{
    this.message='';
    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'Product Updated!!';
        },
        error =>{
          console.log(error);
        });
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
