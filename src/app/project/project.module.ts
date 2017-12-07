import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProjectListComponent, TaskListComponent]
})
export class ProjectModule { }
