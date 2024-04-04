import { Injectable, signal } from '@angular/core';
import { AbstractService } from './abstract.service';
import { Response } from '../models/response';
import { Subscription } from '../models/subscription';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractService{

  token = signal('');
  public secret?: string;
  public decodedToken?: any;

  subscribe(email: string, name: string, password: string) {
    return this.http.post<Response<Subscription>>(`${this.baseUri}subscribe`, {email, name, password});
  }

  login(email: string, password: string) {
    return this.http.post<Response<string>>(`${this.baseUri}login`, {login: email, password});
  }

  setSecret(secret: string){
    this.secret = secret;
    try {
      this.decodedToken = jwtDecode(secret);
      localStorage.setItem("token", this.secret);
    }
    catch {
      this.disconnect();
    }
  }

  disconnect() {
    this.secret = undefined;
    this.decodedToken = undefined;
    localStorage.removeItem("token");
  }

}
