import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/Client"

  public addVendor = (data: any) => {
    return this.http.post(this.url, data)
  }

  public getVendor() {
    return this.http.get<any>(this.url)
  }

  public editVendor = (data: any, id: number) => {
    return this.http.put<any>(`${this.url}/${id}`, data)
  }

  public deleteVendor(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }

  public getSingleVendor(id: number) {
    return this.http.get<any>(`${this.url}/${id}`)
  }
}
