import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials } from '@app/models/credentials';
import { IToken } from '@app/models/token';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  ApiUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  login(credentials: ICredentials): Observable<IToken> {
    return this.http.post<IToken>(`${this.ApiUrl}/auth/login`, credentials)
  }

}
