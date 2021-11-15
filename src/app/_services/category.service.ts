import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_models/category.model';

const mainUrl='http://localhost:8080/api/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Category[]>{
    return this.http.get<Category[]>(mainUrl)
    }

  get(id:any):Observable<Category>{
    return this.http.get(`${mainUrl}/${id}`);
  }

  create(data:any):Observable<any>{
    return this.http.post(mainUrl, data);
  }

  update(id:any, data:any):Observable<any>{
    return this.http.put(`${mainUrl}/${id}`,data);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${mainUrl}/${id}`);
  }

  deleteAll():Observable<any>{
    return this.http.delete(mainUrl);
  }

  findByCategory(category:any):Observable<Category[]>{
    return this.http.get<Category[]>(`${mainUrl}?category=${category}`);
  }
}
