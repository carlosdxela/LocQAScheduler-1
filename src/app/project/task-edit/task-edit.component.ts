import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  @Input()
  tasks: Task[];

  constructor() { }

  ngOnInit() {
  }

}
