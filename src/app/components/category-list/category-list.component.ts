import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category.model';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories?:Category[];
  currentCategory:Category={
    category:'',
    image:''
  };
  currentIndex=-1;
  name='';
  category='';
  message='';
  constructor(private categoryService:CategoryService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.retrieveCategory();
    this.message='';
    this.getCategory(this.route.snapshot.params.id);
  }

  getCategory(id:string):void{
    this.categoryService.get(id)
      .subscribe(
          data => {
            this.currentCategory = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
  }
  retrieveCategory():void{
    this.categoryService.getAll()
      .subscribe(
        data=>{
          this.categories=data;
          console.log(data);
        },
        error=>{
          console.log(error);
        });
  }
  deleteCategory():void{
    this.categoryService.delete(this.currentCategory.id)
      .subscribe(
        response=>{
          console.log(response);
          this.router.navigate(['/admin/category']);
        },
        error=>{
          console.log(error);
        });
  }
  refreshList():void{
    this.retrieveCategory();
    this.currentCategory={};
    this.currentIndex=-1;
  }
  updateCategory():void{
    this.message='';
    this.categoryService.update(this.currentCategory.id,this.currentCategory)
      .subscribe(
        response=>{
          console.log(response);
          this.message = response.message ? response.message: 'Category Updated!!';
        },
        error=>{
          console.log(error);
        });
  }
  setActiveCategory(category:Category,index:number){
    this.currentCategory=category;
    this.currentIndex=index;
  }
  removeAllProducts():void{
    this.categoryService.deleteAll()
     .subscribe(
       response=>{
         console.log(response);
         this.refreshList();
       },
       error=>{
         console.log(error);
       });
  }
searchCategory():void{
  this.currentCategory={};
  this.currentIndex=0;
  this.categoryService.findByCategory(this.name)
    .subscribe(
      data=>{
        this.categories=data;
        console.log(data);
      },
      error=>{
        console.log(error)
      });
}
reload():void{
  window.location.href='http://localhost:8081/add'
}
}
