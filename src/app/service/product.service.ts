import {Injectable} from '@angular/core';
import {Product} from "../model/product";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
const API_URL = `${environment.apiURL}`
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
  }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(API_URL+`/api/product/list`);
  }

  saveProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(API_URL+`/api/product/create`,product);
  }

  findById(id:number):Observable<Product>{
    return this.http.get(`${API_URL}/api/product/list/${id}`)
  }

  updateProduct(id:number, product:Product):Observable<Product>{
    return this.http.put(`${API_URL}/api/product/edit/${id}`,product);
  }

  deleteProduct(id:number):Observable<Product>{
    return this.http.delete(`${API_URL}/api/product/delete/${id}`)
  }
}
