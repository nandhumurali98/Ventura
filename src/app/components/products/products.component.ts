import { TokenStorageService } from './../../_services/token-storage.service';
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

  private roles!:string[];
  isLoggedIn=false;
  showAdmin=false;
  username!: string;
  public filterCategory:any;
  public productList : any;
  searchKey:string="";
  public searchTerm:string='';
  constructor(private product : ProductService,
              private cartService:CartService,
              private wishlistService:WishlistService,
              private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn=!!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles=user.roles;

      this.showAdmin=this.roles.includes('ROLE_ADMIN');
      this.username=user.username;
    }
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
    if(this.isLoggedIn){
    this.cartService.addtoCart(item);
    }
  }
  addtowishlist(item:any){
    if(this.isLoggedIn){
    this.wishlistService.addtowishList(item);
    }
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
