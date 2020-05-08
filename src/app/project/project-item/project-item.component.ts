import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/_models/Project';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  project: Project = null;
  id: String = "";
  datesArray = [];
  subs: Subscription;
  @Output() gotData = new EventEmitter();

  constructor( private router: Router, private route: ActivatedRoute, private projectSvc: ProjectService, public userSvc: UserService) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onBackClicked() {
    this.router.navigate(['']);
  }
  

  ngOnInit() {
    this.projectSvc.getProjectById(this.id).subscribe(data => {
      this.project = data;
      this.gotData.emit(data.name);
      this.projectSvc.setCurrentProject(data);
      this.projectSvc.loadMyProjects();
    })

    this.subs = this.projectSvc.$currentProject.subscribe(data => {
      this.datesArray = !!data['workDates'] ? Object.keys(data['workDates']).reverse() : [];
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  showDataByDate(date) {
    this.router.navigate([`tabs/tab1/project/${this.id}/${date}`]);
  }
}
