import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectRoutingModule }   from './project-routing.module';

@NgModule({
  imports: [
    CommonModule, ProjectRoutingModule
  ],
  declarations: [ProjectComponent, ProjectListComponent, TaskListComponent]
})
export class ProjectModule { }
