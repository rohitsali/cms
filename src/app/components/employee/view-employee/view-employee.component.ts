import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  public employee: any;
  Id: any;
  public showStatus: boolean = false;
  constructor(
    private empService: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.Id = localStorage.getItem('UserId');
    let num = JSON.parse(this.Id);

    this.empService.getEmployee().subscribe((res) => {
      this.employee = res.filter((ele: any) => ele.registerId == num);
      if (this.employee == null || this.employee == '') {
        this.showStatus = true;
      }
    });

  }

  removeVendor(id: number) {
    this.empService.deleteEmployee(id).subscribe((res) => {
      if (res != null) {

        this.toastr.success("Project Remove successfully", '', {
          timeOut: 1500,
          closeButton: true
        });
        window.location.reload();
      }
    })
  }

  editVendor(id: number) {
    this.router.navigate(['add-edit-employee/' + id])
  }
}