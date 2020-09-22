import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/user';
import { environment as env } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  userApi = `${env.api.host}/users`;

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userApi}/list`);
  }


  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userApi}`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.userApi}`, user);
  }

  public deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(`${this.userApi}/${user.id}`);
  }
}
