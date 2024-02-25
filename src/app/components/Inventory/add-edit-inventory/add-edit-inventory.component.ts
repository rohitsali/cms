import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventoryService } from 'src/app/shared/services/inventory.service';
import { VendorService } from 'src/app/shared/services/vendor.service';

@Component({
  selector: 'app-add-edit-inventory',
  templateUrl: './add-edit-inventory.component.html',
  styleUrls: ['./add-edit-inventory.component.scss']
})
export class AddEditInventoryComponent implements OnInit {

  addInventoryForm!: FormGroup;
  public Id?: any;
  public num!: number;
  public paramId!:number
  editMode:boolean= false;

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private activateRoute:ActivatedRoute,
    private toastr: ToastrService
  ) {

  }


  public ngOnInit() {
    this.Id = localStorage.getItem('UserId');
     this.num = JSON.parse(this.Id);

    this.addInventoryForm = this.formBuilder.group({
      MaterialName: new FormControl('', [Validators.required]),
      Unit: new FormControl('', Validators.required),
      cost: new FormControl('',),
      quantity:new FormControl(),
      ProjectId: new FormControl(''),
      registerId: new FormControl(this.num)
    })

    this._checkEditMode();
  }

  public submit() {

    if (this.editMode) {
      this.inventoryService.editInventory(this.addInventoryForm.value,this.paramId).subscribe(res => {
        if (res != null) {
          this.router.navigate(['/view-inventory']);
          this.toastr.success('Material Detail updated Sucessfully', 'Material', {
            timeOut: 1000,
            closeButton:true
         });
        }
      })
    } else {
      this.inventoryService.addInventory(this.addInventoryForm.value).subscribe(res => {
        if (res != null) {
          this.router.navigate(['/view-inventory']);
          this.toastr.success('Material Added Sucessfully in inventory!','',{
            timeOut:2000,
            closeButton:true
          });
        }
      })
    }

   
  }

  private _checkEditMode() {
    this.activateRoute.params.subscribe((param: any) => {
      if (param.id) {
        this.editMode = true;
        this.paramId = param.id;
        this.inventoryService.getSingleMateiral(param.id).subscribe((res) => {
          this.addInventoryForm.setValue({
            MaterialName: res.MaterialName,
            Unit: res.Unit,
            cost: res.cost,
            quantity:res.quantity,
            registerId:this.num,
            ProjectId:res.ProjectId
          });
        });
      }
    });
  }

  get f() {
    return this.addInventoryForm.controls
  }
}