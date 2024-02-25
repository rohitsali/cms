import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuiler: FormBuilder,
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  registerForm!: FormGroup
  selected = 'Selected'

  public ngOnInit() {
    this.registerForm = this.formBuiler.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public submit() {
    this.registerService.addRegister(this.registerForm.value).subscribe((response) => {
      this.toastr.success('User Register Sucessfully. Please Login Here!');
      this.router.navigate(['/login']);
    },
      (error) => {
        this.toastr.error('Something went wrong.', error)
      });

  }
  get f() {
    return this.registerForm.controls
  }
}
