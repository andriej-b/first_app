import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";
// import { UserModel } from "../shared/user.model";
import { AuthUserModel } from "./authUser.model";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<AuthUserModel>(null);
  tokenExpirationTimer: any;
  constructor (private http: HttpClient,
    private router: Router) { }
  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWKWI1BhsGLybe5za5hTmQkugQq4JvDC0',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        })
      );
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
  autoLogin() {
    let userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpiresIn: Date;
    } = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
      return;
    }
    const loadedUser = new AuthUserModel(
      userData.email,
      userData.id,
      userData.id,
      userData._tokenExpiresIn
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      let expirationDate = new Date(userData._tokenExpiresIn).getTime() - new Date().getTime();
      this.autoLogout(expirationDate);
    }


  };
  autoLogout(timeout: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, timeout);
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
  private handleAuth(email: string, id: string, token: string, expiresIn: number) {
    let expirationDate = new Date(new Date().getDate() + expiresIn * 1000);
    let user = new AuthUserModel(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
