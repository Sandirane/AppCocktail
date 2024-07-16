import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApi } from '@app/models/api';
import { IDataUser, ISingleUser, IUser } from '@app/models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ApiUrl = environment.baseUrl + "/users"
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<IDataUser> {
    return this.http.get<IDataUser>(`${this.ApiUrl}`)
  }

  getUser(id: string | null): Observable<ISingleUser> {
    return this.http.get<ISingleUser>(`${this.ApiUrl}/${id}`);
  }

  addUser(user: IUser): Observable<IApi> {
    return this.http.put<IApi>(`${this.ApiUrl}`, user)
  }

  updateUser(user: IUser): Observable<IApi> {
    return this.http.patch<IApi>(`${this.ApiUrl}/${user.id}`, user)
  }

  deleteUser(id: number | undefined): Observable<IApi> {
    return this.http.delete<IApi>(`${this.ApiUrl}/${id}`)
  }

}
