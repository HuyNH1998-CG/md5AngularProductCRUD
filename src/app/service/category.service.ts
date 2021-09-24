import {Injectable} from '@angular/core';
import {Category} from "../model/category";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const API_URL = `${environment.apiURL}`

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + `/api/category/list`)
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL + '/api/category/create', category);
  }

  findById(id: number): Observable<Category> {
    return this.http.get(`${API_URL}/api/category/list/${id}`);
  }

  updateCategory(id: number, category: Category):Observable<Category> {
    return this.http.put(`${API_URL}/api/category/edit/${id}`,category)
  }

  deleteCategory(id: number):Observable<Category> {
    return this.http.delete(`${API_URL}/api/category/delete/${id}`)
  }
}
