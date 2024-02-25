import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuiler: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  loginForm!: FormGroup

  public ngOnInit() {
    this.loginForm = this.formBuiler.group({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  public submit() {
    this.registerService.getUser()
      .subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            if (res[i].name == this.loginForm.value.name && res[i].password == this.loginForm.value.password
            ) {
              localStorage.setItem('UserId', res[i].id)
              localStorage.setItem('UserName', res[i].name)
              this.router.navigate(['/home']);
              this.toastr.success('Login success', '', {
                timeOut: 1000
              });
              history.pushState(null, '');
              break;
            }

          }
          if (localStorage.getItem('UserId') == null) {
            this.toastr.warning('UserName and Password is incorrect !');
          }

        },
        (error) => {
          this.toastr.error('Something went wrong.', error)
        });

  }
  get f() {
    return this.loginForm.controls
  }
}
