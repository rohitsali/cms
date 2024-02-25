import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditProjectComponent } from './components/project/add-edit-project/add-edit-project.component';
import { ViewProjectComponent } from './components/project/view-project/view-project.component';
import { AddEditVendorComponent } from './components/Vendor/add-edit-vendor/add-edit-vendor.component';
import { VendorvViewComponent } from './components/Vendor/vendorv-view/vendorv-view.component';
import { AddEditInventoryComponent } from './components/Inventory/add-edit-inventory/add-edit-inventory.component';
import { ViewInventoryComponent } from './components/Inventory/view-inventory/view-inventory.component';
import { AddEditClientComponent } from './components/client/add-edit-client/add-edit-client.component';
import { ViewClientComponent } from './components/client/view-client/view-client.component';
import { AddEditEmployeeComponent } from './components/employee/add-edit-employee/add-edit-employee.component';
import { ViewEmployeeComponent } from './components/employee/view-employee/view-employee.component';
import { AddEditWorkforceComponent } from './components/attendance/add-edit-workforce/add-edit-workforce.component';
import { ViewAttendanceComponent } from './components/attendance/view-attendance/view-attendance.component';
import { SchedulingProjectComponent } from './components/scheduling-project/scheduling-project.component';
import { CashflowMangementComponent } from './components/cashflow-mangement/cashflow-mangement.component';
import { ScheduledTaskComponent } from './components/scheduled-task/scheduled-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    AddEditProjectComponent,
    ViewProjectComponent,
    AddEditVendorComponent,
    VendorvViewComponent,
    AddEditInventoryComponent,
    ViewInventoryComponent,
    AddEditClientComponent,
    ViewClientComponent,
    AddEditEmployeeComponent,
    ViewEmployeeComponent,
    AddEditWorkforceComponent,
    ViewAttendanceComponent,
    SchedulingProjectComponent,
    CashflowMangementComponent,
    ScheduledTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
