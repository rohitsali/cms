import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SchedulingProjectService {
  public scheduledTask:any = ['Clearing Site','Making line Out' ,'PCC , Footing','exacvation','laying PCC',
   'steel Cutting','laying reinforcement','concrte of footing','shuttering for colmn','procurement resources','steel cutting','shuttering and placing',
   'concreting of ground beam','Brickwork upto plinth level','muroom filling and compaction','shuttering and palcing','concreting of plinth beam','plinth filing'
   ,'PCC at plinth level','steel cutting & bending column','formwork for columns upto ground slap','concreating of colum','procurement resources for slap'
   ,'steel cutting & bending for staircase','placing steel framwork for staircase','concreting upto mid landing','formwork of beam & slap',
    'laying reinforcement for beam and slap','concreating of beam and slap','procurement resources for 1st floor column'];
    
    constructor(private http: HttpClient) { }

    private url = "http://localhost:3000/Task"
  
    public addTask = (data: any) => {
      return this.http.post(this.url, data)
    }
  
    public getTask() {
      return this.http.get<any>(this.url)
    }
  
    public editTask = (data: any,id:number) => {
      return this.http.put<any>(`${this.url}/${id}`, data)
    }
  
    public deleteTask(id: any) {
      return this.http.delete(`${this.url}/${id}`)
    }
  
    public getSingleTask(id:number){
      return this.http.get<any>(`${this.url}/${id}`)
    }
 
}
