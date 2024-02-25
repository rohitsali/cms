import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {
  addProjectForm!: FormGroup;
  public Id?: any;
  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectserviceService,
    private router : Router,
    private toastr: ToastrService
  ) {

  }

  public ngOnInit() {
    this.Id = localStorage.getItem('UserId');
    let num = JSON.parse(this.Id);

    this.addProjectForm = this.formBuilder.group({
      ProjectName: new FormControl('', [Validators.required]),
      Address: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Details: new FormControl('',),
      startDate: new FormControl(''),
      EndDate: new FormControl(''),
      ProjectCost: new FormControl('',),
      registerId: new FormControl(num,),
    })
  }

  public submit() {
    this.projectService.addProject(this.addProjectForm.value).subscribe(res => {
          if(res != null){
            this.router.navigate(['/view-project']);
            this.toastr.success('Project Added Sucessfully !');
          }
    })
  }

  get f() {
    return this.addProjectForm.controls
  }
}