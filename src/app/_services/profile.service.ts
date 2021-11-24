import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../_models/profile.model';

const baseUrl = 'http://localhost:8080/api/profiles';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Profile[]>{
    return this.http.get<Profile[]>(baseUrl)
    }

  get(id:any):Observable<Profile>{
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data:any):Observable<any>{
    return this.http.post(baseUrl, data);
  }

  update(id:any, data:any):Observable<any>{
    return this.http.put(`${baseUrl}/${id}`,data);
  }

  delete(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll():Observable<any>{
    return this.http.delete(baseUrl);
  }

  findByName(name:any):Observable<Profile[]>{
    return this.http.get<Profile[]>(`${baseUrl}?name=${name}`);
  }
}
