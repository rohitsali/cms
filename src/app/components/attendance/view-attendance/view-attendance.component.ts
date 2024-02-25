import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendenceService } from 'src/app/shared/services/attendance.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss']
})

export class ViewAttendanceComponent implements OnInit {
  addWorkForceForm!: FormGroup;

  public employee: any;
  public workforce: any;
  Id: any;
  num!: number;
  empId!:number;
  payId!:number;
  paidA!:number;
  remainA!:number;

  public showStatus: boolean = false;
  constructor(
    private empService: EmployeeService,
    private workForce: AttendenceService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);

    this.workForce.getWorkForce().subscribe((res) => {
      this.workforce = res.filter((ele: any) => ele.registerId == this.num);
      if (this.workforce == null || this.workforce == '') {
        this.showStatus = true;
      }
    });

    this.addWorkForceForm = this.formBuilder.group({
      empName: new FormControl('', ),
      payment: new FormControl('',),
      projectName:new FormControl(" "),
      ProjectId: new FormControl(Number,[Validators.required]),
      empId:new FormControl(Number,[Validators.required]),
      registerId: new FormControl(this.num),
      startDate:new FormControl(''),
      presentDay:new FormControl(),
      absentDay:new FormControl(),
      totalPay:new FormControl(),
      paid:new FormControl(),
      Remaining:new FormControl()
    })

  }

  markPresent(emp: any) {
    const todays = Date();
    if (emp.mark == formatDate(todays, 'yyyy-MM-dd', 'en-US')) {
      this.toastr.warning("Attendance mark Already", emp.empName, {
        timeOut: 1500,
        closeButton: true
      });
    }
    else {
      emp.presentDay = emp.presentDay + 1;
      emp.totalPay = emp.payment + emp.totalPay;
      emp.remaining = emp.totalPay - emp.paid;
      emp.mark = formatDate(todays, 'yyyy-MM-dd', 'en-US');

      this.workForce.editWorkForce(emp, emp.id).subscribe((res) => {
        this.toastr.success("Attendance mark sucessfully", emp.empName, {
          timeOut: 1500,
          closeButton: true
        });
      })

      this.workForce.getWorkForce().subscribe((res) => {
        this.workforce = res.filter((ele: any) => ele.registerId == this.num);
        if (this.workforce == null || this.workforce == '') {
          this.showStatus = true;
        }
      });
    }



  }

  markAbsent(emp: any) {
    const todays = Date();
    if (emp.mark == formatDate(todays, 'yyyy-MM-dd', 'en-US')) {
      this.toastr.warning("Attendance mark Already", emp.empName, {
        timeOut: 1500,
        closeButton: true
      });
    }
    else {
      emp.absentDay = emp.absentDay + 1;
      emp.mark = formatDate(todays, 'yyyy-MM-dd', 'en-US');
      this.workForce.editWorkForce(emp, emp.id).subscribe((res) => {
        this.toastr.error("Absent mark sucessfully. Message send to Employee", emp.empName, {
          timeOut: 1500,
          closeButton: true
        });
        console.log(res)
      })

      this.workForce.getWorkForce().subscribe((res) => {
        this.workforce = res.filter((ele: any) => ele.registerId == this.num);
        if (this.workforce == null || this.workforce == '') {
          this.showStatus = true;
        }
      });
    }


  }

  removeVendor(id: number) {
    this.workForce.deleteWorkForce(id).subscribe((res) => {
      if (res != null) {
        this.toastr.success("Employee Remove successfully", 'WorkForce', {
          timeOut: 1500,
          closeButton: true
        });
       this.ngOnInit()
      }
    })
  }

  editVendor(emp: any) {
    this.empId = emp.id;
    this.addWorkForceForm.setValue({
      empName:emp.empName,
      projectName:emp.projectName,
      ProjectId:emp.ProjectId,
      registerId:emp.registerId,
      payment:emp.payment,
      empId:emp.empId,
      presentDay:emp.presentDay,
      absentDay: emp.absentDay,
      startDate:emp.startDate,
      totalPay:emp.totalPay,
      paid:emp.paid,
      Remaining:emp.remaining
    });
  }

  submit(){
    this.workForce.editWorkForce(this.addWorkForceForm.value,this.empId).subscribe(res => {
      if (res != null) {
        this.workForce.getWorkForce().subscribe((res) => {
          this.workforce = res.filter((ele: any) => ele.registerId == this.num);
          if (this.workforce == null || this.workforce == '') {
            this.showStatus = true;
          }
        });
        this.toastr.success('employee Details updated Sucessfully', this.addWorkForceForm.value.empName, {
          timeOut: 1000,
          closeButton:true
       });
      }
    })
  }

  pay(emp:any){
    debugger
    this.payId = emp.id;
    this.paidA = emp.paid;
    this.remainA = emp.Remaining;
    if(emp.paid == 0){
      this.addWorkForceForm.setValue({
        empName:emp.empName,
        projectName:emp.projectName,
        ProjectId:emp.ProjectId,
        registerId:emp.registerId,
        payment:emp.payment,
        empId:emp.empId,
        presentDay:emp.presentDay,
        absentDay: emp.absentDay,
        startDate:emp.startDate,
        totalPay:emp.totalPay,
        paid:0,
        Remaining:emp.totalPay
      });
    }
    else{
      this.addWorkForceForm.setValue({
        empName:emp.empName,
        projectName:emp.projectName,
        ProjectId:emp.ProjectId,
        registerId:emp.registerId,
        payment:emp.payment,
        empId:emp.empId,
        presentDay:emp.presentDay,
        absentDay: emp.absentDay,
        startDate:emp.startDate,
        totalPay:emp.totalPay,
        paid:0,
        Remaining:emp.Remaining
      });
    }
   
  }

  paySubmit(){
    debugger;
    this.addWorkForceForm.value.paid =  this.addWorkForceForm.value.paid + this.paidA;
    this.addWorkForceForm.value.Remaining = this.addWorkForceForm.value.Remaining - this.addWorkForceForm.value.paid;
    this.workForce.editWorkForce(this.addWorkForceForm.value,this.payId).subscribe(res => {
      if (res != null) {
        this.workForce.getWorkForce().subscribe((res) => {
          this.workforce = res.filter((ele: any) => ele.registerId == this.num);
          if (this.workforce == null || this.workforce == '') {
            this.showStatus = true;
          }
        });
        this.toastr.success('Payment Paid Sucessfully!', this.addWorkForceForm.value.empName, {
          timeOut: 1000,
          closeButton:true
       });
      }
    })
  }
}
