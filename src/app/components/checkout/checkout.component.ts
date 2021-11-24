import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { OrderService } from './../../_services/order.service';
import { Order } from './../../_models/order.model';
import { ProfileService } from './../../_services/profile.service';
import { Profile } from './../../_models/profile.model';
import { CartService } from './../../_services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  profile?:Profile[];
  currentUser: any;
  public products : any=[];
  public grandTotal:number=0;
  order:Order={
    name:'',
    total_price:0,
    product_name:[''],
  }
  form: Profile = {
    name:"",
    address:"",
    mobile:0,
    email:''
  };
  submitted = false;
  constructor(private cartService : CartService,
              private profileService:ProfileService,
              private orderService:OrderService,
              private token:TokenStorageService) { }

  ngOnInit(): void {
    this.retrieveProfile();
    this.currentUser = this.token.getUser();
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
  retrieveProfile():void{
    this.profileService.getAll()
      .subscribe(
        data=>{
          this.profile = data;
          console.log(data);
        },
        error =>{
          console.log(error);
        });
  }
  saveOrder(){
    const data ={
      name:this.form.name,
      address:this.form.address,
      mobile:this.form.mobile,
      email:this.form.email,
      total_price:this.grandTotal,
      product_name:this.products,
      user_id:this.currentUser
    };
    this.orderService.create(data)
     .subscribe(res=>{
       console.log(res);
       this.submitted=true;
     },
     error =>{
       console.log(error);
     });
  }

}
