import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApi } from '@app/models/api';
import { ICocktail, IDataCocktail, ISingleCocktail } from '@app/models/cocktail';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  ApiUrl = environment.baseUrl + "/cocktails"

  constructor(private http: HttpClient) { }

  getAllCocktails(): Observable<IDataCocktail> {
    return this.http.get<IDataCocktail>(`${this.ApiUrl}`)
  }

  getCocktail(id: string | null): Observable<ISingleCocktail> {
    return this.http.get<ISingleCocktail>(`${this.ApiUrl}/${id}`)
  }

  addCocktail(cocktail: ICocktail): Observable<IApi> {
    return this.http.put<IApi>(`${this.ApiUrl}`, cocktail)
  }

  updateCocktail(cocktail: ICocktail): Observable<IApi> {
    return this.http.patch<IApi>(`${this.ApiUrl}/${cocktail.id}`, cocktail)
  }

  deleteCocktail(id: number | undefined): Observable<IApi> {
    return this.http.delete<IApi>(`${this.ApiUrl}/${id}`)
  }

  trashCocktail(id: number | undefined): Observable<IApi> {
    return this.http.delete<IApi>(`${this.ApiUrl}/trash/${id}`)
  }

  untrashCocktail(id: number | undefined): Observable<IApi> {
    return this.http.post<IApi>(`${this.ApiUrl}/untrash/${id}`, {})
  }

}
