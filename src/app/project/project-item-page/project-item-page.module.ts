import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectItemPagePageRoutingModule } from './project-item-page-routing.module';

import { ProjectItemPagePage } from './project-item-page.page';
import { ProjectItemComponent } from '../project-item/project-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectItemPagePageRoutingModule
  ],
  declarations: [ProjectItemPagePage, ProjectItemComponent]
})
export class ProjectItemPagePageModule {}
