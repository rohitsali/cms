import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';
import { VendorService } from 'src/app/shared/services/vendor.service';

@Component({
  selector: 'app-vendorv-view',
  templateUrl: './vendorv-view.component.html',
  styleUrls: ['./vendorv-view.component.scss']
})
export class VendorvViewComponent implements OnInit {

  public vendors: any;
  Id: any;
  public showStatus: boolean = false;
  constructor(private vendorService: VendorService, private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.Id = localStorage.getItem('UserId');
    let num = JSON.parse(this.Id);

    this.vendorService.getVendor().subscribe((res) => {
      this.vendors = res.filter((ele: any) => ele.registerId == num);
      if (this.vendors == null || this.vendors == '') {
        this.showStatus = true;
      }
    });

  }

  removeVendor(id: number) {
    this.vendorService.deleteVendor(id).subscribe((res) => {
      if (res != null) {

        this.toastr.error("Vendor Removed Successfully");
        window.location.reload();
      }
    })
  }

  editVendor(id: number) {
    this.router.navigate(['add-edit-vendor/' + id])
  }
}