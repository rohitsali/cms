import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:3000/projects"

  public addProject = (data: any) => {
    return this.http.post(this.url, data)
  }

  public getProjects() {
    return this.http.get<any>(this.url)
  }

  public editProject = (data: any) => {
    return this.http.put(this.url, data)
  }

  public deleteProject(id: any) {
    return this.http.delete(`${this.url}/${id}`
    )
  }

  public singleProject(id: any) {
    return this.http.get<Project>(`${this.url}/${id}`)
  }
}
