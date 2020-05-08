import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectDetailPagePageRoutingModule } from './project-detail-page-routing.module';

import { ProjectDetailPagePage } from './project-detail-page.page';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectDetailPagePageRoutingModule
  ],
  declarations: [ProjectDetailPagePage, ProjectDetailComponent]
})
export class ProjectDetailPagePageModule {}
