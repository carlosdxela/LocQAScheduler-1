import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { ProjectComponent} from './project.component';
import { ProjectListComponent} from './project-list/project-list.component';
import { ProjectDetailComponent} from './project-detail/project-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '',
    component: ProjectComponent,
    children: [
      {path: '', component: ProjectListComponent},
      {path: ':projectId', component: ProjectDetailComponent,
       children: [
         {path: 'tasks/:taskId', component: TaskEditComponent}
       ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule{}
