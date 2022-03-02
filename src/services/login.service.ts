import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url : string = "https://localhost:44333/api/";
  constructor(private http: HttpClient, private cookies: CookieService) {}

  login(user: any): Observable<any> {
    return this.http.post(`${this.url}User/Login`, user);
  }

  logout() {
    this.cookies.delete('token');
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }

  getToken() {
    return this.cookies.get('token');
  }

  getUser() {
    return this.http.get('https://reqres.in/api/users/2');
  }

  isAuthenticated() {
    const token = this.getToken();
    return token ? true : false;
  }

  getUserLogged() {
    const token = this.getToken();
  }
}
