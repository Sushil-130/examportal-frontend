import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // tslint:disable-next-line:typedef
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // tslint:disable-next-line:typedef
  public loginUser(token) {
    localStorage.setItem('token', token);
    return true;
  }

  // tslint:disable-next-line:typedef
  public isLoggedIn() {
    const tokenStr = localStorage.getItem('token');
    // tslint:disable-next-line:triple-equals
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // tslint:disable-next-line:typedef
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // tslint:disable-next-line:typedef
  public getToken() {
    return localStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // tslint:disable-next-line:typedef
  public getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // tslint:disable-next-line:typedef
  public getUserRole() {
    const user = this.getUser();
    return user.authorities[0].authority;
  }
}
