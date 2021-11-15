import { WishlistService } from './../../_services/wishlist.service';
import { CartService } from './../../_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  public filterCategory:any;
  public productList : any;
  searchKey:string="";
  public searchTerm:string='';
  constructor(private product : ProductService, private cartService:CartService, private wishlistService:WishlistService) { }

  ngOnInit(): void {
    this.product.getAll()
     .subscribe(res=>{
       this.productList = res;
       this.productList.forEach((a:any) => {
         Object.assign(a,{quantity:1,total:a.price});
       });
     });
     this.cartService.search.subscribe((val:any)=>{
       this.searchKey=val;
     })
  }
  addtocart(item:any){
    this.cartService.addtoCart(item);
  }
  addtowishlist(item:any){
    this.wishlistService.addtowishList(item);
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  filter(category:string){
    this.filterCategory = this.filterCategory
     .filter((a:any)=>{
       if(a.category == category){
         return a;
       }
     })
  }
}
