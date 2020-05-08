import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/_models/Project';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/_shared/services/project.service';
import { UserService } from 'src/app/_shared/services/user.service';

@Component({
  selector: 'app-project-item-page',
  templateUrl: './project-item-page.page.html',
  styleUrls: ['./project-item-page.page.scss'],
})
export class ProjectItemPagePage implements OnInit {
  title = "";
  constructor(private router: Router) {}

  ngOnInit() {
   
  }

  onDataGot(event) {
    this.title = event;
    console.log(event)
  }
}
