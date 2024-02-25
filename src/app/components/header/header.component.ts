import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    protected register: RegisterService,
    private registerService: RegisterService,
    private router: Router
  ) { }

  loggedIn!: Boolean;
  userData: any;
  Id: any;
  userName: any;
  ngOnInit(): void {
  }
  ngDoCheck() {
    this.userName = localStorage.getItem('UserName')
  }

  public Logout() {
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserName');
    this.register.IsLogout();
    this.router.navigate(['']);
    this.toastr.success('Logout Successfully');
  }
}
