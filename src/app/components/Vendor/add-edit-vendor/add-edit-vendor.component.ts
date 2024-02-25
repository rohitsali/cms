import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/shared/services/vendor.service';

@Component({
  selector: 'app-add-edit-vendor',
  templateUrl: './add-edit-vendor.component.html',
  styleUrls: ['./add-edit-vendor.component.scss']
})
export class AddEditVendorComponent implements OnInit {
  addVendorForm!: FormGroup;
  public Id?: any;
  public num!: number;
  public paramId!: number
  editMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private vendorService: VendorService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {

  }


  public ngOnInit() {
    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);

    this.addVendorForm = this.formBuilder.group({
      VendorName: new FormControl('', [Validators.required]),
      Address: new FormControl('', Validators.required),
      VendorNumber: new FormControl('', Validators.required),
      Email: new FormControl('',),
      ProjectId: new FormControl(''),
      registerId: new FormControl(this.num)
    })

    this._checkEditMode();
  }

  public submit() {

    if (this.editMode) {
      this.vendorService.editVendor(this.addVendorForm.value, this.paramId).subscribe(res => {
        if (res != null) {
          this.router.navigate(['/view-vendor']);
          this.toastr.success('vendor Detail updated Sucessfully', 'Vendor', {
            timeOut: 1000
          });
        }
      })
    } else {
      this.vendorService.addVendor(this.addVendorForm.value).subscribe(res => {
        if (res != null) {
          this.router.navigate(['/view-vendor']);
          this.toastr.success('Vendor Added Sucessfully !');
        }
      })
    }


  }

  private _checkEditMode() {
    this.activateRoute.params.subscribe((param: any) => {
      if (param.id) {
        this.editMode = true;
        this.paramId = param.id;
        this.vendorService.getSingleVendor(param.id).subscribe((res) => {
          this.addVendorForm.setValue({
            VendorName: res.VendorName,
            Address: res.Address,
            VendorNumber: res.VendorNumber,
            Email: res.Email,
            ProjectId: res.ProjectId,
            registerId: res.registerId,
            // id:res.id
          });
        });
      }
    });
  }
  reset() {
    debugger
    this.addVendorForm.reset()
  }
  get f() {
    return this.addVendorForm.controls
  }
}