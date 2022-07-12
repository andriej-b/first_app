import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registred?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private http: HttpClient) { }
  login(email: string, password: string) {
    this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWKWI1BhsGLybe5za5hTmQkugQq4JvDC0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
  register(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWKWI1BhsGLybe5za5hTmQkugQq4JvDC0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
