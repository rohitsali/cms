import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectserviceService } from 'src/app/shared/services/projectservice.service';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  public projects: any;
  public Id: any;
  response: any;
  public showStatus: boolean = false;
  constructor(private projectService: ProjectserviceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.Id = localStorage.getItem('UserId');
    let num = JSON.parse(this.Id);

    this.projectService.getProjects().subscribe((res) => {
      this.projects = res.filter((ele: any) => ele.registerId == num);
      if (this.projects == null || this.projects == '') {
        this.showStatus = true;
      }
    });

  }

  removeProject(id: number) {
    this.projectService.deleteProject(id).subscribe((res) => {
      if (res != null) {
        this.toastr.success("Project Remove successfully");
        this.ngOnInit();
      }
    })
  }

  submit() {

  }

}