import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectSvc: ProjectService, private router: Router) { }


  ngOnInit() {
    this.projectSvc.loadMyProjects();
    this.projectSvc.$myProjects.subscribe(data => { this.projects = data})
  }

  concreteProject(_id) {
    this.router.navigate(['/tabs/tab1/project', _id]);
  }
}
