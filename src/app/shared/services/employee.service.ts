import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emplyoee } from '../models/emplyoee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/employee"

  public addEmployee = (data: any) => {
    return this.http.post(this.url, data)
  }

  public getEmployee() {
    return this.http.get<any>(this.url)
  }

  public editEmployee = (data: any, id: number) => {
    return this.http.put<any>(`${this.url}/${id}`, data)
  }

  public deleteEmployee(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }

  public getSingleEmployee(id: number) {
    return this.http.get<Emplyoee>(`${this.url}/${id}`)
  }

}
