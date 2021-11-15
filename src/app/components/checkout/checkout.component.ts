import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService : CartService) { }

  form: any = {
    name:null,
    address:null,
    mobile:null,
    mail:null
  }
  public products : any=[];
  public grandTotal:number=0;

  ngOnInit(): void {
    this.cartService.getProducts()
     .subscribe(res=>{
       this.products=res;
       this.grandTotal=this.cartService.getTotalPrice();
     })
  }
  removeItem(item:any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  onSubmit(){

  }
}
