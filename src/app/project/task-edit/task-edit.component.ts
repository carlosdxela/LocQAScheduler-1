import { Component, OnInit, Input } from '@angular/core';

import { ProjectService } from '../project.service';

import { Task } from '../task';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  @Input()
  tasks: Task[];

  @Input()
  project_Id: string;

  constructor(private projectService: ProjectService) {


  }

  addNewTask(){
    let task = new Task;
    this.projectService.addTaskToProject(this.project_Id);
  }

  deleteTask(taskId: string){
    if (confirm("Are you sure you want to delete this item?"))
    {
      console.log("Will attempt to delete Task with id:" + taskId);
      this.tasks=this.projectService.deleteTaskFromProject(this.project_Id, taskId);
    }
  }

  ngOnInit() {
  }

}
