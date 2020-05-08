import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-detail-page',
  templateUrl: './project-detail-page.page.html',
  styleUrls: ['./project-detail-page.page.scss'],
})
export class ProjectDetailPagePage implements OnInit {
  title = ""
  date = ""
  constructor() { }

  ngOnInit() {
  }

  onDataGot(event) {
    this.title = event.title;
    this.date = event.date;
  }
}
