import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;
  public Id?: any;
  public num!: number;
  public paramId!: number
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {

  }


  public ngOnInit() {
    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);

    this.addEmployeeForm = this.formBuilder.group({
      empName: new FormControl('', [Validators.required]),
      workType: new FormControl('',),
      city: new FormControl(''),
      mobile: new FormControl('', Validators.required),
      ProjectId: new FormControl(),
      registerId: new FormControl(this.num)
    })

    this._checkEditMode();
  }

  public submit() {

    if (this.editMode) {
      debugger;
      this.employeeService.editEmployee(this.addEmployeeForm.value, this.paramId).subscribe(res => {
        if (res != null) {
          this.router.navigate(['/view-employee']);
          this.toastr.success('employee Details updated Sucessfully', 'employee', {
            timeOut: 1000,
            closeButton: true
          });
        }
      })
    } else {
      this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(res => {
        if (res != null) {
          this.router.navigate(['/view-employee']);
          this.toastr.success('employee Added Sucessfully !', '', {
            timeOut: 1500,
            closeButton: true
          });
        }
      })
    }


  }

  private _checkEditMode() {
    this.activateRoute.params.subscribe((param: any) => {
      if (param.id) {
        this.editMode = true;
        this.paramId = param.id;
        this.employeeService.getSingleEmployee(param.id).subscribe((res) => {
          this.addEmployeeForm.setValue({
            empName: res.empName,
            workType: res.workType,
            city: res.city,
            mobile: res.mobile,
            ProjectId: res.ProjectId,
            registerId: res.registerId
          });
        });
      }
    });
  }

  get f() {
    return this.addEmployeeForm.controls
  }
}
