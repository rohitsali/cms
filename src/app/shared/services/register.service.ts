import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }
  private url = "http://localhost:3000/register"

  public addRegister = (data: any) => {
    return this.http.post(this.url, data)
  }

  public getUser() {
    return this.http.get<any>(this.url)
  }

  public editUser = (data: any) => {
    return this.http.put(this.url, data)
  }

  public deleteUser(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }

  IsLoggedIn() {
    if (localStorage.getItem('UserId') != null) {
      return true
    }
    else {
      this.toastr.warning('Please login first!')
      return false;
    }
  }

  // function for check  user is logout or not
  IsLogout() {
    if (localStorage.getItem('UserId') == null) {
      return true
    }
    else {
      return false
    }
  }

}
