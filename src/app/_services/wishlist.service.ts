import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public wishItemList:any=[]
  public wishList  = new BehaviorSubject<any>([]);
  constructor() { }

  getProducts(){
    return this.wishList.asObservable();
  }

  addtowishList(product:any){
    this.wishItemList.push(product);
    this.wishList.next(this.wishItemList);
    console.log(this.wishItemList)
  }
  removeCartItem(product:any){
    this.wishItemList.map((a:any , index:any)=>{
      if(product.id === a.id){
        this.wishItemList.splice(index,1);
      }
    })
    this.wishList.next(this.wishItemList);
  }
}
