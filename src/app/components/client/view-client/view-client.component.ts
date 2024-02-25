import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  public vendors: any;
  Id: any;
  public showStatus: boolean = false;
  constructor(private vendorService: ClientService, private toastr: ToastrService,
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

        this.toastr.error("Client Detail Remove successfully");
        window.location.reload();
      }
    })
  }

  editVendor(id: number) {
    this.router.navigate(['add-edit-client/' + id])
  }
}