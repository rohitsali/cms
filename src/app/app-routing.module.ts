import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddEditProjectComponent } from './components/project/add-edit-project/add-edit-project.component';
import { ViewProjectComponent } from './components/project/view-project/view-project.component';
import { VendorvViewComponent } from './components/Vendor/vendorv-view/vendorv-view.component';
import { AddEditVendorComponent } from './components/Vendor/add-edit-vendor/add-edit-vendor.component';
import { authguardGuard } from './guard/authguard.guard';
import { ViewInventoryComponent } from './components/Inventory/view-inventory/view-inventory.component';
import { AddEditInventoryComponent } from './components/Inventory/add-edit-inventory/add-edit-inventory.component';
import { AddEditClientComponent } from './components/client/add-edit-client/add-edit-client.component';
import { ViewClientComponent } from './components/client/view-client/view-client.component';
import { ViewEmployeeComponent } from './components/employee/view-employee/view-employee.component';
import { AddEditEmployeeComponent } from './components/employee/add-edit-employee/add-edit-employee.component';
import { AddEditWorkforceComponent } from './components/attendance/add-edit-workforce/add-edit-workforce.component';
import { ViewAttendanceComponent } from './components/attendance/view-attendance/view-attendance.component';
import { SchedulingProjectComponent } from './components/scheduling-project/scheduling-project.component';
import { CashflowMangementComponent } from './components/cashflow-mangement/cashflow-mangement.component';
import { ScheduledTaskComponent } from './components/scheduled-task/scheduled-task.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'add-edit-project',
    component: AddEditProjectComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'view-project',
    component: ViewProjectComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'view-vendor',
    component: VendorvViewComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-vendor',
    component: AddEditVendorComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-vendor/:id',
    component: AddEditVendorComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'view-inventory',
    component: ViewInventoryComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-inventory',
    component: AddEditInventoryComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-inventory/:id',
    component: AddEditInventoryComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-client',
    component: AddEditClientComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-client/:id',
    component: AddEditClientComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'view-client',
    component: ViewClientComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'view-employee',
    component: ViewEmployeeComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-employee',
    component: AddEditEmployeeComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-workforce/:id',
    component: AddEditWorkforceComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-workforce',
    component: AddEditWorkforceComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'view-attendance',
    component: ViewAttendanceComponent,
    //canActivate: [authguardGuard]
  },
  {
    path: 'add-edit-employee/:id',
    component: AddEditEmployeeComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'scheduling',
    component: SchedulingProjectComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'scheduledTask',
    component: ScheduledTaskComponent,
    canActivate: [authguardGuard]
  },
  {
    path: 'cashflowMangement',
    component: CashflowMangementComponent,
    canActivate: [authguardGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
