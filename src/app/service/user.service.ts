import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = `${environment.apiURL}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getPublicContent(): Observable<any>{
    return this.http.get(API_URL+'/api/test/all',{responseType : 'text'})
  }

  getUser():Observable<any>{
    return this.http.get(API_URL+'/api/test/user', {responseType: 'text'})
  }

  getMod():Observable<any>{
    return this.http.get(API_URL+'/api/test/mod', {responseType: 'text'})
  }

  getAdmin():Observable<any>{
    return this.http.get(API_URL+'/api/test/admin',{responseType:'text'})
  }
}
