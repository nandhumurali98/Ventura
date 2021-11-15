import { ProductService } from 'src/app/_services/product.service';
import { CategoryService } from 'src/app/_services/category.service';
import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  public filterCategory:any;
  public categoryList:any;
  searchKey:string='';
  public searchTerm:string='';
  constructor(private router:Router, private cartService:CartService, private category:CategoryService, private product :ProductService) { }

  ngOnInit(): void {
    this.category.getAll()
      .subscribe(res=>{
        this.filterCategory = res;
        this.categoryList = res;
        console.log(res);
      });
      this.product.getAll()
      .subscribe(res=>{
        this.filterCategory = res;
        console.log(this.filterCategory);
      });
      this.cartService.search.subscribe((val:any)=>{
        this.searchKey=val;
  })
}

// search(event:any){
//   this.searchTerm = (event.target as HTMLButtonElement).value;
//   console.log(this.searchTerm);
//   this.cartService.search.next(this.searchTerm);
// }
  filter(cat:string){
    this.filterCategory = this.filterCategory
     .filter((a:any)=>{
       if(a.category == cat){
         return a;
       }
     })
  }
  // getcategorys(){
  //   this.router.navigate(['categorys']);
  // }
}
