import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectItemPagePage } from './project-item-page.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectItemPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectItemPagePageRoutingModule {}
