import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/Resource"
  
  public addResource = (data: any) => {
    return this.http.post(this.url, data)
  }

  public getResource() {
    return this.http.get<any>(this.url)
  }

  public editResource = (data: any,id:number) => {
    return this.http.put<any>(`${this.url}/${id}`, data)
  }

  public deleteResource(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }

  public getSingleResource(id:number){
    return this.http.get<any>(`${this.url}/${id}`)
  }
}
