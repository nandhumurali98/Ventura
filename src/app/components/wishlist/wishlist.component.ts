import { WishlistService } from './../../_services/wishlist.service';
import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public wishList:any=[];
  constructor(private cartService:CartService, private wishlistService :WishlistService) { }
  loggedin=false;
  ngOnInit(): void {
   this.wishlistService.getProducts()
     .subscribe(res=>{
       this.wishList=res;
     })
  }
  removeItem(item:any){
    this.wishlistService.removeCartItem(item);
  }
  addtocart(item:any){
    this.cartService.addtoCart(item);
    this.wishlistService.removeCartItem(item);
  }
}
