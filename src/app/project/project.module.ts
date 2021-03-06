import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AccordionModule } from 'ngx-bootstrap';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectRoutingModule }   from './project-routing.module';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import {AssignmentsDetailComponent} from './assignments-detail/assignments-detail.component';
import { AssignmentsDetailDialogComponent } from './assignments-detail/assignments-detail-dialog/assignments-detail-dialog.component';

@NgModule({
  imports: [
    SharedModule, CommonModule, ProjectRoutingModule, AccordionModule.forRoot(),
  ],
  entryComponents: [AssignmentsDetailDialogComponent],
  declarations: [ProjectComponent, ProjectListComponent,
    TaskListComponent, ProjectDetailComponent,
    TaskEditComponent, AssignmentsDetailComponent,
    AssignmentsDetailDialogComponent]
})
export class ProjectModule { }
