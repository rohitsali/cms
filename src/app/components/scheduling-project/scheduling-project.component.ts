import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/models/project';
import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';
import { SchedulingProjectService } from 'src/app/shared/services/scheduling-project.service';

@Component({
  selector: 'app-scheduling-project',
  templateUrl: './scheduling-project.component.html',
  styleUrls: ['./scheduling-project.component.scss']
})
export class SchedulingProjectComponent implements OnInit {
  public task : any =[];
  public project!: Project;
  public projects: any;
  scheduleProjectForm!: FormGroup;
  public Id?: any;
  public num!: number;
  public paramId!: number
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private toastr: ToastrService,
    private schedulingService : SchedulingProjectService,
    private projectService: ProjectserviceService,
    private activateRoute: ActivatedRoute,
  ) {

  }

  public ngOnInit() {
    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);

    this.scheduleProjectForm = this.formBuilder.group({
      TaskName: new FormControl('', [Validators.required]),
      StartDate: new FormControl(''),
      EndDate: new FormControl(''),
      NotDate: new FormControl('',),
      NotTime: new FormControl('',),
      ProjectId: new FormControl(Number, [Validators.required]),
    })
    //Get all projects
    this.projectService.getProjects().subscribe((res) => {
      if (res != null) {
        this.projects = res.filter((ele: any) => ele.registerId == this.num);
      }
      else {
        this.projects = null;
      }
    });

  }

  public submit() {
    this.schedulingService.addTask(this.scheduleProjectForm.value).subscribe(res => {
      if(res != null){
        this.router.navigate(['/scheduledTask']);
        this.toastr.success('Task Added Sucessfully !');
      }
    });
  }

  get f() {
    return this.scheduleProjectForm.controls
  }
}
