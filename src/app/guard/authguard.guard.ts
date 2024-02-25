import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegisterService } from '../shared/services/register.service';
import { ToastrService } from 'ngx-toastr';

export const authguardGuard: CanActivateFn = () => {

  const oauthService: RegisterService = inject(RegisterService);
  const toastr:ToastrService = inject(ToastrService);
 const route:Router = inject(Router);
  // fuction for give the access of user url to only user role
 
    if (localStorage.getItem('UserId') != null && oauthService.IsLoggedIn()) {
      return true;
    }
    else{
      toastr.warning('Please Login First To access it !','',{
        timeOut:2000
      })
      route.navigate(['/login'])
      return false
    }
 
};
