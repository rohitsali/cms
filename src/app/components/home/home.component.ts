import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
      constructor(private toastr:ToastrService){

      }
  submit(){
    this.toastr.success("Details receive Successfully! we will contact you.","Thanks",{
      timeOut:1500,
      closeButton:true
    })
  }
}
