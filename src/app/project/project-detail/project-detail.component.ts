import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';
import { PhotoService } from 'src/app/_shared/services/photo.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  @Output() gotData = new EventEmitter();
  project: Project = null;
  id: String = "";
  projectDate: string = "";

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private projectSvc: ProjectService, 
    public userSvc: UserService, 
    public photoSvc: PhotoService) { 
      this.id = this.route.snapshot.paramMap.get('id');
      this.projectDate = this.route.snapshot.paramMap.get('date');
  }

  ngOnInit() {
    this.projectSvc.getProjectById(this.id).subscribe(data => {
      this.project = data;
      this.gotData.emit({title: data.name, date: this.projectDate});
      this.projectSvc.loadMyProjects();
    })
  }

  async takePhoto() {
    let base64 = await this.photoSvc.addNewToGallery();
    this.projectSvc.postPhoto(this.id, base64, this.projectDate).subscribe(data => {
      this.project = data;
    })

  }

  formatDate (date) {
    return new Date(date).toDateString();
  }

}
