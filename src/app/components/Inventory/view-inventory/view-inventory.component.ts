import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';

@Component({
  selector: 'app-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.scss']
})
export class ViewInventoryComponent implements OnInit {
  addInventoryForm!: FormGroup;
  public inventory: any;
  public Id: any;
  public num!: number;
  materialId!: number;
  public showStatus: boolean = false;
  public editMode: boolean = false;
  public quantity!: number;
  constructor(private inventoryService: InventoryService, private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.Id = localStorage.getItem('UserId');
    this.num = JSON.parse(this.Id);


    this.inventoryService.getInventory().subscribe((res) => {
      this.inventory = res.filter((ele: any) => ele.registerId == this.num);
      if (this.inventory == null || this.inventory == '') {
        this.showStatus = true;
      }
    });

    this.addInventoryForm = this.formBuilder.group({
      MaterialName: new FormControl('', [Validators.required]),
      Unit: new FormControl('', Validators.required),
      cost: new FormControl('',),
      quantity: new FormControl(Number),
      ProjectId: new FormControl(''),
      registerId: new FormControl()
    })

  }

  removeProject(id: number) {
    this.inventoryService.deleteInventory(id).subscribe((res) => {
      if (res != null) {

        this.toastr.success("Material Remove successfully From Inventory", '', {
          timeOut: 1000,
          closeButton: true
        });
        window.location.reload();
      }
    })
  }

  editInventory(id: number) {
    this.router.navigate(['add-edit-inventory/' + id])
  }

  withdrawInventory(id: number) {
    this.materialId = id;
    this.inventoryService.getSingleMateiral(id).subscribe((res) => {
      this.quantity = res.quantity;
      this.addInventoryForm.setValue({
        MaterialName: res.MaterialName,
        Unit: res.Unit,
        cost: res.cost,
        quantity: res.quantity,
        registerId: this.num,
        ProjectId: res.ProjectId
      });
    });
  }

  submit() {
    if (this.quantity != 0) {
      this.addInventoryForm.value.quantity = this.quantity - this.addInventoryForm.value.quantity;
      this.inventoryService.patchInventory(this.addInventoryForm.value, this.materialId).subscribe((res) => {

      })
      this.inventoryService.getInventory().subscribe((res) => {
        this.inventory = res.filter((ele: any) => ele.registerId == this.num);
        if (this.inventory == null || this.inventory == '') {
          this.showStatus = true;
        }
      });
    }
    else {
      this.toastr.success("Please Order Inventory. Already Quantity is Zero !", '', {
        timeOut: 1500,
        closeButton: true
      });
    }

  }

  get f() {
    return this.addInventoryForm.controls
  }

  orderMaterial(mat:any) {
    this.toastr.info('Material Order Generated Successfully!', mat.MaterialName, { timeOut: 1500,
      closeButton:true,
      positionClass: 'toast-top-center'
    })
  }
}