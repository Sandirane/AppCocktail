import { Injectable } from '@angular/core';
import { ITokenUser } from '@app/models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token')
    console.log(token)
    return !!token
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token')
  }

  getPayload() {
    let user: ITokenUser = {
      id: 0,
      nom: '',
      prenom: '',
      email: ''
    }

  
    let token = localStorage.getItem('token')
    if(token != null){
      const decode: ITokenUser =  jwtDecode<ITokenUser>(token)
      user.id = decode.id
      user.nom = decode.nom
      user.prenom = decode.prenom
      user.email = decode.email
    }

    return user
  }
}
