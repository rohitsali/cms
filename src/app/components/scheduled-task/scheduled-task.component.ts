import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendenceService } from 'src/app/shared/services/attendance.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';
import { ResourceService } from 'src/app/shared/services/resource.service';
import { SchedulingProjectService } from 'src/app/shared/services/scheduling-project.service';

@Component({
  selector: 'app-scheduled-task',
  templateUrl: './scheduled-task.component.html',
  styleUrls: ['./scheduled-task.component.scss']
})

export class ScheduledTaskComponent implements OnInit {

  addWorkForceForm!: FormGroup;
  addResourceForm!: FormGroup;
  public employee: any;
  public scheduledTasks: any;
  Id: any;
  num!: number;
  empId!: number;
  payId!: number;
  paidA!: number;
  remainA!: number;
  public showStatus: boolean = false;
  public projects: any;
  public data: any;
  public resourceData: any;

  constructor(
    private empService: EmployeeService,
    private workForce: AttendenceService,
    private scheduledservice: SchedulingProjectService,
    private projectService: ProjectserviceService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private resourceService : ResourceService
  ) { }

  ngOnInit(): void {
    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);

    this.projectService.getProjects().subscribe((res) => {
      if (res != null) {
        this.projects = res.filter((ele: any) => ele.registerId == this.num);
      }
      else {
        this.projects = null;
      }
    });

    this.addResourceForm = this.formBuilder.group({
      name: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  public onResouceAdd(id: any): void {
    let data = {
      name : this.addResourceForm.value.name,
      quantity: this.addResourceForm.value.quantity,
      taskId: id
    };

     this.resourceService.addResource(data).subscribe(()=>{
     })
     this.addResourceForm.reset();
  }

  public viewResource(id: any){
    debugger
    this.resourceService.getResource().subscribe((res) => {
      this.resourceData = res.filter((ele: any) => ele.taskId == id);
    });
  }

  public removeTask(id: any) {

  }

  public editTask(_t24: any) {
    throw new Error('Method not implemented.');
  }

  public getProjectTask(id: any) {
    debugger
    this.scheduledservice.getTask().subscribe((res) => {
      debugger
      this.scheduledTasks = res.filter((ele: any) => ele.ProjectId == id);
      if (this.scheduledTasks == null || this.scheduledTasks == '') {
        this.showStatus = true;
      }
    });
  }
}
