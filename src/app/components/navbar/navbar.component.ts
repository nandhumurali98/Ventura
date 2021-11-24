import { CategoryService } from './../../_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { WishlistService } from './../../_services/wishlist.service';
import { CartService } from './../../_services/cart.service';
import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private roles!:string[];
  public filterCategory:any;
  public productList:any;
  public categoryList:any;
  isLoggedIn=false;
  showAdmin=false;
  username!: string;
  public totalItem:number=0;
  public totalwishList:number=0;
  constructor(private tokenStorageService:TokenStorageService,
             private cartService:CartService,
             private productService:ProductService,
             private wishlistService:WishlistService,
             private categoryService:CategoryService){}

  ngOnInit():void{
    this.isLoggedIn=!!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.roles=user.roles;

      this.showAdmin=this.roles.includes('ROLE_ADMIN');
      this.username=user.username;
    }
    this.cartService.getProducts()
      .subscribe(res=>{
        this.totalItem = res.length;
      })
      this.wishlistService.getProducts()
      .subscribe(res=>{
        this.totalwishList = res.length;
      })
      this.productService.getAll()
      .subscribe(res=>{
        this.filterCategory = res;
        this.productList = res;
        console.log(this.productList);
      })
      this.categoryService.getAll()
       .subscribe(res=>{
         this.categoryList = res;
         console.log(this.categoryList);
       })
  }
  logout():void{
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  filter(category:string){
    this.filterCategory = this.productList
     .filter((a:any)=>{
       if(a.category == category || category==''){
         return a;
       }
     })
  }
}
