import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:3000/users';
  user: User;

  private _mySlaves = new BehaviorSubject([])
  private _myColaborators = new BehaviorSubject([])

  $mySlaves: Observable<any> = this._mySlaves.asObservable();
  $myColaborators: Observable<any> = this._myColaborators.asObservable();
  
  constructor(private http: HttpClient) {}
  
  loadMySlaves() {
    const myId = this.user['user']._id;
    this.http.get<any>(this.baseUrl + `/slaves/${myId}`).subscribe(data => {this._mySlaves.next(data);});
  }
  
  loadMyColaborators() {
    const myId = this.user['user']._id;
    this.http.get<any>(this.baseUrl + `/colaborators/${myId}`).subscribe(data => {this._myColaborators.next(data);});
  }

  loginUser(user) {
    return this.http.post<any>(this.baseUrl + '/login', user).pipe(
      map( usr => {
        console.log(usr);
        localStorage.setItem('currentUser', JSON.stringify(usr));
        this.user = usr
        return usr
        }
        )
    );
  }

  logoutUser() {
    return this.http.post<any>(this.baseUrl + '/logout', {});
  }
  
  getLoginStatus():boolean {
    return !!this.user;
  }

  getGroups(): String[] {
    return this.user['user'].groups.map(group => group.group);
  }

  isSkolitel():boolean {
    if (!this.user['user'].roles.length) {
      return false;
    }
    return this.user['user'].roles.map(item => item.role).includes('ROLE_SKOLITEL')
  }
}
