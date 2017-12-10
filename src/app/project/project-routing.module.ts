import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { ProjectComponent} from './project.component';
import { ProjectListComponent} from './project-list/project-list.component';
//import { TesterDetailComponent} from './tester-detail/tester-detail.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',
    component: ProjectComponent,
    children: [
      {path: '', component: ProjectListComponent},
//      {path: ':id', component: TesterDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule{}
