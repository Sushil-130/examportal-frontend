import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
}
