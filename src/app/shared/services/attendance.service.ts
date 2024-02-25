import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(private http: HttpClient) { }

  private workurl = "http://localhost:3000/workforce";
  private attendanceurl = "http://localhost:3000/attendance"

  public addWorkForce(data: any) {
    return this.http.post(this.workurl, data)
  }

  public getWorkForce() {
    return this.http.get<any>(this.workurl)
  }

  public editWorkForce = (data: any, id: number) => {
    return this.http.patch<any>(`${this.workurl}/${id}`, data)
  }

  public deleteWorkForce(id: any) {
    return this.http.delete(`${this.workurl}/${id}`)
  }

  public getSingleWorkForce(id: number) {
    return this.http.get<any>(`${this.workurl}/${id}`)
  }

  public addAttendance(data: any) {
    return this.http.post(this.attendanceurl, data)
  }

  public getAttendance() {
    return this.http.get<any>(this.attendanceurl)
  }

  public editAttendance = (data: any, id: number) => {
    return this.http.put<any>(`${this.attendanceurl}/${id}`, data)
  }

  public deleteAttendance(id: any) {
    return this.http.delete(`${this.attendanceurl}/${id}`)
  }

  public getSingleAttendance(id: number) {
    return this.http.get<any>(`${this.attendanceurl}/${id}`)
  }

}
