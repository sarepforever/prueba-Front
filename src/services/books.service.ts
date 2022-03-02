import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url: string = 'https://localhost:44333/api/';

  constructor(private http: HttpClient, private cookies: CookieService) {}

  get(filters?: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.cookies.get('token'),
    });

    return this.http
      .get<any[]>(`${this.url}Book/GetLibros`, {
        params: filters as any,
        headers: headers,
      })
      .pipe(
        map((books) => books.sort((a, b) => a.title.localeCompare(b.title)))
      );
  }

  syncAuthorsAndBooks(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.cookies.get('token'),
    });
    return this.http.get<any>(`${this.url}Book/SyncAuthorsBooks`, {
      headers: headers,
    });
  }
}
