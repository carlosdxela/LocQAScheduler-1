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

  refresh(){
    this.projectService.getTasksbyPId(this.project_Id)
    .subscribe(response=>{
      this.tasks = response;
    });
  }
  addNewTask(){
    let task = new Task;
    console.log("Tryinng to add a task on " + this.project_Id);
    this.projectService.addTaskToProject(this.project_Id)
    .subscribe(response=>{
      this.refresh();
    });

  }

  deleteTask(taskId: string){
    if (confirm("Are you sure you want to delete this item? with ID: " + taskId))
    {
      console.log("Will attempt to delete Task with id:" + taskId);
      this.projectService.deleteTaskFromProject(this.project_Id, taskId)
      .subscribe(response=>{
        this.refresh();
      });

    }
  }

  saveTask(taskId: string, task: Task){
      this.projectService.updateTask(this.project_Id, taskId, task)
      .subscribe(response=>{
        this.refresh();
      });
  }

  ngOnInit() {
    this.refresh();
  }

}
