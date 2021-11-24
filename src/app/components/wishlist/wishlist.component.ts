import { WishlistService } from './../../_services/wishlist.service';
import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  username!: string;
  public wishList:any=[];
  constructor(private cartService:CartService,
              private wishlistService :WishlistService,
              private tokenStorageService:TokenStorageService,) { }
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
  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
