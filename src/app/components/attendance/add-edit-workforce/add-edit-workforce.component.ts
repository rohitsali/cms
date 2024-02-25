import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emplyoee } from 'src/app/shared/models/emplyoee';
import { Project } from 'src/app/shared/models/project';
import { AttendenceService } from 'src/app/shared/services/attendance.service';

import { EmployeeService } from 'src/app/shared/services/employee.service';

import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';

@Component({
  selector: 'app-add-edit-workforce',
  templateUrl: './add-edit-workforce.component.html',
  styleUrls: ['./add-edit-workforce.component.scss']
})
export class AddEditWorkforceComponent implements OnInit {
  addWorkForceForm!: FormGroup;
  public Id?: any;
  public num!: number;
  public paramId!: number
  editMode: boolean = false;
  public projects: any;
  public employees: any;
  public emp!: Emplyoee;
  public project!: Project;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private attendanceService: AttendenceService,
    private projectService: ProjectserviceService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {

  }


  public ngOnInit() {
    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);

    this.addWorkForceForm = this.formBuilder.group({
      empName: new FormControl('',),   
      payment: new FormControl('',),
      projectName: new FormControl(" "),
      ProjectId: new FormControl(Number, [Validators.required]),
      empId: new FormControl(Number, [Validators.required]),
      registerId: new FormControl(this.num),
      startDate: new FormControl(''),
      presentDay: new FormControl(),
      absentDay: new FormControl(),
      totalPay: new FormControl(0),
      paid:new FormControl(0),
      Remaining:new FormControl(0),
      
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

    // Get all Employee
    this.employeeService.getEmployee().subscribe((res) => {
      if (res != null) {
        this.employees = res.filter((ele: any) => ele.registerId == this.num);
      }
      else {
        this.employees = null;
      }
    });

    this._checkEditMode();
  }

  public submit() {
    this.employeeService.getSingleEmployee(this.addWorkForceForm.value.empId).subscribe((res) => {

      this.emp = res;
      this.addWorkForceForm.value.empName = this.emp.empName;

      this.projectService.singleProject(this.addWorkForceForm.value.ProjectId).subscribe((res) => {

        this.project = res;
        this.addWorkForceForm.value.projectName = this.project.ProjectName;

      

        if (this.editMode) {
          this.attendanceService.editWorkForce(this.addWorkForceForm.value, this.paramId).subscribe(res => {
            if (res != null) {
              this.router.navigate(['/view-attendance']);
              this.toastr.success('employee Details updated Sucessfully', 'employee', {
                timeOut: 1000,
                closeButton: true
              });
            }
          })
        } else {
          this.addWorkForceForm.value.presentDay = 0;
          this.addWorkForceForm.value.absentDay = 0;
          this.addWorkForceForm.value.totalPay = 0;
          this.addWorkForceForm.value.Remaining = 0;
          this.attendanceService.addWorkForce(this.addWorkForceForm.value).subscribe(res => {
            if (res != null) {
              this.router.navigate(['/view-attendance']);
              this.toastr.success('employee Added Sucessfully !', '', {
                timeOut: 1500,
                closeButton: true
              });
            }
          })
        }
      });
    });

  }

  private _checkEditMode() {
    this.activateRoute.params.subscribe((param: any) => {
      if (param.id) {
        this.editMode = true;
        this.paramId = param.id;
        this.attendanceService.getSingleWorkForce(param.id).subscribe((res) => {
          this.addWorkForceForm.setValue({
            empName: res.empName,
            projectName: res.projectName,
            ProjectId: res.ProjectId,
            registerId: res.registerId,
            payment: res.payment,
            empId: res.empId,
            paid:res.paid,
            Remaining:res.Remaining
          });
        });
      }
    });
  }

  get f() {
    return this.addWorkForceForm.controls
  }
}