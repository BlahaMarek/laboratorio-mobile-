import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailPagePage } from './project-detail-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectDetailPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectDetailPagePageRoutingModule {}
