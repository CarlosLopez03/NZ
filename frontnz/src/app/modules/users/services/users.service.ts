import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppUserTb } from '../interface/IUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private urlEntity = 'http://localhost:3000/api-users/';

  constructor(private httpClient: HttpClient) {}

  private data = new BehaviorSubject<any>({ index: 0 });
  data$ = this.data.asObservable();

  private lists = new BehaviorSubject<any>({});
  lists$ = this.lists.asObservable();

  listUsers = new BehaviorSubject<boolean>(true);

  getAllUserForTable(): Observable<any> {
    return this.httpClient.get(this.urlEntity + 'getUsers');
  }

  getUserByEmail(email: string): Observable<any> {
    return this.httpClient.get(this.urlEntity + 'findEmailUser/' + email);
  }

  createUser(body: IAppUserTb): Observable<any> {
    return this.httpClient.post(this.urlEntity + 'createUser', body);
  }

  updateUser(id: string, body: IAppUserTb): Observable<any> {
    return this.httpClient.patch(this.urlEntity + 'updateUserById/' + id, body);
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(this.urlEntity + 'deleteUserById/' + id);
  }

  listenChange(obj: any) {
    this.data.next(obj);
  }

  listenListChange(obj: any) {
    this.lists.next(obj);
  }
}
