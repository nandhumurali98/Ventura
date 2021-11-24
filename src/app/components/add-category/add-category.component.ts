import { CategoryService } from './../../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/_models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent  {

  category:Category={
    category:'',
    image:''
  };
  submitted = false;
  constructor(private categoryService:CategoryService) { }

  saveCategory():void{
    const data = {
      category:this.category.category,
      image:this.category.image
    };
    this.categoryService.create(data)
     .subscribe(
       response=>{
         console.log(response);
         this.submitted=true;
       },
       error=>{
         console.log(error);
       });
  }
  newCategory():void{
    this.submitted=false;
    this.category={
      category:'',
      image:''
    };
  }
}
