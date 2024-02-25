import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/inventory"

  public addInventory = (data: any) => {
    return this.http.post(this.url, data)
  }

  public getInventory() {
    return this.http.get<any>(this.url)
  }

  public getSingleMateiral(id: number) {
    return this.http.get<any>(`${this.url}/${id}`)
  }

  public editInventory = (data: any, id: number) => {
    return this.http.put<any>(`${this.url}/${id}`, data)
  }

  public deleteInventory(id: any) {
    return this.http.delete(`${this.url}/${id}`)
  }

  public patchInventory(data: any, id: number) {
    return this.http.patch<any>(`${this.url}/${id}`, data)
  }
}
